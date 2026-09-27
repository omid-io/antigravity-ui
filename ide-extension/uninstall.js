const fs = require('fs');
const path = require('path');
const os = require('os');

const PATCH_MARKER = 'antigravity-ui-loader.cjs';
const LOADER_FILENAME = 'antigravity-ui-loader.cjs';
const BACKUP_PREFIX = 'main.js.antigravity-ui-backup-';

function findMainJsCandidates() {
    const candidates = [];
    if (process.platform === 'win32') {
        const localAppData = process.env.LOCALAPPDATA || '';
        if (localAppData) {
            candidates.push(
                path.join(localAppData, 'Programs', 'Antigravity IDE', 'resources', 'app', 'out', 'main.js'),
                path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app', 'out', 'main.js')
            );
        }
        const programFiles = process.env['ProgramFiles'] || '';
        if (programFiles) {
            candidates.push(
                path.join(programFiles, 'Antigravity IDE', 'resources', 'app', 'out', 'main.js')
            );
        }
    } else if (process.platform === 'darwin') {
        candidates.push(
            '/Applications/Antigravity IDE.app/Contents/Resources/app/out/main.js',
            '/Applications/Antigravity.app/Contents/Resources/app/out/main.js'
        );
    } else {
        candidates.push(
            '/opt/Antigravity IDE/resources/app/out/main.js',
            '/usr/share/antigravity-ide/resources/app/out/main.js'
        );
    }
    return candidates;
}

function findPatchedMainJs() {
    for (const candidate of findMainJsCandidates()) {
        try {
            if (!fs.existsSync(candidate)) continue;
            const content = fs.readFileSync(candidate, 'utf-8');
            if (content.includes(PATCH_MARKER)) {
                return candidate;
            }
        } catch (e) {
            continue;
        }
    }
    return null;
}

function findLatestBackup(mainJsDir) {
    try {
        const files = fs.readdirSync(mainJsDir);
        const backups = files.filter(f => f.startsWith(BACKUP_PREFIX)).sort().reverse();
        return backups.length > 0 ? path.join(mainJsDir, backups[0]) : null;
    } catch (e) {
        return null;
    }
}

function removePatch(mainJsPath) {
    const dir = path.dirname(mainJsPath);
    const latestBackup = findLatestBackup(dir);
    if (latestBackup && fs.existsSync(latestBackup)) {
        fs.copyFileSync(latestBackup, mainJsPath);
        try { fs.unlinkSync(latestBackup); } catch (e) {}
    } else {
        const content = fs.readFileSync(mainJsPath, 'utf-8');
        if (content.includes(PATCH_MARKER)) {
            const filtered = content.split('\n').filter(line => !line.includes(PATCH_MARKER));
            fs.writeFileSync(mainJsPath, filtered.join('\n'), 'utf-8');
        }
    }
    try {
        const p = path.join(dir, LOADER_FILENAME);
        if (fs.existsSync(p)) {
            fs.unlinkSync(p);
        }
    } catch (e) {}
}

const mainJsPath = findPatchedMainJs();
if (mainJsPath) {
    try {
        removePatch(mainJsPath);
    } catch (e) {}
}
