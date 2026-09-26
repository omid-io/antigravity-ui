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
 * Compares two semantic version strings (e.g. "2.0.5" vs "2.0.6").
 * @param {string} current - Currently installed version
 * @param {string} latest - Latest published version from registry
 * @returns {boolean} True if latest is strictly newer than current
 */
export function isNewerVersion(current, latest) {
    if (!current || !latest) return false;
    const cParts = current.split('.').map(n => parseInt(n, 10) || 0);
    const lParts = latest.split('.').map(n => parseInt(n, 10) || 0);
    const maxLen = Math.max(cParts.length, lParts.length);

    for (let i = 0; i < maxLen; i++) {
        const c = cParts[i] || 0;
        const l = lParts[i] || 0;
        if (l > c) return true;
        if (l < c) return false;
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
 * Executes a global npm upgrade to the latest package version.
 * @param {string} packageName - Package name
 * @returns {{ success: boolean, error?: string }}
 */
export function executeNpmUpgrade(packageName = 'antigravity-ui') {
    try {
        execSync(`npm install -g ${packageName}@latest`, {
            stdio: 'pipe',
            encoding: 'utf8'
        });
        writeCache(null); // Clear or refresh cache after manual upgrade
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}
