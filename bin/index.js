#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';
import crypto from 'crypto';
import picocolors from 'picocolors';
import ora from 'ora';
import prompts from 'prompts';
import * as asar from '@electron/asar';
import figlet from 'figlet';
import {
    detectPatchState,
    createPristineBackup,
    verifyBackupIntegrity,
    restoreBackup,
    applyPayloadToCode
} from '../lib/patcher.js';
import {
    checkForUpdate,
    renderUpdateBox,
    executeNpmUpgrade,
    fetchLatestVersion,
    isNewerVersion,
    reExecUpdatedCli
} from '../lib/updater.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { blue, cyan, green, red, yellow, bold } = picocolors;

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

function printBanner() {
    try {
        const fullArt = figlet.textSync('Antigravity UI', { font: 'RubiFont' }).split('\n');

        // Hex colors for the multi-color gradient
        const hexColors = [
            '#3387FF',
            '#F25041',
            '#DFAC2A',
            '#91C45B'
        ];

        // Parse hex to RGB
        const colors = hexColors.map(hex => {
            const bigint = parseInt(hex.replace('#', ''), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        });

        const applyGradient = (text) => {
            let result = '';
            const len = text.length;
            for (let i = 0; i < len; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                    continue;
                }
                const factor = len > 1 ? i / (len - 1) : 0;
                
                // Find current segment in the multi-color transition
                const segments = colors.length - 1;
                const segmentFloat = factor * segments;
                const segmentIdx = Math.min(Math.floor(segmentFloat), segments - 1);
                const segmentFactor = segmentFloat - segmentIdx;

                const cStart = colors[segmentIdx];
                const cEnd = colors[segmentIdx + 1];

                const r = Math.round(cStart.r + segmentFactor * (cEnd.r - cStart.r));
                const g = Math.round(cStart.g + segmentFactor * (cEnd.g - cStart.g));
                const b = Math.round(cStart.b + segmentFactor * (cEnd.b - cStart.b));

                result += `\x1b[38;2;${r};${g};${b}m${char}\x1b[0m`;
            }
            return result;
        };

        console.log('');
        for (const line of fullArt) {
            if (!line.trim()) continue;
            console.log(applyGradient(line));
        }
        console.log('');
        console.log(`\x1b[2m  The Complete UI & BiDi Studio for Antigravity | v${pkg.version}\x1b[0m\n`);
    } catch (err) {
        console.log(bold(cyan(`\n✨ Antigravity UI Studio v${pkg.version}\n`)));
    }
}

printBanner();

function getDefaultPath() {
    if (os.platform() === 'darwin') {
        return '/Applications/Antigravity.app/Contents/Resources/app.asar';
    } else if (os.platform() === 'win32') {
        return path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Antigravity', 'resources', 'app.asar');
    } else {
        return '/opt/Antigravity/resources/app.asar';
    }
}

async function getAsarPath() {
    let asarPath = getDefaultPath();
    if (fs.existsSync(asarPath)) {
        return asarPath;
    }

    const response = await prompts({
        type: 'text',
        name: 'customPath',
        message: 'Please enter the full path to app.asar:'
    });

    if (!response.customPath || !fs.existsSync(response.customPath)) {
        console.error(red('\n✖ Invalid path. Aborting.\n'));
        process.exit(1);
    }
    return response.customPath;
}

function getAntigravityIdeBinPath() {
    let candidate = '';
    if (os.platform() === 'win32') {
        candidate = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Antigravity IDE', 'bin', 'antigravity-ide.cmd');
    } else if (os.platform() === 'darwin') {
        candidate = '/Applications/Antigravity IDE.app/Contents/Resources/app/bin/antigravity-ide';
    } else {
        candidate = '/usr/bin/antigravity-ide';
    }
    if (candidate && fs.existsSync(candidate)) {
        return candidate;
    }
    try {
        const cmd = os.platform() === 'win32' ? 'where antigravity-ide' : 'which antigravity-ide';
        const result = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf8' }).trim().split('\n')[0].trim();
        if (result && fs.existsSync(result)) {
            return result;
        }
    } catch (e) {}
    return null;
}

function installOrUpdatePlugin() {
    const targetDir = path.join(os.homedir(), '.gemini', 'config', 'plugins', 'antigravity-ui');
    const sourceDir = path.join(__dirname, '..', 'plugin');
    if (!fs.existsSync(sourceDir)) {
        throw new Error('Plugin source directory not found at: ' + sourceDir);
    }
    fs.mkdirSync(targetDir, { recursive: true });
    fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
    return targetDir;
}

async function sendSidecarReloadSignal() {
    const ports = [58888, 58889];
    for (const port of ports) {
        try {
            const reloaded = await new Promise((resolve) => {
                const req = http.request({
                    hostname: '127.0.0.1',
                    port,
                    path: '/api/reload',
                    method: 'POST',
                    timeout: 800
                }, (res) => {
                    resolve(res.statusCode === 200);
                });
                req.on('error', () => resolve(false));
                req.on('timeout', () => { req.destroy(); resolve(false); });
                req.end();
            });
            if (reloaded) return true;
        } catch (_) {}
    }
    return false;
}

