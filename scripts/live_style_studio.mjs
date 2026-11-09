import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 49888;
const DEVTOOLS_PORT_PATH = path.join(os.homedir(), 'AppData', 'Roaming', 'Antigravity', 'DevToolsActivePort');

function getDevToolsPort() {
  if (!fs.existsSync(DEVTOOLS_PORT_PATH)) return null;
  try {
    const lines = fs.readFileSync(DEVTOOLS_PORT_PATH, 'utf8').trim().split('\n');
    return lines[0]?.trim() || null;
  } catch (_) {
    return null;
  }
}

async function evalInAntigravity(expr) {
  const port = getDevToolsPort();
  if (!port) throw new Error('DevToolsActivePort not found');

  const targets = await fetch(`http://127.0.0.1:${port}/json`).then(r => r.json());
  const mainTarget = targets.find(t => t.type === 'page' && !t.url.startsWith('plugin://'));
  if (!mainTarget) throw new Error('Main Antigravity window target not found');

  const msgId = Math.floor(Math.random() * 1000000) + 1;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(mainTarget.webSocketDebuggerUrl);
    const timer = setTimeout(() => {
      try { ws.close(); } catch (_) {}
      reject(new Error('WebSocket timeout for eval'));
    }, 6000);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: msgId,
        method: 'Runtime.evaluate',
        params: { expression: expr, returnByValue: true }
      }));
    };

    ws.onmessage = (event) => {
      try {
        const res = JSON.parse(event.data);
        if (res.id === msgId) {
          clearTimeout(timer);
          ws.close();
          if (res.result?.exceptionDetails) {
            console.error('CDP Evaluation Exception:', res.result.exceptionDetails);
            reject(new Error(res.result.exceptionDetails.text || 'CDP Exception'));
            return;
          }
          resolve(res.result?.result?.value);
        }
      } catch (e) {}
    };

    ws.onerror = (err) => {
      clearTimeout(timer);
      reject(err);
    };
  });
}

