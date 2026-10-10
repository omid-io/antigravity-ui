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

  getShadowCSS(type, borderCol, mode) {
    if (type === 'none') return 'none';
    if (mode === 'light') {
      switch (type) {
        case 'soft':
          return '0 4px 14px -1px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.08)';
        case '3d':
        case 'medium':
          return '0 5px 0 0 rgba(0, 0, 0, 0.18), 0 12px 24px -2px rgba(15, 23, 42, 0.22)';
        case 'glow':
          return `0 0 0 1.5px ${borderCol}, 0 6px 22px 3px ${borderCol}66, 0 2px 6px ${borderCol}40`;
        default:
          return 'none';
      }
    } else {
      switch (type) {
        case 'soft':
          return '0 6px 18px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)';
        case '3d':
        case 'medium':
          return '0 5px 0 0 rgba(0, 0, 0, 0.8), 0 14px 28px -3px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
        case 'glow':
          return `0 0 0 1.5px ${borderCol}, 0 0 25px 4px ${borderCol}88, 0 0 50px 10px ${borderCol}44`;
        default:
          return 'none';
      }
    }
  }

  generateScript(c) {
    const isRTL = c.isRTL !== false;
    const forceRTL = Boolean(c.forceRTL);
    const lh = c.lh || '1.6';
    const fs = c.fs || '16';
    const faFont = c.faFont ? c.faFont.trim() : '';
    const enFont = c.enFont ? c.enFont.trim() : '';
    const codeFont = c.codeFont ? c.codeFont.trim() : '';
    const userMsgEnabled = c.userMsgEnabled !== false;
    const inputBoxEnabled = Boolean(c.inputBoxEnabled);

    const userMsgDark = {
      bg: '#1e2433',
      text: '#f1f5f9',
      border: '#384c6e',
      borderWidth: '1.5',
      shadow: 'soft',
      ...(c.userMsgDark || {})
    };

    const userMsgLight = {
      bg: '#f0f4ff',
      text: '#0f172a',
      border: '#cbd5e1',
      borderWidth: '1.5',
      shadow: 'soft',
      ...(c.userMsgLight || {})
    };

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
        @font-face {
          font-family: '${faFont}';
          src: local('${baseFa} Bold'), local('${baseFa}-Bold'), local('${baseFa}Bold');
          font-weight: 700;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
      `;
    }

    const enFontStr = enFont ? `'${enFont}', ui-sans-serif, system-ui, sans-serif` : 'ui-sans-serif, system-ui, sans-serif';
    const codeFontStr = codeFont ? `'${codeFont}', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` : 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

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

    const darkShadow = this.getShadowCSS(userMsgDark.shadow, userMsgDark.border, 'dark');
    const lightShadow = this.getShadowCSS(userMsgLight.shadow, userMsgLight.border, 'light');

    const userMsgCSS = userMsgEnabled ? `
      :root, body, body.light, body.theme-light {
        --user-msg-bg: ${userMsgLight.bg};
        --user-msg-text: ${userMsgLight.text};
        --user-msg-border-color: ${userMsgLight.border};
        --user-msg-border-width: ${userMsgLight.borderWidth}px;
        --user-msg-shadow: ${lightShadow};
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --user-msg-bg: ${userMsgDark.bg};
        --user-msg-text: ${userMsgDark.text};
        --user-msg-border-color: ${userMsgDark.border};
        --user-msg-border-width: ${userMsgDark.borderWidth}px;
        --user-msg-shadow: ${darkShadow};
      }
      [data-testid="user-input-step"] {
        position: relative !important;
        z-index: 10 !important;
        padding-bottom: 8px !important;
        margin-bottom: 4px !important;
      }
      div.sticky:has([data-testid="user-input-step"]) {
        overflow: visible !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] {
        background: transparent !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0.75rem !important;
        transition: all 0.2s ease !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div {
        background-color: var(--user-msg-bg) !important;
        border: var(--user-msg-border-width) solid var(--user-msg-border-color) !important;
        box-shadow: var(--user-msg-shadow) !important;
        color: var(--user-msg-text) !important;
        border-radius: 0.75rem !important;
        position: relative !important;
        z-index: 2 !important;
        transition: all 0.2s ease !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"]:hover > div {
        filter: brightness(1.04);
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] .whitespace-pre-wrap,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] p,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] span:not(.text-muted-foreground) {
        color: var(--user-msg-text) !important;
      }

      /* Harmonized Action Toolbar */
      [data-testid="user-input-step"] .user-input-buttons-container {
        background-color: var(--user-msg-bg) !important;
        border: 1px solid var(--user-msg-border-color) !important;
        box-shadow: 0 0 16px 6px var(--user-msg-bg) !important;
      }
      [data-testid="user-input-step"] .user-input-buttons-container button {
        color: var(--user-msg-text) !important;
        opacity: 0.75 !important;
        transition: all 0.15s ease !important;
        border-radius: 9999px !important;
      }
      [data-testid="user-input-step"] .user-input-buttons-container button:hover {
        opacity: 1 !important;
        background-color: rgba(255, 255, 255, 0.15) !important;
      }
    ` : '';

    const inputBoxCSS = inputBoxEnabled ? `
      :root, body, body.light, body.theme-light {
        --input-box-border-color: ${userMsgLight.border};
        --input-box-border-width: ${userMsgLight.borderWidth}px;
        --input-box-shadow: ${lightShadow};
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --input-box-border-color: ${userMsgDark.border};
        --input-box-border-width: ${userMsgDark.borderWidth}px;
        --input-box-shadow: ${darkShadow};
      }
      [id="antigravity.agentSidePanelInputBox"], [id*="agentSidePanelInputBox"] {
        border: var(--input-box-border-width) solid var(--input-box-border-color) !important;
        box-shadow: var(--input-box-shadow) !important;
        transition: border 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease !important;
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

      /* Sidebar Navigation & Chat Titles: Left-Aligned LTR Mandate (Opposite of Chat) */
      [role="navigation"][aria-label="Sidebar"],
      [role="navigation"][aria-label="Sidebar"] *,
      nav.bg-sidebar,
      nav.bg-sidebar * {
        direction: ltr !important;
        text-align: left !important;
      }
      [role="navigation"][aria-label="Sidebar"] .truncate,
      nav.bg-sidebar .truncate {
        direction: ltr !important;
        text-align: left !important;
        unicode-bidi: plaintext !important;
      }

      /* Typography & Fonts */
      :root, :host, html, body {
        font-family: ${faFontName}, ${enFontStr} !important;
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
        font-family: ${codeFontStr} !important;
      }

      ${userMsgCSS}
      ${inputBoxCSS}
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
        ws.send(JSON.stringify({ id: 10, method: 'Page.enable' }));

        const script = this.generateScript(this.config);
        ws.send(JSON.stringify({
          id: 11,
          method: 'Page.addScriptToEvaluateOnNewDocument',
          params: { source: script }
        }));

        ws.send(JSON.stringify({
          id: 12,
          method: 'Runtime.evaluate',
          params: { expression: script }
        }));
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.id === 999 && data.result?.result?.value === false) {
            const script = this.generateScript(this.config);
            ws.send(JSON.stringify({
              id: 13,
              method: 'Runtime.evaluate',
              params: { expression: script }
            }));
          }
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

    // If no sockets currently open, trigger discovery immediately
    if (this.activeSockets.size === 0) {
      this.syncWithTargets();
    }

    for (const [id, ws] of this.activeSockets.entries()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          id: Date.now(),
          method: 'Runtime.evaluate',
          params: { expression: script }
        }));
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
    this.heartbeatTimer = setInterval(() => {
      this.syncWithTargets();
    }, 2000);
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
app.api('/font.woff2', () => new Response(readFileSync(join(HERE, 'Vazirmatn-Variable.woff2')), { contentType: 'font/woff2' }), 'GET');

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
      faFont: '',
      enFont: '',
      codeFont: '',
      fixAtSign: true,
      sidebarWidth: 256,
      compactSidebar: true,
      userMsgEnabled: true,
      inputBoxEnabled: false,
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
