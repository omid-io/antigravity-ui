import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stagingDir = path.join(rootDir, 'temp-extension-staging');
const assetsDir = path.join(rootDir, 'assets');
const outputVsix = path.join(assetsDir, 'antigravity-ui-1.0.0.vsix');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}
if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(path.join(stagingDir, 'extension'), { recursive: true });

// 1. [Content_Types].xml
const contentTypesXml = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="json" ContentType="application/json"/>
  <Default Extension="vsixmanifest" ContentType="text/xml"/>
  <Default Extension="md" ContentType="text/markdown"/>
  <Default Extension="js" ContentType="application/javascript"/>
</Types>`;
fs.writeFileSync(path.join(stagingDir, '[Content_Types].xml'), contentTypesXml, 'utf8');

// 2. extension.vsixmanifest
const vsixManifest = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Id="antigravity-ui" Version="1.0.0" Language="en-US" Publisher="omid-io"/>
    <DisplayName>Antigravity UI — IDE BiDi &amp; Typography Suite</DisplayName>
    <Description>Right-to-Left (RTL/BiDi) support, Vazirmatn typography, and ergonomics for Antigravity IDE</Description>
    <Categories>Other,Formatters</Categories>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true"/>
  </Assets>
</PackageManifest>`;
fs.writeFileSync(path.join(stagingDir, 'extension.vsixmanifest'), vsixManifest, 'utf8');

// 3. extension/package.json
const extPackageJson = {
    name: "antigravity-ui",
    displayName: "Antigravity UI — IDE BiDi & Typography Suite",
    description: "Right-to-Left (RTL/BiDi) support, Vazirmatn typography, and ergonomics for Antigravity IDE",
    version: "1.0.0",
    publisher: "omid-io",
    engines: {
        vscode: "^1.80.0"
    },
    categories: [
        "Other",
        "Formatters"
    ],
    main: "./extension.js",
    activationEvents: [
        "onStartupFinished"
    ],
    contributes: {
        commands: [
            {
                command: "antigravity-ui.toggleRtl",
                title: "Toggle RTL / LTR Direction",
                category: "Antigravity UI"
            },
            {
                command: "antigravity-ui.setupTypography",
                title: "Configure Persian & Vazirmatn Typography",
                category: "Antigravity UI"
            },
            {
                command: "antigravity-ui.insertRlm",
                title: "Insert Right-to-Left Mark (RLM)",
                category: "Antigravity UI"
            },
            {
                command: "antigravity-ui.insertLrm",
                title: "Insert Left-to-Right Mark (LRM)",
                category: "Antigravity UI"
            }
        ],
        keybindings: [
            {
                command: "antigravity-ui.toggleRtl",
                key: "ctrl+alt+r",
                mac: "cmd+alt+r",
                when: "editorTextFocus"
            }
        ]
    }
};
fs.writeFileSync(path.join(stagingDir, 'extension', 'package.json'), JSON.stringify(extPackageJson, null, 2), 'utf8');

// 4. extension/extension.js
const extensionJs = `const vscode = require('vscode');

function activate(context) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'antigravity-ui.toggleRtl';
    statusBarItem.text = '$(arrow-both) RTL';
    statusBarItem.tooltip = 'Antigravity UI: Toggle RTL direction / BiDi marker (Ctrl+Alt+R)';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    const toggleRtlCmd = vscode.commands.registerCommand('antigravity-ui.toggleRtl', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const selection = editor.selection;
        const RLM = '\\u200F';

        await editor.edit(editBuilder => {
            if (selection.isEmpty) {
                const line = document.lineAt(selection.active.line);
                const text = line.text;
                if (text.startsWith(RLM)) {
                    editBuilder.delete(new vscode.Range(line.lineNumber, 0, line.lineNumber, 1));
                    vscode.window.setStatusBarMessage('Antigravity UI: RTL marker removed', 2000);
                } else {
                    editBuilder.insert(new vscode.Position(line.lineNumber, 0), RLM);
                    vscode.window.setStatusBarMessage('Antigravity UI: Line set to Right-to-Left (RLM)', 2000);
                }
            } else {
                const text = document.getText(selection);
                if (text.startsWith(RLM)) {
                    editBuilder.replace(selection, text.substring(1));
                    vscode.window.setStatusBarMessage('Antigravity UI: Selection restored to default direction', 2000);
                } else {
                    editBuilder.replace(selection, RLM + text);
                    vscode.window.setStatusBarMessage('Antigravity UI: Selection marked as Right-to-Left', 2000);
                }
            }
        });
    });
    context.subscriptions.push(toggleRtlCmd);

    const setupTypographyCmd = vscode.commands.registerCommand('antigravity-ui.setupTypography', async () => {
        const config = vscode.workspace.getConfiguration('editor');
        const currentFont = config.get('fontFamily') || '';
        const targetFont = "Vazirmatn, 'Segoe UI', Tahoma, Consolas, monospace";

        if (!currentFont.includes('Vazirmatn')) {
            const newFont = currentFont ? \`Vazirmatn, \${currentFont}\` : targetFont;
            await config.update('fontFamily', newFont, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('Antigravity UI: Vazirmatn typography configured for IDE!');
        } else {
            vscode.window.showInformationMessage('Antigravity UI: Vazirmatn is already configured in editor.fontFamily.');
        }
    });
    context.subscriptions.push(setupTypographyCmd);

    const insertRlmCmd = vscode.commands.registerCommand('antigravity-ui.insertRlm', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        await editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, '\\u200F');
        });
        vscode.window.setStatusBarMessage('Inserted RLM (Right-to-Left Mark)', 2000);
    });
    context.subscriptions.push(insertRlmCmd);

    const insertLrmCmd = vscode.commands.registerCommand('antigravity-ui.insertLrm', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        await editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, '\\u200E');
        });
        vscode.window.setStatusBarMessage('Inserted LRM (Left-to-Right Mark)', 2000);
    });
    context.subscriptions.push(insertLrmCmd);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
`;
fs.writeFileSync(path.join(stagingDir, 'extension', 'extension.js'), extensionJs, 'utf8');

// 5. extension/README.md
const extReadme = `# Antigravity UI for IDE

Official companion extension for Google Antigravity IDE:
- Bidirectional (RTL/LTR) marker toggle via Status Bar and Shortcut (\`Ctrl+Alt+R\` / \`Cmd+Alt+R\`)
- Native Vazirmatn and Persian/Arabic typography setup
- Seamless integration with Antigravity Desktop App
`;
fs.writeFileSync(path.join(stagingDir, 'extension', 'README.md'), extReadme, 'utf8');

// 6. Zip into VSIX using PowerShell Compress-Archive
console.log('Packaging extension into ' + outputVsix + '...');
if (fs.existsSync(outputVsix)) {
    fs.unlinkSync(outputVsix);
}

const tempZip = path.join(rootDir, 'temp-extension.zip');
if (fs.existsSync(tempZip)) {
    fs.unlinkSync(tempZip);
}

execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${tempZip}' -Force"`);
fs.renameSync(tempZip, outputVsix);
fs.rmSync(stagingDir, { recursive: true, force: true });

console.log('Successfully created ' + outputVsix);