function generateCSS(state) {
  const { blueText = true, mediumWeight = true, largeIcon = true, compactSpacing = true } = state;

  const textColorLight = blueText ? '#2563eb' : '#64748b';
  const textColorDark = blueText ? '#60a5fa' : '#94a3b8';
  const weightVal = mediumWeight ? '500' : '400';
  const iconScaleVal = largeIcon ? 'transform: scale(1.22) !important;' : 'transform: none !important;';
  const spacingMargin = compactSpacing ? '4px' : '0px';
  const spacingPadding = compactSpacing ? '2px' : '0px';

  return `
    /* Project Container Breathing Space */
    html body [role="navigation"][aria-label="Sidebar"] div[data-sidebar-section-drop-id]:has([data-testid="project-header"]) {
      margin-top: ${spacingMargin} !important;
      padding-top: ${spacingPadding} !important;
      border-top: none !important;
    }
    html body [role="navigation"][aria-label="Sidebar"] div[data-sidebar-section-drop-id="main-section-header"] + div[data-sidebar-section-drop-id]:has([data-testid="project-header"]) {
      margin-top: 2px !important;
      padding-top: 2px !important;
      border-top: none !important;
    }

    /* Clean Project Header (No Background Cards, Custom Color & Weight) */
    html body [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
    html body [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: ${textColorLight} !important;
      font-weight: ${weightVal} !important;
      font-size: 13px !important;
      padding-right: 12px !important;
      padding-left: 6px !important;
      position: relative !important;
      border-radius: 8px !important;
      transition: background-color 0.15s ease, color 0.15s ease !important;
    }
    .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
    .dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
    html body.dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
    .theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"],
    .dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"],
    html body.dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"],
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] {
      background: transparent !important;
      border: none !important;
      color: ${textColorDark} !important;
    }

    /* Subtle Hover */
    html body [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
    html body [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover {
      background: rgba(0, 0, 0, 0.04) !important;
      padding-right: 6px !important;
    }
    .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
    .dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
    html body.dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
    .theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover,
    .dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover,
    html body.dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover,
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover {
      background: rgba(255, 255, 255, 0.06) !important;
    }

    /* Folder Icon (Muted Color + Scaled Size) */
    html body [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] svg,
    html body [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] svg {
      color: #64748b !important;
      opacity: 1 !important;
      ${iconScaleVal}
      transition: transform 0.15s ease, color 0.15s ease !important;
    }
    .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] svg,
    .dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] svg,
    html body.dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] svg,
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] svg,
    .theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] svg,
    .dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] svg,
    html body.dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] svg,
    html body.theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] svg {
      color: #94a3b8 !important;
    }

    /* Action Buttons Backdrop Shield */
    html body [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 {
      background: #eaf1fb !important;
    }
    .theme-dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1,
    .dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 {
      background: #1c273a !important;
    }
  `;
}

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Antigravity Projects - Sidebar Style Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #0f172a; }
    .card-panel { background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .switch-track {
      width: 44px;
      height: 24px;
      background-color: #cbd5e1;
      border-radius: 9999px;
      position: relative;
      transition: background-color 0.2s ease;
      cursor: pointer;
    }
    .switch-track.active {
      background-color: #2563eb;
    }
    .switch-thumb {
      width: 18px;
      height: 18px;
      background-color: #ffffff;
      border-radius: 9999px;
      position: absolute;
      top: 3px;
      right: 3px;
      transition: transform 0.2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    .switch-track.active .switch-thumb {
      transform: translateX(-20px);
    }
  </style>
</head>
<body class="p-6 min-h-screen flex items-center justify-center">
  <div class="max-w-xl w-full space-y-5">

    <!-- Header -->
    <div class="card-panel rounded-2xl p-5 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse"></span>
          <h1 class="text-base font-bold text-slate-900">Sidebar Projects Final Settings</h1>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          Selected customization switches:
        </p>
      </div>
      <div id="status-pill" class="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Active & Applied ✔
      </div>
    </div>

    <!-- The 4 Selected Options with Switches -->
    <div class="card-panel rounded-2xl divide-y divide-slate-100 overflow-hidden">

      <!-- Item 1: Blue Project Title -->
      <div class="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            T
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800">Project Title Color: Dynamic Accent</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Clear separation of project titles from chat items</div>
          </div>
        </div>
        <div onclick="toggle('blueText')" id="sw-blueText" class="switch-track active">
          <div class="switch-thumb"></div>
        </div>
      </div>

      <!-- Item 2: Medium Font Weight -->
      <div class="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
            W
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800">Project Title Font Weight: Medium (500)</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Optimal typography hierarchy without bold clutter</div>
          </div>
        </div>
        <div onclick="toggle('mediumWeight')" id="sw-mediumWeight" class="switch-track active">
          <div class="switch-thumb"></div>
        </div>
      </div>

      <!-- Item 3: Scaled Folder Icon -->
      <div class="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            📁
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800">Folder Icon Scale: Emphasized (122%)</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Harmonized icon styling with enhanced visibility</div>
          </div>
        </div>
        <div onclick="toggle('largeIcon')" id="sw-largeIcon" class="switch-track active">
          <div class="switch-thumb"></div>
        </div>
      </div>

      <!-- Item 4: Compact Breathing Gap -->
      <div class="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
            ↔
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800">Breathing Gap: Compact (4px, Borderless)</div>
            <div class="text-[11px] text-slate-400 mt-0.5">Clean negative space without divider lines</div>
          </div>
        </div>
        <div onclick="toggle('compactSpacing')" id="sw-compactSpacing" class="switch-track active">
          <div class="switch-thumb"></div>
        </div>
      </div>

    </div>

    <!-- Bottom Actions -->
    <div class="flex items-center justify-between pt-1 text-xs">
      <button onclick="resetAll(false)" class="text-slate-400 hover:text-slate-600 transition">
        Turn off all (Full Default)
      </button>
      <button onclick="resetAll(true)" class="text-blue-600 hover:text-blue-700 font-bold transition">
        Turn on all selections
      </button>
    </div>

  </div>

  <script>
    let state = {
      blueText: true,
      mediumWeight: true,
      largeIcon: true,
      compactSpacing: true
    };

    function updateSwitches() {
      for (const [key, val] of Object.entries(state)) {
        const el = document.getElementById('sw-' + key);
        if (el) {
          if (val) el.classList.add('active');
          else el.classList.remove('active');
        }
      }
    }

    async function send() {
      const statusPill = document.getElementById('status-pill');
      statusPill.innerHTML = '<span class="w-2 h-2 rounded-full bg-blue-500 animate-spin"></span> Applying...';

      try {
        const res = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        });
        const data = await res.json();
        if (data.success) {
          statusPill.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Applied ✔';
        } else {
          statusPill.textContent = 'Error applying';
        }
      } catch (e) {
        statusPill.textContent = 'Server communication error';
      }
    }

    function toggle(key) {
      state[key] = !state[key];
      updateSwitches();
      send();
    }

    function resetAll(val) {
      state.blueText = val;
      state.mediumWeight = val;
      state.largeIcon = val;
      state.compactSpacing = val;
      updateSwitches();
      send();
    }

    updateSwitches();
  </script>
</body>
</html>
`;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML_PAGE);
    return;
  }

  if (req.method === 'POST' && req.url === '/api/apply') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const state = JSON.parse(body || '{}');
        const css = generateCSS(state);

        const evalExpr = `(() => {
          let live = document.getElementById('antigravity-live-preview-style');
          if (!live) {
            live = document.createElement('style');
            live.id = 'antigravity-live-preview-style';
            document.body.appendChild(live);
          } else {
            document.body.appendChild(live);
          }
          live.textContent = ${JSON.stringify(css)};
          return 'Applied';
        })()`;

        const result = await evalInAntigravity(evalExpr);
        console.log('Applied live CSS for options:', state);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      } catch (err) {
        console.error('Error applying live CSS:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Live Style Studio Server running at http://127.0.0.1:${PORT}`);
});