function cleanupLegacyAsarPatch() {
    try {
        const asarPath = getDefaultPath();
        const backupPath = asarPath + '.bak';
        const metaPath = asarPath + '.meta.json';
        if (fs.existsSync(backupPath) && fs.existsSync(asarPath)) {
            restoreBackup(asarPath, backupPath, metaPath, { force: true });
            return true;
        }
    } catch (_) {}
    return false;
}

function handleIdeExtension(isRestore = false) {
    const ideBin = getAntigravityIdeBinPath();
    if (!ideBin) {
        return;
    }

    if (isRestore) {
        try {
            execSync(`"${ideBin}" --uninstall-extension omid-io.antigravity-rtl`, { stdio: 'ignore' });
            execSync(`"${ideBin}" --uninstall-extension omid-io.antigravity-ui`, { stdio: 'ignore' });
            console.log(green('✔ Successfully removed Antigravity RTL extension from Antigravity IDE.\n'));
        } catch (e) {}
        return;
    }

    const rtlVsixPath = path.join(__dirname, '..', 'assets', 'antigravity-rtl-1.0.0.vsix');
    const uiVsixPath = path.join(__dirname, '..', 'assets', 'antigravity-ui-1.0.0.vsix');
    const vsixPath = fs.existsSync(rtlVsixPath) ? rtlVsixPath : uiVsixPath;

    if (!fs.existsSync(vsixPath)) {
        return;
    }

    const spinner = ora('Detecting Antigravity IDE and configuring editor extension...').start();
    try {
        execSync(`"${ideBin}" --install-extension "${vsixPath}" --force`, { stdio: 'ignore' });
        spinner.succeed('Successfully configured Antigravity RTL extension for Antigravity IDE!\n');
    } catch (e) {
        spinner.warn('Antigravity IDE was detected, but extension installation was skipped: ' + e.message);
    }
}

async function applyLegacyAsarPatch(enableDevTools, isForce) {
    const asarPath = await getAsarPath();
    const backupPath = asarPath + '.bak';
    const spinner = ora('Checking write permissions...').start();
    try {
        fs.accessSync(path.dirname(asarPath), fs.constants.W_OK);
    } catch (e) {
        spinner.fail('Permission Denied.');
        console.error(red('\nSystem Error: ' + e.message));
        if (os.platform() === 'win32') {
            console.error(yellow('\nPlease run your terminal (PowerShell/CMD) as Administrator and try again.\n'));
        } else {
            console.error(yellow('\nPlease run this command with sudo.\n'));
        }
        process.exit(1);
    }

    const extractDir = path.join(path.dirname(asarPath), 'app-extracted-ui-temp');
    spinner.text = 'Extracting app.asar...';
    try {
        if (fs.existsSync(extractDir)) {
            fs.rmSync(extractDir, { recursive: true, force: true });
        }
        asar.extractAll(asarPath, extractDir);
    } catch (e) {
        spinner.fail('Failed to extract ASAR.');
        console.error(red(e.message));
        process.exit(1);
    }

    spinner.text = 'Injecting Antigravity UI Studio features into binary...';
    try {
        const utilsPath = path.join(extractDir, 'dist', 'utils.js');
        if (!fs.existsSync(utilsPath)) {
            throw new Error('dist/utils.js not found in ASAR. Unsupported Antigravity version.');
        }

        let utilsCode = fs.readFileSync(utilsPath, 'utf8');
        const isPatched = detectPatchState(utilsCode);
        const metaPath = asarPath + '.meta.json';

        if (!isPatched) {
            try {
                createPristineBackup(asarPath, backupPath, metaPath, pkg.version);
            } catch (e) {
                fs.copyFileSync(asarPath, backupPath);
            }
        } else if (fs.existsSync(backupPath)) {
            utilsCode = asar.extractFile(backupPath, 'dist/utils.js').toString('utf8');
        }

        const payloadPath = path.join(__dirname, 'payload.js');
        const payload = fs.readFileSync(payloadPath, 'utf8');
        utilsCode = applyPayloadToCode(utilsCode, payload, enableDevTools);
        fs.writeFileSync(utilsPath, utilsCode);

        const fontSource = path.join(__dirname, 'Vazirmatn-Variable.woff2');
        const fontDest = path.join(extractDir, 'dist', 'Vazirmatn-Variable.woff2');
        if (fs.existsSync(fontSource)) {
            fs.copyFileSync(fontSource, fontDest);
        }

        await asar.createPackage(extractDir, asarPath);
        fs.rmSync(extractDir, { recursive: true, force: true });
        spinner.succeed('Successfully patched Antigravity Desktop binary (legacy mode)!');
    } catch (e) {
        spinner.fail('Injection failed.');
        console.error(red(e.message));
        if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true });
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const isRestore = args.includes('--restore');
const isPatch = args.includes('--patch');
const enableDevTools = args.includes('--devtools');
const isForce = args.includes('--force');
const isUpdate = args.includes('update') || args.includes('--update');

