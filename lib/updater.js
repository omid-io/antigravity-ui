import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import semver from 'semver';
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
 * Parses a semantic version string using the authoritative semver library.
 * @param {string} v - Version string
 * @returns {semver.SemVer | null} Parsed semver instance or null if invalid
 */
export function parseSemver(v) {
    if (!v || typeof v !== 'string') return null;
    return semver.parse(v.trim());
}

/**
 * Compares two semantic version strings according to strict SemVer 2.0.
 * @param {string} current - Currently installed version
 * @param {string} latest - Latest published version from registry
 * @returns {boolean} True if latest is strictly newer than current
 */
export function isNewerVersion(current, latest) {
    if (!current || !latest) return false;
    const c = semver.valid(semver.clean(current));
    const l = semver.valid(semver.clean(latest));
    if (!c || !l) return false;
    return semver.gt(l, c);
}

/**
 * Fetches the latest published version of a package from the npm registry with timeout and AbortSignal.
 * @param {string} packageName - Package name on npm
 * @param {number} timeoutMs - Max wait time in ms before aborting
 * @param {AbortSignal|null} [externalSignal] - Optional parent abort signal
 * @returns {Promise<string|null>} Latest version string or null on network error/timeout
 */
export async function fetchLatestVersion(packageName = 'antigravity-ui', timeoutMs = 1200, externalSignal = null) {
    const controller = new AbortController();
    let timeoutId = null;

    const onAbort = () => {
        controller.abort();
        if (timeoutId) clearTimeout(timeoutId);
    };

    if (externalSignal) {
        if (externalSignal.aborted) {
            return null;
        }
        externalSignal.addEventListener('abort', onAbort, { once: true });
    }

    timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMs);

    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (externalSignal) externalSignal.removeEventListener('abort', onAbort);
        if (!res.ok) return null;
        const data = await res.json();
        return (data && typeof data.version === 'string') ? data.version : null;
    } catch {
        clearTimeout(timeoutId);
        if (externalSignal) externalSignal.removeEventListener('abort', onAbort);
        return null;
    }
}

/**
 * Checks if an update is available on npm registry with 24-hour cache, fast timeout, and AbortSignal.
 * @param {string} currentVersion - Local version from package.json
 * @param {string} packageName - Name of npm package
 * @param {{ useCache?: boolean, timeoutMs?: number, cachePath?: string, signal?: AbortSignal|null }} [options]
 * @returns {Promise<{ hasUpdate: boolean, currentVersion: string, latestVersion: string|null, fromCache?: boolean }>}
 */
export async function checkForUpdate(currentVersion, packageName = 'antigravity-ui', options = {}) {
    const { useCache = true, timeoutMs = 1200, cachePath = getCachePath(), signal = null } = options;

    if (useCache) {
        const cached = readCache(cachePath);
        if (cached && (Date.now() - cached.lastCheck < CACHE_TTL_MS)) {
            const hasUpdate = isNewerVersion(currentVersion, cached.latestVersion);
            return { hasUpdate, currentVersion, latestVersion: cached.latestVersion, fromCache: true };
        }
    }

    const latestVersion = await fetchLatestVersion(packageName, timeoutMs, signal);
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
 * Resolves the physical path to the globally installed package bin.
 * @param {string} packageName - Package name
 * @returns {string|null} Path to bin/index.js if resolved, or null
 */
export function resolveGlobalCliPath(packageName = 'antigravity-ui') {
    try {
        const globalRoot = execSync('npm root -g', {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'ignore']
        }).trim();
        if (globalRoot) {
            const cliPath = path.join(globalRoot, packageName, 'bin', 'index.js');
            if (fs.existsSync(cliPath)) {
                return cliPath;
            }
        }
    } catch {}
    return null;
}

/**
 * Re-executes the newly upgraded CLI in a fresh isolated process without shell.
 * @param {string} packageName - Package name
 * @param {string[]} forwardedArgs - CLI arguments to forward
 * @param {object} [options] - Optional overrides for testing
 * @returns {{ success: boolean, status: number, error?: Error, signal?: string|null, stdout?: Buffer|string, stderr?: Buffer|string }}
 */
export function reExecUpdatedCli(packageName = 'antigravity-ui', forwardedArgs = [], options = {}) {
    const cliPath = options.cliPath !== undefined ? options.cliPath : resolveGlobalCliPath(packageName);
    const execBinary = options.nodePath || process.execPath;
    const targetArgs = cliPath ? [cliPath, ...forwardedArgs] : forwardedArgs;
    const spawnTarget = cliPath ? execBinary : packageName;

    try {
        const result = spawnSync(spawnTarget, targetArgs, {
            stdio: options.stdio || 'inherit',
            shell: false,
            ...options.spawnOptions
        });

        if (result.error) {
            return { success: false, status: 1, error: result.error };
        }

        const exitStatus = (result.status !== null && result.status !== undefined)
            ? result.status
            : (result.signal ? 1 : 0);

        return {
            success: exitStatus === 0,
            status: exitStatus,
            signal: result.signal || null,
            stdout: result.stdout,
            stderr: result.stderr
        };
    } catch (err) {
        return { success: false, status: 1, error: err };
    }
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
