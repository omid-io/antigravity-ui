import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import picocolors from 'picocolors';

const { yellow, green, cyan, red, bold } = picocolors;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Returns the path to the updater cache file in the user's home directory.
 * @returns {string} Absolute path to cache file
 */
export function getCachePath() {
    return path.join(os.homedir(), '.antigravity-ui-cache.json');
}

/**
 * Clears the updater cache file from disk.
 * @param {string} [cachePath] - Custom cache file path for testing
 */
export function clearCache(cachePath = getCachePath()) {
    try {
        if (fs.existsSync(cachePath)) {
            fs.unlinkSync(cachePath);
        }
    } catch {
        // Silently ignore deletion issues
    }
}

/**
 * Reads updater cache from disk.
 * @param {string} [cachePath] - Custom cache file path for testing
 * @returns {{ lastCheck: number, latestVersion: string } | null}
 */
export function readCache(cachePath = getCachePath()) {
    try {
        if (!fs.existsSync(cachePath)) return null;
        const raw = fs.readFileSync(cachePath, 'utf8');
        const data = JSON.parse(raw);
        if (data && typeof data.lastCheck === 'number' && typeof data.latestVersion === 'string') {
            return data;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Writes updater cache to disk.
 * @param {string} latestVersion - Version string to cache
 * @param {string} [cachePath] - Custom cache file path for testing
 */
export function writeCache(latestVersion, cachePath = getCachePath()) {
    if (!latestVersion || typeof latestVersion !== 'string') {
        clearCache(cachePath);
        return;
    }
    try {
        const data = {
            lastCheck: Date.now(),
            latestVersion
        };
        fs.writeFileSync(cachePath, JSON.stringify(data), 'utf8');
    } catch {
        // Silently ignore disk write issues
    }
}

/**
 * Strips ANSI terminal escape codes to calculate visual string width.
 * @param {string} str - String potentially containing ANSI escapes
 * @returns {string} Clean string
 */
export function stripAnsi(str) {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
}

/**
 * Parses a semantic version string (supports major, minor, patch, pre-release identifiers, and build metadata).
 * @param {string} v - Version string (e.g., "2.0.7", "v2.0.7-beta.1+build.12")
 * @returns {{ major: number, minor: number, patch: number, prerelease: string[] | null } | null}
 */
export function parseSemver(v) {
    if (!v || typeof v !== 'string') return null;
    const clean = v.trim().replace(/^v/, '');
    const match = clean.match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/);
    if (!match) return null;
    return {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10),
        patch: parseInt(match[3], 10),
        prerelease: match[4] ? match[4].split('.') : null
    };
}

/**
 * Compares two semantic version strings according to SemVer 2.0 specification.
 * @param {string} current - Currently installed version
 * @param {string} latest - Latest published version from registry
 * @returns {boolean} True if latest is strictly newer than current
 */
export function isNewerVersion(current, latest) {
    const c = parseSemver(current);
    const l = parseSemver(latest);
    if (!c || !l) return false;

    if (l.major !== c.major) return l.major > c.major;
    if (l.minor !== c.minor) return l.minor > c.minor;
    if (l.patch !== c.patch) return l.patch > c.patch;

    // Precedence rule: Normal release > Pre-release (e.g., 2.0.7 > 2.0.7-beta.1)
    if (!c.prerelease && l.prerelease) return false;
    if (c.prerelease && !l.prerelease) return true;
    if (!c.prerelease && !l.prerelease) return false;

    // Both have pre-release identifiers: compare element by element
    const maxLen = Math.max(c.prerelease.length, l.prerelease.length);
    for (let i = 0; i < maxLen; i++) {
        const cId = c.prerelease[i];
        const lId = l.prerelease[i];
        if (cId === undefined) return true;
        if (lId === undefined) return false;
        if (cId === lId) continue;

        const cNum = /^\d+$/.test(cId) ? parseInt(cId, 10) : null;
        const lNum = /^\d+$/.test(lId) ? parseInt(lId, 10) : null;

        if (cNum !== null && lNum !== null) {
            return lNum > cNum;
        }
        if (cNum !== null && lNum === null) {
            return true;
        }
        if (cNum === null && lNum !== null) {
            return false;
        }
        return lId.localeCompare(cId) > 0;
    }
    return false;
}

/**
 * Fetches the latest published version of a package from the npm registry with timeout.
 * @param {string} packageName - Package name on npm
 * @param {number} timeoutMs - Max wait time in ms before aborting
 * @returns {Promise<string|null>} Latest version string or null on network error/timeout
 */
export async function fetchLatestVersion(packageName = 'antigravity-ui', timeoutMs = 1200) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (!res.ok) return null;
        const data = await res.json();
        return data.version || null;
    } catch {
        clearTimeout(timeoutId);
        return null;
    }
}