async function main() {
    if (isUpdate) {
        const updateSpinner = ora(`Checking for updates on npm registry for ${pkg.name}...`).start();
        const latest = await fetchLatestVersion(pkg.name, 5000);

        if (!latest) {
            updateSpinner.fail('Could not reach npm registry. Please check your internet connection.');
            process.exit(1);
        }

        if (!isNewerVersion(pkg.version, latest)) {
            updateSpinner.succeed(`You are already running the latest version of ${pkg.name} (v${pkg.version}).`);
            console.log(cyan('\nRe-synchronizing Antigravity UI Studio plugin files...\n'));
        } else {
            updateSpinner.text = `Found update: v${pkg.version} → v${latest}. Downloading and upgrading via npm...`;
            const upgradeResult = executeNpmUpgrade(pkg.name);
            if (!upgradeResult.success) {
                updateSpinner.fail(`Failed to upgrade ${pkg.name} automatically.`);
                console.error(red(`\nError: ${upgradeResult.error}`));
                console.log(yellow(`\nPlease run manually:\n  npm install -g ${pkg.name}@latest\n`));
                process.exit(1);
            }
            updateSpinner.succeed(bold(green(`Successfully upgraded ${pkg.name} to v${latest}!`)));
            console.log(cyan('\nSpawning upgraded Antigravity UI Studio CLI to synchronize plugins...\n'));

            const forwardedArgs = args.filter(a => a !== 'update' && a !== '--update');
            const reExecResult = reExecUpdatedCli(pkg.name, forwardedArgs);
            if (!reExecResult.success && reExecResult.error) {
                console.error(red(`\nFailed to launch updated CLI: ${reExecResult.error.message}\n`));
            }
            process.exit(reExecResult.status ?? 1);
        }
    }

    const abortController = new AbortController();
    const updateCheckPromise = (!isRestore && !isUpdate)
        ? checkForUpdate(pkg.version, pkg.name, { useCache: true, timeoutMs: 1200, signal: abortController.signal })
        : Promise.resolve(null);

    if (isRestore) {
        const asarPath = getDefaultPath();
        const backupPath = asarPath + '.bak';
        const metaPath = asarPath + '.meta.json';
        if (fs.existsSync(backupPath)) {
            const spinner = ora('Restoring pristine app.asar backup...').start();
            try {
                const result = restoreBackup(asarPath, backupPath, metaPath, { force: isForce });
                spinner.succeed(result.message);
            } catch (e) {
                spinner.fail('Failed to restore backup: ' + e.message);
            }
        }
        handleIdeExtension(true);
        console.log(green('✔ Antigravity restoration complete.\n'));
        process.exit(0);
    }

    if (isPatch) {
        console.log(yellow('⚠ Legacy binary patching mode requested (--patch)...\n'));
        await applyLegacyAsarPatch(enableDevTools, isForce);
        handleIdeExtension(false);
        installOrUpdatePlugin();
        process.exit(0);
    }

    // Default High-Velocity Native Architecture: Official Gemini Plugin Installation & Auto-Sync
    const pluginSpinner = ora(`Installing & synchronizing Antigravity UI Studio plugin (v${pkg.version})...`).start();
    try {
        const installedDir = installOrUpdatePlugin();
        const cleanedLegacy = cleanupLegacyAsarPatch();
        pluginSpinner.succeed(bold(green(`Successfully installed & synchronized Antigravity UI Studio plugin (v${pkg.version})!`)));
        
        if (cleanedLegacy) {
            console.log(blue('  ℹ Restored original unpatched app.asar (migrated to zero-patch native plugin architecture)'));
        }

        handleIdeExtension(false);

        const reloaded = await sendSidecarReloadSignal();
        if (reloaded) {
            console.log(cyan('  ✔ Instant live reload signal sent to active Antigravity UI Studio!'));
        }

        console.log(green('\n✨ Antigravity UI Studio is active! Open Antigravity or click the Galaxy 🌌 icon in the sidebar.\n'));

        let updateInfo = null;
        try {
            updateInfo = await Promise.race([
                updateCheckPromise,
                new Promise(resolve => setTimeout(() => {
                    abortController.abort();
                    resolve(null);
                }, 50))
            ]);
        } catch {
            abortController.abort();
        }
        if (updateInfo && updateInfo.hasUpdate) {
            console.log(renderUpdateBox(pkg.version, updateInfo.latestVersion));
        }
    } catch (e) {
        pluginSpinner.fail('Failed to install Antigravity UI Studio plugin.');
        console.error(red('\n' + e.message + '\n'));
        process.exit(1);
    }
}

main().catch(e => {
    console.error(red('\n✖ An unexpected error occurred:'), e.message);
    process.exit(1);
});
