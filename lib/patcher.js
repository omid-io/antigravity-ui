import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Computes the full 64-character SHA-256 hex digest of a file.
 * @param {string} filePath - Absolute path to target file
 * @returns {string} 64-character hex hash
 */
export function computeSha256(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found for hash calculation: ${filePath}`);
    }
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Detects whether the provided utils.js code has already been patched by Antigravity UI.
 * @param {string} utilsCode - JavaScript code string from dist/utils.js
 * @returns {boolean} True if patched, false if unpatched official build
 */
export function detectPatchState(utilsCode) {
    if (typeof utilsCode !== 'string') return false;
    return utilsCode.includes('/* ANTIGRAVITY UI PATCH */') || utilsCode.includes('/* ANTIGRAVITY RTL PATCH */');
}

/**
 * Creates a pristine backup of an untouched official app.asar and writes structured metadata.
 * @param {string} asarPath - Path to target app.asar
 * @param {string} backupPath - Path to destination app.asar.bak
 * @param {string} metaPath - Path to destination app.asar.meta.json
 * @param {string} pluginVersion - Version of antigravity-ui creating the backup
 * @returns {{ pluginVersion: string, backedUpAt: string, asarSize: number, asarSha256: string }}
 */
export function createPristineBackup(asarPath, backupPath, metaPath, pluginVersion = 'unknown') {
    if (!fs.existsSync(asarPath)) {
        throw new Error(`Target app.asar does not exist: ${asarPath}`);
    }

    fs.copyFileSync(asarPath, backupPath);
    const asarSha256 = computeSha256(backupPath);
    const asarSize = fs.statSync(backupPath).size;
    const backedUpAt = new Date().toISOString();

    const metadata = {
        pluginVersion,
        backedUpAt,
        asarSize,
        asarSha256
    };

    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
    return metadata;
}

/**
 * Verifies the integrity of a backup against its metadata file.
 * @param {string} backupPath - Path to app.asar.bak
 * @param {string} metaPath - Path to app.asar.meta.json
 * @returns {{ valid: boolean, reason?: string, expectedSha256?: string, actualSha256?: string, metadata?: object }}
 */
export function verifyBackupIntegrity(backupPath, metaPath) {
    if (!fs.existsSync(backupPath)) {
        return { valid: false, reason: 'Backup file missing' };
    }

    if (!fs.existsSync(metaPath)) {
        return { valid: true, reason: 'Legacy backup without metadata (unverified)', legacy: true };
    }

    try {
        const metaContent = fs.readFileSync(metaPath, 'utf8');
        const metadata = JSON.parse(metaContent);

        if (!metadata.asarSha256) {
            return { valid: true, reason: 'Metadata exists but lacks asarSha256 field (legacy)', legacy: true, metadata };
        }

        const actualSha256 = computeSha256(backupPath);
        const expectedSha256 = metadata.asarSha256;

        // Support both full 64-char match and 16-char legacy prefix match
        const matches = expectedSha256.length === 64
            ? actualSha256 === expectedSha256
            : actualSha256.startsWith(expectedSha256);

        if (!matches) {
            return {
                valid: false,
                reason: 'SHA-256 integrity mismatch. Backup file may be corrupted or altered.',
                expectedSha256,
                actualSha256,
                metadata
            };
        }

        return {
            valid: true,
            reason: 'SHA-256 verified successfully',
            expectedSha256,
            actualSha256,
            metadata
        };
    } catch (e) {
        return { valid: false, reason: `Failed to parse metadata: ${e.message}` };
    }
}

/**
 * Restores the backup file after verifying integrity.
 * @param {string} asarPath - Target destination app.asar
 * @param {string} backupPath - Source app.asar.bak
 * @param {string} metaPath - Source app.asar.meta.json
 * @param {{ force?: boolean }} options - Force restore even if verification fails
 * @returns {{ success: boolean, message: string }}
 */
export function restoreBackup(asarPath, backupPath, metaPath, options = {}) {
    const verification = verifyBackupIntegrity(backupPath, metaPath);

    if (!verification.valid && !options.force) {
        throw new Error(
            `Restore aborted: ${verification.reason}` +
            (verification.expectedSha256 ? `\nExpected SHA-256: ${verification.expectedSha256}\nActual SHA-256:   ${verification.actualSha256}` : '') +
            `\nUse --force to override this safety check if you know what you are doing.`
        );
    }

    fs.copyFileSync(backupPath, asarPath);

    if (fs.existsSync(metaPath)) {
        try { fs.unlinkSync(metaPath); } catch (e) {}
    }

    return {
        success: true,
        message: verification.legacy
            ? 'Restored from legacy backup (integrity unverified).'
            : 'Restored cleanly with SHA-256 verification passed.'
    };
}

/**
 * Applies the UI Studio payload and optional DevTools toggle to utils.js code.
 * @param {string} utilsCode - Content of utils.js
 * @param {string} payloadCode - Content of payload.js
 * @param {boolean} enableDevTools - Whether to unlock Chromium DevTools
 * @returns {string} Modified utils.js code
 */
export function applyPayloadToCode(utilsCode, payloadCode, enableDevTools = false) {
    const anchor = 'void win.loadURL(url);';
    if (!utilsCode.includes(anchor)) {
        throw new Error('Injection anchor "void win.loadURL(url);" not found in utils.js.');
    }

    let modifiedCode = utilsCode.replace(anchor, payloadCode);
    if (enableDevTools) {
        modifiedCode = modifiedCode.replace(/devTools:\s*!electron_1?\.app\.isPackaged/g, 'devTools: true');
    }
    return modifiedCode;
}
