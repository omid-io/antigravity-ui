import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { SidecarApp, Response } from 'sidecar_sdk';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(homedir(), '.antigravity-ui.json');
const LEGACY_CONFIG_PATH = join(homedir(), '.antigravity-rtl.json');
const DEVTOOLS_PORT_PATH = join(homedir(), 'AppData', 'Roaming', 'Antigravity', 'DevToolsActivePort');
const ASAR_PATH = join(homedir(), 'AppData', 'Local', 'Programs', 'antigravity', 'resources', 'app.asar');
const FONT_PATH = join(HERE, 'Vazirmatn-Variable.woff2');

let fontBase64 = '';
try {
  if (existsSync(FONT_PATH)) {
    fontBase64 = readFileSync(FONT_PATH).toString('base64');
  } else {
    const fallbackFont = 'E:/programming/antigravity-ui/bin/Vazirmatn-Variable.woff2';
    if (existsSync(fallbackFont)) {
      fontBase64 = readFileSync(fallbackFont).toString('base64');
    }
  }
} catch (e) {
  console.error('[antigravity-ui] Font load error:', e.message);
}

// ---------------------------------------------------------------------------
// Resilient CDP Bridge with Auto-Healer & Navigation Guards
// ---------------------------------------------------------------------------
class ResilientCdpBridge {
  constructor() {
    this.activeSockets = new Map(); // targetId -> WebSocket
    this.currentPort = null;
    this.heartbeatTimer = null;
    this.config = loadConfig();
  }

  getDevToolsPort() {
    if (!existsSync(DEVTOOLS_PORT_PATH)) return null;
    try {
      const content = readFileSync(DEVTOOLS_PORT_PATH, 'utf8').trim().split('\n');
      return content[0]?.trim() || null;
    } catch (_) {
      return null;
    }
  }

