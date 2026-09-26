import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as asar from '@electron/asar';
import {
    computeSha256,
    detectPatchState,
    createPristineBackup,
    verifyBackupIntegrity,
    restoreBackup,
    applyPayloadToCode
} from '../lib/patcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const testDir = path.join(rootDir, 'temp-smoke-test');

console.log('🧪 Starting Antigravity UI Real Pipeline Smoke Test (v2.0.4)...');

try {
    // 1. Setup temporary sandbox
    if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(path.join(testDir, 'raw', 'dist'), { recursive: true });

    // 2. Create mock utils.js mimicking Antigravity Electron bundle
    const mockUtilsContent = `// Antigravity Electron Mock
const electron_1 = { app: { isPackaged: true } };
function setupWindow(win, url) {
    const devTools = !electron_1.app.isPackaged;
    void win.loadURL(url);
}
module.exports = { setupWindow };
`;
    const mockUtilsPath = path.join(testDir, 'raw', 'dist', 'utils.js');
    fs.writeFileSync(mockUtilsPath, mockUtilsContent, 'utf8');

    // 3. Pack pristine mock.asar
    const mockAsarPath = path.join(testDir, 'mock.asar');
    const mockBackupPath = mockAsarPath + '.bak';
    const mockMetaPath = mockAsarPath + '.meta.json';

    await asar.createPackage(path.join(testDir, 'raw'), mockAsarPath);
    const originalSha256 = computeSha256(mockAsarPath);

    if (originalSha256.length !== 64) {
        throw new Error(`Expected 64-character SHA-256 hash, received length ${originalSha256.length}`);
    }
    console.log(`  ✔ Packaged clean mock.asar (Full 64-char SHA-256: ${originalSha256.substring(0, 16)}...)`);

    // 4. Test detectPatchState on pristine code
    if (detectPatchState(mockUtilsContent) !== false) {
        throw new Error('detectPatchState should return false for virgin utils.js');
    }
    console.log('  ✔ detectPatchState verified false on virgin code.');

    // 5. Test createPristineBackup
    const meta = createPristineBackup(mockAsarPath, mockBackupPath, mockMetaPath, '2.0.4');
    if (meta.asarSha256 !== originalSha256) {
        throw new Error(`Metadata SHA-256 mismatch. Expected ${originalSha256}, got ${meta.asarSha256}`);
    }
    if (!fs.existsSync(mockBackupPath) || !fs.existsSync(mockMetaPath)) {
        throw new Error('Backup or metadata file was not created on disk.');
    }
    console.log('  ✔ createPristineBackup created .bak and valid 64-char metadata.');

    // 6. Test verifyBackupIntegrity on pristine backup
    const initialVerify = verifyBackupIntegrity(mockBackupPath, mockMetaPath);
    if (!initialVerify.valid) {
        throw new Error(`verifyBackupIntegrity failed on pristine backup: ${initialVerify.reason}`);
    }
    console.log('  ✔ verifyBackupIntegrity PASS on pristine backup.');

    // 7. Test applyPayloadToCode & Repack
    const payloadPath = path.join(rootDir, 'bin', 'payload.js');
    const payloadCode = fs.readFileSync(payloadPath, 'utf8');
    const patchedUtilsCode = applyPayloadToCode(mockUtilsContent, payloadCode, false);

    if (detectPatchState(patchedUtilsCode) !== true) {
        throw new Error('detectPatchState should return true on patched code.');
    }

    const extractDir = path.join(testDir, 'extracted');
    asar.extractAll(mockAsarPath, extractDir);
    fs.writeFileSync(path.join(extractDir, 'dist', 'utils.js'), patchedUtilsCode, 'utf8');
    await asar.createPackage(extractDir, mockAsarPath);
    console.log('  ✔ Injected UI Studio payload via applyPayloadToCode and repacked.');

    // 8. Test Integrity Enforcement on Corrupted Backup (Intentional Mismatch Abort)
    const tamperedBackupPath = path.join(testDir, 'tampered.asar.bak');
    const tamperedMetaPath = path.join(testDir, 'tampered.asar.meta.json');
    fs.writeFileSync(tamperedBackupPath, 'Corrupted binary content simulation', 'utf8');
    fs.writeFileSync(tamperedMetaPath, JSON.stringify({
        pluginVersion: '2.0.4',
        asarSha256: originalSha256
    }), 'utf8');

    const tamperedVerify = verifyBackupIntegrity(tamperedBackupPath, tamperedMetaPath);
    if (tamperedVerify.valid) {
        throw new Error('verifyBackupIntegrity should have failed on corrupted backup!');
    }

    let restoreBlocked = false;
    try {
        restoreBackup(mockAsarPath, tamperedBackupPath, tamperedMetaPath, { force: false });
    } catch (e) {
        restoreBlocked = true;
    }
    if (!restoreBlocked) {
        throw new Error('restoreBackup must throw and abort when backup is corrupted!');
    }
    console.log('  ✔ Integrity enforcement verified: Corrupted backup blocked loud and clear.');

    // 9. Test Clean Verified Restore
    const restoreResult = restoreBackup(mockAsarPath, mockBackupPath, mockMetaPath, { force: false });
    const restoredSha256 = computeSha256(mockAsarPath);

    if (restoredSha256 !== originalSha256) {
        throw new Error(`Restore failed: Hash mismatch. Original: ${originalSha256}, Restored: ${restoredSha256}`);
    }

    const verifyRestoredDir = path.join(testDir, 'verify-restored');
    asar.extractAll(mockAsarPath, verifyRestoredDir);
    const restoredCode = fs.readFileSync(path.join(verifyRestoredDir, 'dist', 'utils.js'), 'utf8');
    if (detectPatchState(restoredCode) !== false) {
        throw new Error('Restored archive still contains patch traces.');
    }
    console.log('  ✔ Verified restore passed: Bit-for-bit SHA-256 match, patch removed.');

    // 10. Cleanup
    fs.rmSync(testDir, { recursive: true, force: true });
    console.log('✨ All 9 real pipeline stages PASSED successfully!\n');

} catch (err) {
    if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
    }
    console.error('✖ Smoke test failed:', err);
    process.exit(1);
}
