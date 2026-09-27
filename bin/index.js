#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
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
        console.log(blue(`ℹ Found Antigravity Desktop installation at:`));
        console.log(`  ${asarPath}\n`);
        return asarPath;
    }

    console.log(yellow(`⚠ Could not find Antigravity Desktop at default location.`));
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

const args = process.argv.slice(2);
const isRestore = args.includes('--restore');
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
            console.log(cyan('\nRe-applying patch to ensure Antigravity Desktop and IDE are synchronized...\n'));
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
            console.log(cyan('\nSpawning upgraded Antigravity UI Studio to patch Desktop and IDE...\n'));

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

    const asarPath = await getAsarPath();
    const backupPath = asarPath + '.bak';
    
    if (isRestore) {
        if (!fs.existsSync(backupPath)) {
            console.error(red('✖ No backup found to restore.\n'));
            process.exit(1);
        }
        const metaPath = asarPath + '.meta.json';
        const spinner = ora('Verifying backup SHA-256 integrity and restoring app.asar...').start();
        try {
            const result = restoreBackup(asarPath, backupPath, metaPath, { force: isForce });
            spinner.succeed(result.message);
            handleIdeExtension(true);
            process.exit(0);
        } catch (e) {
            spinner.fail('Failed to restore backup.');
            console.error(red('\n' + e.message + '\n'));
            process.exit(1);
        }
    }

    const spinner = ora('Checking write permissions...').start();
    try {
        fs.accessSync(path.dirname(asarPath), fs.constants.W_OK);
    } catch (e) {
        spinner.fail('Permission Denied.');
        console.error(red('\nSystem Error: ' + e.message));
        if (os.platform() === 'win32') {
            console.error(yellow('\nPlease run your terminal (PowerShell/CMD) as Administrator and try again.\n'));
        } else if (os.platform() === 'darwin') {
            console.error(yellow('\nPlease ensure you run this command with sudo.'));
            console.error(yellow('If you are using sudo, macOS requires your terminal to have "App Management" permission.'));
            console.error(yellow('Go to: System Settings > Privacy & Security > App Management'));
            console.error(yellow('And enable the toggle for your terminal (e.g. Terminal, iTerm2, VS Code), then try again.\n'));
        } else {
            console.error(yellow('\nPlease run this command with sudo.\n'));
        }
        process.exit(1);
    }
    
    const extractDir = path.join(path.dirname(asarPath), 'app-extracted-ui-temp');
    spinner.text = 'Extracting app.asar (this may take a few seconds)...';
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

    spinner.text = 'Injecting Antigravity UI Studio features...';
    try {
        const utilsPath = path.join(extractDir, 'dist', 'utils.js');
        if (!fs.existsSync(utilsPath)) {
            throw new Error('dist/utils.js not found in ASAR. Unsupported Antigravity version.');
        }

        let utilsCode = fs.readFileSync(utilsPath, 'utf8');
        
        const isPatched = detectPatchState(utilsCode);
        const metaPath = asarPath + '.meta.json';

        if (!isPatched) {
            // Pristine, unpatched build from official Google release: always refresh backup to current version
            spinner.text = 'Creating pristine backup with 64-char SHA-256 checksum...';
            try {
                createPristineBackup(asarPath, backupPath, metaPath, pkg.version);
            } catch (e) {
                console.warn(yellow(`⚠ Could not generate full backup metadata: ${e.message}`));
                fs.copyFileSync(asarPath, backupPath);
            }
        } else {
            if (fs.existsSync(backupPath)) {
                spinner.text = 'Updating existing UI patch to latest version...';
                utilsCode = asar.extractFile(backupPath, 'dist/utils.js').toString('utf8');
            } else {
                spinner.succeed('Antigravity Desktop is already patched with UI Studio!');
                fs.rmSync(extractDir, { recursive: true, force: true });
                handleIdeExtension(false);
                console.log(green('\n✨ Enjoy your Antigravity UI Studio experience!\n'));
                process.exit(0);
            }
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

    } catch (e) {
        spinner.fail('Injection failed.');
        console.error(red(e.message));
        if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true });
        process.exit(1);
    }

    spinner.text = 'Repacking app.asar (almost done)...';
    try {
        await asar.createPackage(extractDir, asarPath);
        fs.rmSync(extractDir, { recursive: true, force: true });
        spinner.succeed('Successfully patched Antigravity Desktop!');
        handleIdeExtension(false);
        console.log(green('\n✨ Antigravity UI Studio is fully enabled. Please restart Antigravity to see the changes.\n'));

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
        spinner.fail('Failed to repack ASAR.');
        console.error(red(e.message));
        process.exit(1);
    }
}

main().catch(e => {
    console.error(red('\n✖ An unexpected error occurred:'), e.message);
    process.exit(1);
});
