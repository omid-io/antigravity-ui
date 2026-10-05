import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envFile = 'E:\\programming\\.security\\.secrets\\openvsx.env';

if (!fs.existsSync(envFile)) {
    console.error('[Open VSX] Error: Token file not found at ' + envFile);
    process.exit(1);
}

const envContent = fs.readFileSync(envFile, 'utf8');
let token = null;

for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('OVSX_PAT=')) {
        token = trimmed.split('=')[1].trim().replace(/^["']|["']$/g, '');
        break;
    }
    if (trimmed.startsWith('OPENVSX_TOKEN=')) {
        token = trimmed.split('=')[1].trim().replace(/^["']|["']$/g, '');
        break;
    }
}

if (!token) {
    console.error('[Open VSX] Error: No OVSX_PAT found in ' + envFile);
    process.exit(1);
}

// Find newest vsix in assets
const assetsDir = path.join(rootDir, 'assets');
const files = fs.readdirSync(assetsDir).filter(f => f.startsWith('antigravity-rtl-') && f.endsWith('.vsix')).sort().reverse();

if (files.length === 0) {
    console.error('[Open VSX] Error: No VSIX packages found in assets directory');
    process.exit(1);
}

const targetVsix = path.join(assetsDir, files[0]);
console.log(`[Open VSX] Publishing ${targetVsix}...`);

try {
    const output = execSync(`npx --yes ovsx publish "${targetVsix}" -p ${token}`, {
        cwd: rootDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
    });
    console.log(output.replace(token, '[REDACTED]'));
    console.log('[Open VSX] Successfully published!');
} catch (err) {
    const sanitizedMsg = (err.stderr || err.message || '').replace(token, '[REDACTED]');
    console.error('[Open VSX] Publish failed:', sanitizedMsg);
    process.exit(1);
}
