import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const ideExtSourceDir = path.join(rootDir, 'ide-extension');
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
  <Default Extension="cjs" ContentType="application/javascript"/>
  <Default Extension="css" ContentType="text/css"/>
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

// 3. Recursively copy ide-extension into stagingDir/extension
function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyRecursive(ideExtSourceDir, path.join(stagingDir, 'extension'));

// 4. Zip into VSIX using PowerShell Compress-Archive
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