/**
 * Checks if an update is available on npm registry with 24-hour cache and fast timeout.
 * @param {string} currentVersion - Local version from package.json
 * @param {string} packageName - Name of npm package
 * @param {{ useCache?: boolean, timeoutMs?: number, cachePath?: string }} [options]
 * @returns {Promise<{ hasUpdate: boolean, currentVersion: string, latestVersion: string|null, fromCache?: boolean }>}
 */
export async function checkForUpdate(currentVersion, packageName = 'antigravity-ui', options = {}) {
    const { useCache = true, timeoutMs = 1200, cachePath = getCachePath() } = options;

    if (useCache) {
        const cached = readCache(cachePath);
        if (cached && (Date.now() - cached.lastCheck < CACHE_TTL_MS)) {
            const hasUpdate = isNewerVersion(currentVersion, cached.latestVersion);
            return { hasUpdate, currentVersion, latestVersion: cached.latestVersion, fromCache: true };
        }
    }

    const latestVersion = await fetchLatestVersion(packageName, timeoutMs);
    if (!latestVersion) {
        return { hasUpdate: false, currentVersion, latestVersion: null, fromCache: false };
    }

    if (useCache) {
        writeCache(latestVersion, cachePath);
    }

    const hasUpdate = isNewerVersion(currentVersion, latestVersion);
    return { hasUpdate, currentVersion, latestVersion, fromCache: false };
}

/**
 * Renders an aligned, highlighted update notification box.
 * @param {string} currentVersion - Current version
 * @param {string} latestVersion - New version
 * @returns {string} Formatted terminal box
 */
export function renderUpdateBox(currentVersion, latestVersion) {
    const lines = [
        `Update available: \x1b[31m${currentVersion}\x1b[0m → \x1b[32m${latestVersion}\x1b[0m`,
        `Run \x1b[36mantigravity-ui update\x1b[0m to upgrade automatically`
    ];

    const rawLengths = lines.map(l => stripAnsi(l).length);
    const contentWidth = Math.max(...rawLengths) + 4;
    const top = `\x1b[33m╭${'─'.repeat(contentWidth)}╮\x1b[0m`;
    const bottom = `\x1b[33m╰${'─'.repeat(contentWidth)}╯\x1b[0m`;

    const middle = lines.map(line => {
        const visibleLen = stripAnsi(line).length;
        const padding = ' '.repeat(Math.max(0, contentWidth - visibleLen - 2));
        return `\x1b[33m│\x1b[0m  ${line}${padding}\x1b[33m│\x1b[0m`;
    });

    return ['', top, ...middle, bottom, ''].join('\n');
}

/**
 * Executes a global npm upgrade to the latest package version and purges local cache.
 * @param {string} packageName - Package name
 * @param {string} [cachePath] - Cache file path to clear
 * @returns {{ success: boolean, error?: string }}
 */
export function executeNpmUpgrade(packageName = 'antigravity-ui', cachePath = getCachePath()) {
    try {
        execSync(`npm install -g ${packageName}@latest`, {
            stdio: 'pipe',
            encoding: 'utf8'
        });
        clearCache(cachePath);
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}