  generateScript(c) {
    const isRTL = c.isRTL !== false;
    const forceRTL = Boolean(c.forceRTL);
    const lh = c.lh || '1.6';
    const fs = c.fs || '16';
    const faFont = c.faFont ? c.faFont.trim() : '';
    const userMsgEnabled = c.userMsgEnabled !== false;
    const userMsgDark = c.userMsgDark || { bg: '#1e2433', text: '#f1f5f9', border: '#384c6e', borderWidth: '1.5', shadow: 'soft' };
    const userMsgLight = c.userMsgLight || { bg: '#f0f4ff', text: '#0f172a', border: '#cbd5e1', borderWidth: '1.5', shadow: 'soft' };

    let faFontRule = '';
    let faFontName = "'Vazirmatn'";
    if (faFont) {
      faFontName = `'${faFont}', 'Vazirmatn'`;
      const baseFa = faFont.replace(/[-\\s]?Regular$/i, '');
      faFontRule = `
        @font-face {
          font-family: '${faFont}';
          src: local('${faFont}'), local('${baseFa}');
          font-weight: 400;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
      `;
    }

    const forceRtlCSS = forceRTL ? `
      .prose > *:not(pre):not(code), 
      [data-testid="chat-message"] > *:not(pre):not(code), 
      .markdown-body > *:not(pre):not(code), 
      .leading-relaxed > *:not(pre):not(code),
      [data-testid="user-input-step"],
      [data-testid="user-input-step"] > *:not(pre):not(code) {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: isolate !important;
      }
    ` : '';

    const userMsgCSS = userMsgEnabled ? `
      :root, body, body.light, body.theme-light {
        --user-msg-bg: ${userMsgLight.bg};
        --user-msg-text: ${userMsgLight.text};
        --user-msg-border-color: ${userMsgLight.border};
        --user-msg-border-width: ${userMsgLight.borderWidth}px;
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --user-msg-bg: ${userMsgDark.bg};
        --user-msg-text: ${userMsgDark.text};
        --user-msg-border-color: ${userMsgDark.border};
        --user-msg-border-width: ${userMsgDark.borderWidth}px;
      }
      [data-testid="user-input-step"] {
        position: relative !important;
        z-index: 10 !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div {
        background-color: var(--user-msg-bg) !important;
        border: var(--user-msg-border-width) solid var(--user-msg-border-color) !important;
        color: var(--user-msg-text) !important;
        border-radius: 0.75rem !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] .whitespace-pre-wrap,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] p,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] span:not(.text-muted-foreground) {
        color: var(--user-msg-text) !important;
      }
    ` : '';

    return `
(() => {
  try {
    let uiStyle = document.getElementById('antigravity-ui-style');
    if (!uiStyle) {
      uiStyle = document.createElement('style');
      uiStyle.id = 'antigravity-ui-style';
      document.head.appendChild(uiStyle);
    }

    uiStyle.textContent = \`
      @font-face {
        font-family: 'Vazirmatn';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 100 900;
        unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
      }
      ${faFontRule}

      /* Compact Sidebar Resizer Support */
      div:has(> div > [role="navigation"][aria-label="Sidebar"]),
      div:has(> [role="navigation"][aria-label="Sidebar"]) {
        min-width: 0 !important;
      }

      /* Typography & Fonts */
      :root, :host, html, body {
        font-family: ${faFontName}, ui-sans-serif, system-ui, sans-serif !important;
      }
      .prose, .prose p, .prose li, [data-testid="chat-message"], [data-testid="chat-message"] p,
      .markdown-body, .markdown-body p, .leading-relaxed, .leading-relaxed p,
      [data-testid="user-input-step"], [contenteditable="true"], [data-lexical-text="true"] {
        font-size: ${fs}px !important;
      }
      .leading-relaxed, .prose p, .prose li, [data-testid="chat-message"] p,
      [data-testid="user-input-step"], [contenteditable="true"] {
        line-height: ${lh} !important;
      }

      /* Plaintext Direction Isolation */
      p, h1, h2, h3, h4, h5, h6, ul, ol, .prose > *, [data-testid="chat-message"] > * {
        unicode-bidi: plaintext;
        text-align: start;
      }
      ${forceRtlCSS}

      /* RTL List Indent */
      ul:not(#_)[dir="rtl"], ol:not(#_)[dir="rtl"], [dir="rtl"] ul:not(#_), [dir="rtl"] ol:not(#_) {
        padding-left: 0 !important;
        padding-right: 1.25rem !important;
      }

      /* Monospace Code Isolation */
      pre, code, pre *, code * {
        unicode-bidi: isolate !important;
        direction: ltr !important;
        text-align: left !important;
      }

      ${userMsgCSS}
    \`;

    /* Sidebar Resizer */
    const resizer = document.querySelector('.cursor-col-resize');
    if (resizer && !resizer.dataset.rtlInit) {
      resizer.dataset.rtlInit = 'true';
      const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
      const parent = sidebar ? sidebar.parentElement : null;
      const grandParent = parent ? parent.parentElement : null;

      if (grandParent) {
        const storedW = parseInt(localStorage.getItem('sidebarWidth') || '${c.sidebarWidth || 256}', 10);
        if (storedW && storedW >= 160 && storedW < 256) {
          grandParent.style.setProperty('width', storedW + 'px', 'important');
          if (parent) parent.style.setProperty('width', storedW + 'px', 'important');
        }
      }

      let isDragging = false;
      let startX = 0;
      let startW = 0;

      function onMove(ev) {
        if (!isDragging || !grandParent) return;
        const delta = ev.clientX - startX;
        let newW = Math.round(startW + delta);
        if (newW < 160) newW = 160;
        if (newW > 420) newW = 420;
        grandParent.style.setProperty('width', newW + 'px', 'important');
        if (parent) parent.style.setProperty('width', newW + 'px', 'important');
      }

      function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        window.removeEventListener('pointermove', onMove, true);
        window.removeEventListener('pointerup', onEnd, true);
        if (grandParent) {
          localStorage.setItem('sidebarWidth', grandParent.offsetWidth);
        }
      }

      resizer.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isDragging = true;
        startX = e.clientX;
        startW = grandParent ? grandParent.offsetWidth : 256;
        window.addEventListener('pointermove', onMove, true);
        window.addEventListener('pointerup', onEnd, true);
      }, { capture: true });
    }

    /* Shift+2 Fix */
    if (${c.fixAtSign !== false} && !window.__ANTIGRAVITY_AT_FIX__) {
      window.__ANTIGRAVITY_AT_FIX__ = true;
      window.addEventListener('keydown', (e) => {
        if (e.key === '2' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
          const active = document.activeElement;
          if (active && (active.isContentEditable || active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
            e.preventDefault();
            e.stopPropagation();
            document.execCommand('insertText', false, '@');
          }
        }
      }, true);
    }

    return true;
  } catch (err) {
    return err.message;
  }
})()
    `;
  }

