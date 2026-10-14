const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const PATCH_MARKER = 'antigravity-ui-loader.cjs';
const LOADER_FILENAME = 'antigravity-ui-loader.cjs';
const BACKUP_PREFIX = 'main.js.antigravity-ui-backup-';
const PATCH_LINE = 'import{createRequire}from"module";try{createRequire(import.meta.url)("./antigravity-ui-loader.cjs")}catch(e){console.error("[Antigravity UI] error loading ./antigravity-ui-loader.cjs: ", e)}';

function getAppOutDir() {
    const appRoot = vscode.env.appRoot;
    const candidate = path.join(appRoot, 'out');
    if (fs.existsSync(candidate)) return candidate;

    const altCandidate = path.join(appRoot, 'resources', 'app', 'out');
    if (fs.existsSync(altCandidate)) return altCandidate;

    const parentCandidate = path.join(path.dirname(appRoot), 'out');
    if (fs.existsSync(parentCandidate)) return parentCandidate;

    return candidate;
}

function getMainJsPath() {
    return path.join(getAppOutDir(), 'main.js');
}

function isPatched(mainJsPath) {
    try {
        if (!fs.existsSync(mainJsPath)) return false;
        const content = fs.readFileSync(mainJsPath, 'utf8');
        return content.includes(PATCH_MARKER);
    } catch (e) {
        return false;
    }
}

function copyLoader(outDir, extensionPath) {
    const src = path.join(extensionPath, 'resources', LOADER_FILENAME);
    const dest = path.join(outDir, LOADER_FILENAME);
    fs.copyFileSync(src, dest);
}

function removeLoader(outDir) {
    const dest = path.join(outDir, LOADER_FILENAME);
    try {
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
    } catch (e) {}
}

function applyPatch(mainJsPath) {
    if (isPatched(mainJsPath)) return false;

    const dir = path.dirname(mainJsPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(dir, `${BACKUP_PREFIX}${timestamp}`);

    fs.copyFileSync(mainJsPath, backupPath);

    const originalContent = fs.readFileSync(mainJsPath, 'utf8');
    const patchedContent = PATCH_LINE + '\n' + originalContent;
    fs.writeFileSync(mainJsPath, patchedContent, 'utf8');
    return true;
}

function restoreMainJs(mainJsPath) {
    const dir = path.dirname(mainJsPath);
    try {
        const files = fs.readdirSync(dir);
        const backups = files.filter(f => f.startsWith(BACKUP_PREFIX)).sort().reverse();
        if (backups.length > 0) {
            const latestBackup = path.join(dir, backups[0]);
            fs.copyFileSync(latestBackup, mainJsPath);
            try { fs.unlinkSync(latestBackup); } catch (e) {}
            return true;
        }
    } catch (e) {}

    // Fallback: strip line
    try {
        const content = fs.readFileSync(mainJsPath, 'utf8');
        if (content.includes(PATCH_MARKER)) {
            const filtered = content.split('\n').filter(l => !l.includes(PATCH_MARKER)).join('\n');
            fs.writeFileSync(mainJsPath, filtered, 'utf8');
            return true;
        }
    } catch (e) {}
    return false;
}

function activate(context) {
    const outDir = getAppOutDir();
    const mainJsPath = getMainJsPath();

    // 1. Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'antigravity-ui.toggleRtl';
    statusBarItem.text = '$(arrow-both) RTL';
    statusBarItem.tooltip = 'Antigravity UI: Toggle text direction / RTL mode (Ctrl+Alt+R)';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // 2. Commands
    const toggleRtlCmd = vscode.commands.registerCommand('antigravity-ui.toggleRtl', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Antigravity UI: RTL mode is active for Chat, Agent, and Composer.');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const RLM = '\u200F';

        await editor.edit(editBuilder => {
            if (selection.isEmpty) {
                const line = document.lineAt(selection.active.line);
                const text = line.text;
                if (text.startsWith(RLM)) {
                    editBuilder.delete(new vscode.Range(line.lineNumber, 0, line.lineNumber, 1));
                    vscode.window.setStatusBarMessage('Antigravity UI: RTL mark removed', 2000);
                } else {
                    editBuilder.insert(new vscode.Position(line.lineNumber, 0), RLM);
                    vscode.window.setStatusBarMessage('Antigravity UI: Line marked as RTL', 2000);
                }
            } else {
                const text = document.getText(selection);
                if (text.startsWith(RLM)) {
                    editBuilder.replace(selection, text.substring(1));
                    vscode.window.setStatusBarMessage('Antigravity UI: Text direction reset to default', 2000);
                } else {
                    editBuilder.replace(selection, RLM + text);
                    vscode.window.setStatusBarMessage('Antigravity UI: Selected text set to RTL', 2000);
                }
            }
        });
    });
    context.subscriptions.push(toggleRtlCmd);

    const enableCmd = vscode.commands.registerCommand('antigravity-ui.enable', async () => {
        try {
            copyLoader(outDir, context.extensionPath);
            const patched = applyPatch(mainJsPath);
            if (patched) {
                const action = await vscode.window.showInformationMessage(
                    'Antigravity UI: RTL and Vazirmatn typography enabled successfully. Window reload required.',
                    'Reload Window'
                );
                if (action === 'Reload Window') {
                    vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            } else {
                vscode.window.showInformationMessage('Antigravity UI is already active in this environment.');
            }
        } catch (e) {
            vscode.window.showErrorMessage('Error enabling Antigravity UI: ' + e.message);
        }
    });
    context.subscriptions.push(enableCmd);

    const disableCmd = vscode.commands.registerCommand('antigravity-ui.disable', async () => {
        try {
            restoreMainJs(mainJsPath);
            removeLoader(outDir);
            const action = await vscode.window.showInformationMessage(
                'Antigravity UI: Disabled successfully.',
                'Reload Window'
            );
            if (action === 'Reload Window') {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        } catch (e) {
            vscode.window.showErrorMessage('Error disabling Antigravity UI: ' + e.message);
        }
    });
    context.subscriptions.push(disableCmd);

    const setupTypographyCmd = vscode.commands.registerCommand('antigravity-ui.setupTypography', async () => {
        vscode.window.showInformationMessage('Antigravity UI: Vazirmatn typography is active for Chat and AI assistant; editor code font remains unchanged.');
    });
    context.subscriptions.push(setupTypographyCmd);

    // Auto-patch on startup if not already applied
    if (fs.existsSync(mainJsPath)) {
        try {
            copyLoader(outDir, context.extensionPath);
            if (!isPatched(mainJsPath)) {
                applyPatch(mainJsPath);
            }
        } catch (e) {
            console.error('[Antigravity UI] Auto-patch error:', e);
        }
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
