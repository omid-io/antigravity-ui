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
import {
    isNewerVersion,
    parseSemver,
    stripAnsi,
    renderUpdateBox,
    writeCache,
    readCache,
    clearCache,
    fetchLatestVersion,
    reExecUpdatedCli
} from '../lib/updater.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const testDir = path.join(rootDir, 'temp-smoke-test');

console.log('🧪 Starting Antigravity UI Real Pipeline Smoke Test (v2.0.8)...');

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

    // 10. Deep Integration Test: Strict SemVer 2.0, AbortSignal Cancellation, Cache Lifecycle, and Child Process Re-exec
    // A. Strict SemVer 2.0 verification and invalid format rejection
    if (isNewerVersion('01.2.3', '1.2.3')) throw new Error('isNewerVersion should reject leading zero in current');
    if (isNewerVersion('1.2.3', '01.2.4')) throw new Error('isNewerVersion should reject leading zero in latest');
    if (isNewerVersion('1.2.3-alpha..1', '1.2.3')) throw new Error('isNewerVersion should reject empty prerelease identifier');
    if (parseSemver('01.2.3') !== null) throw new Error('parseSemver should reject 01.2.3');
    if (parseSemver('1.2.3-alpha..1') !== null) throw new Error('parseSemver should reject double dots in prerelease');

    if (!isNewerVersion('2.0.7', '2.0.8')) throw new Error('isNewerVersion failed on patch upgrade');
    if (!isNewerVersion('2.0.7', '2.1.0')) throw new Error('isNewerVersion failed on minor upgrade');
    if (!isNewerVersion('2.0.7', '3.0.0')) throw new Error('isNewerVersion failed on major upgrade');
    if (isNewerVersion('2.0.7', '2.0.7')) throw new Error('isNewerVersion should be false for equal versions');
    if (isNewerVersion('2.0.8', '2.0.7')) throw new Error('isNewerVersion should be false for older versions');

    const parsed = parseSemver('v2.0.8-beta.1+build.12');
    if (!parsed || parsed.major !== 2 || parsed.minor !== 0 || parsed.patch !== 8 || parsed.prerelease[0] !== 'beta' || parsed.prerelease[1] !== 1) {
        throw new Error('parseSemver failed on full SemVer 2.0 spec');
    }
    if (!isNewerVersion('2.0.8-beta.1', '2.0.8')) throw new Error('Release should be newer than pre-release');
    if (isNewerVersion('2.0.8', '2.0.8-beta.1')) throw new Error('Pre-release should not be newer than release');
    if (!isNewerVersion('2.0.8-beta.1', '2.0.8-beta.2')) throw new Error('beta.2 should be newer than beta.1');
    if (!isNewerVersion('2.0.8-alpha', '2.0.8-beta')) throw new Error('beta should be newer than alpha');

    // B. AbortSignal Immediate Cancellation Test (Zero-latency verification)
    const testAbortController = new AbortController();
    testAbortController.abort();
    const abortStart = Date.now();
    const abortedResult = await fetchLatestVersion('antigravity-ui', 5000, testAbortController.signal);
    const abortDuration = Date.now() - abortStart;
    if (abortedResult !== null) throw new Error('Aborted fetch should immediately return null');
    if (abortDuration > 50) throw new Error(`Aborted fetch exceeded 50ms guard: took ${abortDuration}ms`);

    // C. Child Process Integration Test: reExecUpdatedCli without shell
    const mockCliPath = path.join(testDir, 'mock-cli.js');
    fs.writeFileSync(mockCliPath, [
        'const args = process.argv.slice(2);',
        'console.log("MOCK_RE_EXEC_OUT:" + args.join(","));',
        'if (args.includes("--fail-test")) process.exit(42);',
        'process.exit(0);'
    ].join('\n'), 'utf8');

    // Test C1: Successful child spawn with forwarded arguments and clean output
    const reExecSuccess = reExecUpdatedCli('test-pkg', ['--devtools', '--force'], {
        cliPath: mockCliPath,
        stdio: 'pipe'
    });
    if (!reExecSuccess.success || reExecSuccess.status !== 0) {
        throw new Error(`reExecUpdatedCli failed in normal execution: status ${reExecSuccess.status}`);
    }
    const stdoutStr = reExecSuccess.stdout ? reExecSuccess.stdout.toString() : '';
    if (!stdoutStr.includes('MOCK_RE_EXEC_OUT:--devtools,--force')) {
        throw new Error(`reExecUpdatedCli did not forward arguments properly. Output: ${stdoutStr}`);
    }

    // Test C2: Non-zero exit code propagation
    const reExecFailed = reExecUpdatedCli('test-pkg', ['--fail-test'], {
        cliPath: mockCliPath,
        stdio: 'pipe'
    });
    if (reExecFailed.success !== false || reExecFailed.status !== 42) {
        throw new Error(`reExecUpdatedCli failed to propagate non-zero exit code 42: got ${reExecFailed.status}`);
    }

    // Test C3: Binary resolution failure handling
    const reExecMissing = reExecUpdatedCli('test-pkg', [], {
        cliPath: 'non-existent-script.js',
        nodePath: 'non-existent-node-binary-xyz',
        stdio: 'pipe'
    });
    if (reExecMissing.success !== false || reExecMissing.status !== 1 || !reExecMissing.error) {
        throw new Error('reExecUpdatedCli failed to handle launch error gracefully');
    }

    // D. ANSI Stripping & Box Rendering
    const cleanStr = stripAnsi('\x1b[31mHello\x1b[0m \x1b[32mWorld\x1b[0m');
    if (cleanStr !== 'Hello World') throw new Error(`stripAnsi failed. Received: "${cleanStr}"`);

    const box = renderUpdateBox('2.0.7', '2.0.8');
    if (!box.includes('2.0.7') || !box.includes('2.0.8') || !box.includes('antigravity-ui update')) {
        throw new Error('renderUpdateBox output missing expected content');
    }

    // E. Cache Lifecycle & Clean Invalidation
    const testCachePath = path.join(testDir, 'test-cache.json');
    writeCache('2.0.8', testCachePath);
    const cachedData = readCache(testCachePath);
    if (!cachedData || cachedData.latestVersion !== '2.0.8' || typeof cachedData.lastCheck !== 'number') {
        throw new Error('readCache failed to retrieve correctly formatted cache data');
    }
    writeCache(null, testCachePath);
    if (fs.existsSync(testCachePath)) throw new Error('writeCache(null) should cleanly delete cache file');

    writeCache('2.0.8', testCachePath);
    clearCache(testCachePath);
    if (fs.existsSync(testCachePath)) throw new Error('clearCache should cleanly delete cache file');

    console.log('  ✔ Updater SemVer 2.0 (authoritative semver lib), AbortSignal cancellation, child process re-exec integration, and cache verified.');

    // 11. Cleanup
    fs.rmSync(testDir, { recursive: true, force: true });
    console.log('✨ All 10 real pipeline stages PASSED successfully!\n');

} catch (err) {
    if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
    }
    console.error('✖ Smoke test failed:', err);
    process.exit(1);
}
