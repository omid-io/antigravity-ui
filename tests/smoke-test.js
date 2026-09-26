import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import * as asar from '@electron/asar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const testDir = path.join(rootDir, 'temp-smoke-test');

console.log('🧪 Starting Antigravity UI Pipeline Smoke Test...');

// 1. Setup temporary sandbox
if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
}
fs.mkdirSync(path.join(testDir, 'raw', 'dist'), { recursive: true });

// 2. Create mock utils.js mimicking Antigravity Electron bundle
const mockUtilsContent = `
// Antigravity Electron Mock
const electron_1 = { app: { isPackaged: true } };
function setupWindow(win, url) {
    const devTools = !electron_1.app.isPackaged;
    void win.loadURL(url);
}
module.exports = { setupWindow };
`;
fs.writeFileSync(path.join(testDir, 'raw', 'dist', 'utils.js'), mockUtilsContent, 'utf8');

// 3. Pack into initial mock.asar
const mockAsarPath = path.join(testDir, 'mock.asar');
const mockBackupPath = mockAsarPath + '.bak';
const mockMetaPath = mockAsarPath + '.meta.json';

await asar.createPackage(path.join(testDir, 'raw'), mockAsarPath);
const originalSha256 = crypto.createHash('sha256').update(fs.readFileSync(mockAsarPath)).digest('hex').substring(0, 16);
console.log(`  ✔ Packaged clean mock.asar (SHA-256 prefix: ${originalSha256})`);

// 4. Test Backup & Metadata Creation
fs.copyFileSync(mockAsarPath, mockBackupPath);
const metaData = {
    pluginVersion: '2.0.3',
    backedUpAt: new Date().toISOString(),
    asarSize: fs.statSync(mockAsarPath).size,
    asarSha256: originalSha256
};
fs.writeFileSync(mockMetaPath, JSON.stringify(metaData, null, 2));

if (!fs.existsSync(mockBackupPath) || !fs.existsSync(mockMetaPath)) {
    throw new Error('Smoke test failed: Backup or metadata file missing.');
}
console.log('  ✔ Version-aware backup and SHA-256 metadata verified.');

// 5. Test Injection Simulation
const extractDir = path.join(testDir, 'extracted');
asar.extractAll(mockAsarPath, extractDir);

const extractedUtilsPath = path.join(extractDir, 'dist', 'utils.js');
let extractedCode = fs.readFileSync(extractedUtilsPath, 'utf8');

const payloadPath = path.join(rootDir, 'bin', 'payload.js');
const payloadCode = fs.readFileSync(payloadPath, 'utf8');

if (!extractedCode.includes('void win.loadURL(url);')) {
    throw new Error('Smoke test failed: Anchor not found in mock utils.js.');
}

extractedCode = extractedCode.replace('void win.loadURL(url);', payloadCode);
fs.writeFileSync(extractedUtilsPath, extractedCode);

await asar.createPackage(extractDir, mockAsarPath);
console.log('  ✔ Injected UI Studio payload and repacked mock.asar.');

// 6. Verify Patched Archive
const verifyExtractDir = path.join(testDir, 'verify-extracted');
asar.extractAll(mockAsarPath, verifyExtractDir);
const verifiedCode = fs.readFileSync(path.join(verifyExtractDir, 'dist', 'utils.js'), 'utf8');

if (!verifiedCode.includes('/* ANTIGRAVITY UI PATCH */')) {
    throw new Error('Smoke test failed: Patched archive does not contain ANTIGRAVITY UI PATCH banner.');
}
console.log('  ✔ Patched archive verified: Contains ANTIGRAVITY UI PATCH.');

// 7. Test Restore Mechanism
fs.copyFileSync(mockBackupPath, mockAsarPath);
if (fs.existsSync(mockMetaPath)) {
    fs.unlinkSync(mockMetaPath);
}

const restoredSha256 = crypto.createHash('sha256').update(fs.readFileSync(mockAsarPath)).digest('hex').substring(0, 16);
if (restoredSha256 !== originalSha256) {
    throw new Error(`Smoke test failed: Restored SHA-256 (${restoredSha256}) does not match original (${originalSha256}).`);
}
console.log('  ✔ Restored archive verified: Exact SHA-256 match to original.');

// 8. Cleanup
fs.rmSync(testDir, { recursive: true, force: true });
console.log('✨ All pipeline smoke tests PASSED successfully!\n');