  async syncWithTargets() {
    const port = this.getDevToolsPort();
    if (!port) return;
    this.currentPort = port;

    http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const targets = JSON.parse(raw);
          const pages = targets.filter(t => t.type === 'page');

          for (const page of pages) {
            let ws = this.activeSockets.get(page.id);
            if (!ws || ws.readyState !== WebSocket.OPEN) {
              this.attachToPage(page);
            } else {
              // Heartbeat Auto-Healer: verify style tag is in DOM
              ws.send(JSON.stringify({
                id: 999,
                method: 'Runtime.evaluate',
                params: { expression: 'Boolean(document.getElementById("antigravity-ui-style"))' }
              }));
            }
          }
        } catch (_) {}
      });
    }).on('error', () => {});
  }

  attachToPage(page) {
    try {
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      this.activeSockets.set(page.id, ws);

      ws.onopen = () => {
        console.log('[antigravity-ui] Attached to page target:', page.title);
        // 1. Enable Page domain for lifecycle navigation events
        ws.send(JSON.stringify({ id: 10, method: 'Page.enable' }));

        // 2. Add script on new document to persist across reloads
        const script = this.generateScript(this.config);
        ws.send(JSON.stringify({
          id: 11,
          method: 'Page.addScriptToEvaluateOnNewDocument',
          params: { source: script }
        }));

        // 3. Immediately evaluate in the current live document
        ws.send(JSON.stringify({
          id: 12,
          method: 'Runtime.evaluate',
          params: { expression: script }
        }));
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          // If heartbeat check reports style is missing, re-inject immediately!
          if (data.id === 999 && data.result?.result?.value === false) {
            const script = this.generateScript(this.config);
            ws.send(JSON.stringify({
              id: 13,
              method: 'Runtime.evaluate',
              params: { expression: script }
            }));
          }
          // On frame navigation, re-inject immediately!
          if (data.method === 'Page.frameNavigated') {
            const script = this.generateScript(this.config);
            ws.send(JSON.stringify({
              id: 14,
              method: 'Runtime.evaluate',
              params: { expression: script }
            }));
          }
        } catch (_) {}
      };

      ws.onclose = () => {
        this.activeSockets.delete(page.id);
      };

      ws.onerror = () => {
        this.activeSockets.delete(page.id);
      };
    } catch (_) {}
  }

  updateAll(newConfig) {
    this.config = newConfig;
    const script = this.generateScript(newConfig);

    for (const [id, ws] of this.activeSockets.entries()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          id: Date.now(),
          method: 'Runtime.evaluate',
          params: { expression: script }
        }));
        // Update persistent new document script
        ws.send(JSON.stringify({
          id: Date.now() + 1,
          method: 'Page.addScriptToEvaluateOnNewDocument',
          params: { source: script }
        }));
      }
    }
  }

  start() {
    this.syncWithTargets();
    // Run continuous heartbeat & discovery loop every 2.5 seconds
    this.heartbeatTimer = setInterval(() => {
      this.syncWithTargets();
    }, 2500);
  }
}

const cdpBridge = new ResilientCdpBridge();
cdpBridge.start();

// ---------------------------------------------------------------------------
// Sidecar Application Routes
// ---------------------------------------------------------------------------
const app = new SidecarApp();

const readLocal = (filename) => readFileSync(join(HERE, filename), 'utf8');

app.page('/', () => readLocal('index.html'));
app.page('/app.js', () => readLocal('app.js'));
app.api('/styles.css', () => new Response(readLocal('styles.css'), { contentType: 'text/css' }), 'GET');

app.api('/api/status', () => {
  return {
    version: '3.0.0-hybrid',
    nodeVersion: process.version,
    cdpConnected: cdpBridge.activeSockets.size > 0,
    cdpPort: cdpBridge.currentPort,
    asarPatched: existsSync(ASAR_PATH + '.meta.json'),
    configExists: existsSync(CONFIG_PATH),
  };
}, 'GET');

app.api('/api/config', () => {
  return loadConfig();
}, 'GET');

app.api('/api/config', (data) => {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    writeFileSync(CONFIG_PATH, jsonStr, 'utf8');
    try { writeFileSync(LEGACY_CONFIG_PATH, jsonStr, 'utf8'); } catch (_) {}
    
    // Live update all open pages immediately
    cdpBridge.updateAll(data);
    return { success: true, config: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

function loadConfig() {
  const targetPath = existsSync(CONFIG_PATH) ? CONFIG_PATH : (existsSync(LEGACY_CONFIG_PATH) ? LEGACY_CONFIG_PATH : null);
  if (!targetPath) {
    return {
      isRTL: true,
      forceRTL: false,
      lh: '1.6',
      fs: '16',
      sidebarWidth: 256,
      compactSidebar: true,
      userMsgEnabled: true,
      userMsgDark: { bg: '#1e2433', text: '#f1f5f9', border: '#384c6e', borderWidth: '1.5', shadow: 'soft' },
      userMsgLight: { bg: '#f0f4ff', text: '#0f172a', border: '#cbd5e1', borderWidth: '1.5', shadow: 'soft' },
    };
  }
  try {
    return JSON.parse(readFileSync(targetPath, 'utf8'));
  } catch (_) {
    return {};
  }
}

app.run();
