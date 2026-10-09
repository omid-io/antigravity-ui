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
  console.error('[antigravity-ui] Failed to load font:', e.message);
}

// ---------------------------------------------------------------------------
// CDP Bridge Implementation
// ---------------------------------------------------------------------------
class CdpBridge {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.currentPort = null;
    this.reconnectTimer = null;
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

  async connectAndInject(config) {
    const port = this.getDevToolsPort();
    if (!port) {
      this.scheduleReconnect(config);
      return false;
    }
    this.currentPort = port;

    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            const targets = JSON.parse(raw);
            const page = targets.find(t => t.type === 'page');
            if (!page || !page.webSocketDebuggerUrl) {
              this.scheduleReconnect(config);
              return resolve(false);
            }

            if (this.ws) {
              try { this.ws.close(); } catch (_) {}
            }

            const ws = new WebSocket(page.webSocketDebuggerUrl);
            this.ws = ws;

            ws.onopen = () => {
              this.isConnected = true;
              console.log('[antigravity-ui] CDP Bridge connected to main window on port', port);
              this.sendInjectionScript(config);
              resolve(true);
            };

            ws.onmessage = (msg) => {
              // Message from CDP
            };

            ws.onclose = () => {
              this.isConnected = false;
              this.scheduleReconnect(config);
            };

            ws.onerror = () => {
              this.isConnected = false;
              this.scheduleReconnect(config);
              resolve(false);
            };
          } catch (e) {
            this.scheduleReconnect(config);
            resolve(false);
          }
        });
      }).on('error', () => {
        this.scheduleReconnect(config);
        resolve(false);
      });
    });
  }

  scheduleReconnect(config) {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connectAndInject(config);
    }, 3000);
  }

  generateInjectionScript(cfg) {
    return `
(() => {
  const fontBase64 = '${fontBase64}';
  let rtlConfig = ${JSON.stringify(cfg)};

  let uiStyle = document.getElementById('antigravity-ui-style');
  if (!uiStyle) {
    uiStyle = document.createElement('style');
    uiStyle.id = 'antigravity-ui-style';
    document.head.appendChild(uiStyle);
  }

  let rtlStyle = document.getElementById('antigravity-rtl-style');
  if (!rtlStyle) {
    rtlStyle = document.createElement('style');
    rtlStyle.id = 'antigravity-rtl-style';
    document.head.appendChild(rtlStyle);
  }

  function getShadowCSS(type, borderCol, mode) {
    if (type === 'none') return 'none';
    if (type === '3d') {
      return mode === 'dark'
        ? '0 6px 0 -1px rgba(10, 15, 26, 0.95), 0 10px 22px -3px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
        : '0 6px 0 -1px rgba(180, 195, 215, 0.85), 0 10px 20px -3px rgba(50, 70, 100, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
    }
    if (type === 'glow') {
      return '0 0 16px 2px ' + (borderCol || '#384c6e') + '66, 0 4px 12px rgba(0, 0, 0, 0.35)';
    }
    return mode === 'dark'
      ? '0 4px 16px -2px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.3)'
      : '0 4px 14px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)';
  }

  function applyDynamicCSS(c) {
    const isRTL = c.isRTL !== false;
    const forceRTL = Boolean(c.forceRTL);
    const lh = c.lh || '1.6';
    const fs = c.fs || '16';
    const userMsgEnabled = c.userMsgEnabled !== false;
    const userMsgDark = c.userMsgDark || { bg: '#1e2433', text: '#f1f5f9', border: '#384c6e', borderWidth: '1.5', shadow: 'soft' };
    const userMsgLight = c.userMsgLight || { bg: '#f0f4ff', text: '#0f172a', border: '#cbd5e1', borderWidth: '1.5', shadow: 'soft' };

    let faFontRule = '';
    let faFontName = "'PersianOnlyFont'";
    if (c.faFont) {
      faFontName = "'UserPersianFont', 'PersianOnlyFont'";
      let baseFaFont = c.faFont.replace(/[-\\s]?Regular$/i, '');
      faFontRule = \`
        @font-face {
          font-family: 'UserPersianFont';
          src: local('\${c.faFont}'), local('\${baseFaFont}');
          font-weight: 400;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
        @font-face {
          font-family: 'UserPersianFont';
          src: local('\${baseFaFont} Bold'), local('\${baseFaFont}-Bold'), local('\${baseFaFont}Bold');
          font-weight: 700;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
      \`;
    }

    let enFontStr = c.enFont ? \`'\${c.enFont}', ui-sans-serif, system-ui, sans-serif\` : 'ui-sans-serif, system-ui, sans-serif';
    let codeFontStr = c.codeFont ? \`'\${c.codeFont}', ui-monospace, monospace\` : 'ui-monospace, monospace';

    let forceRtlStyle = forceRTL ? \`
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
    \` : '';

    let msgBoxCSS = userMsgEnabled ? \`
      :root, body, body.light, body.theme-light {
        --user-msg-bg: \${userMsgLight.bg};
        --user-msg-text: \${userMsgLight.text};
        --user-msg-border-color: \${userMsgLight.border};
        --user-msg-border-width: \${userMsgLight.borderWidth}px;
        --user-msg-shadow: \${getShadowCSS(userMsgLight.shadow, userMsgLight.border, 'light')};
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --user-msg-bg: \${userMsgDark.bg};
        --user-msg-text: \${userMsgDark.text};
        --user-msg-border-color: \${userMsgDark.border};
        --user-msg-border-width: \${userMsgDark.borderWidth}px;
        --user-msg-shadow: \${getShadowCSS(userMsgDark.shadow, userMsgDark.border, 'dark')};
      }
      [data-testid="user-input-step"] {
        position: relative !important;
        z-index: 10 !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div {
        background-color: var(--user-msg-bg) !important;
        border: var(--user-msg-border-width) solid var(--user-msg-border-color) !important;
        box-shadow: var(--user-msg-shadow) !important;
        color: var(--user-msg-text) !important;
        border-radius: 0.75rem !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] .whitespace-pre-wrap,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] p,
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] span:not(.text-muted-foreground) {
        color: var(--user-msg-text) !important;
      }
    \` : '';

    uiStyle.textContent = \`
      div:has(> div > [role="navigation"][aria-label="Sidebar"]),
      div:has(> [role="navigation"][aria-label="Sidebar"]) {
        min-width: 0 !important;
      }
      \${msgBoxCSS}
    \`;

    if (isRTL) {
      rtlStyle.textContent = \`
        \${faFontRule}
        @font-face {
          font-family: 'PersianOnlyFont';
          src: url('data:font/woff2;base64,\${fontBase64}') format('woff2');
          font-weight: 100 900;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
        :root, :host, html, body {
          font-family: \${faFontName}, \${enFontStr}, sans-serif !important;
        }
        .prose, .prose p, .prose li, [data-testid="chat-message"], [data-testid="chat-message"] p,
        .markdown-body, .markdown-body p, .leading-relaxed, .leading-relaxed p,
        [data-testid="user-input-step"], [contenteditable="true"], [data-lexical-text="true"] {
          font-size: \${fs}px !important;
        }
        p, h1, h2, h3, h4, h5, h6, ul, ol, .prose > *, [data-testid="chat-message"] > * {
          unicode-bidi: plaintext;
          text-align: start;
        }
        \${forceRtlStyle}
        ul:not(#_)[dir="rtl"], ol:not(#_)[dir="rtl"], [dir="rtl"] ul:not(#_), [dir="rtl"] ol:not(#_) {
          padding-left: 0 !important;
          padding-right: 1.25rem !important;
        }
        pre, code, pre *, code * {
          unicode-bidi: isolate !important;
          direction: ltr !important;
          text-align: left !important;
          font-family: \${codeFontStr} !important;
        }
        .leading-relaxed, .prose p, .prose li, [data-testid="chat-message"] p,
        [data-testid="user-input-step"], [contenteditable="true"] {
          line-height: \${lh} !important;
        }
      \`;
    } else {
      rtlStyle.textContent = '';
    }
  }

  function initSidebarResizer() {
    const resizer = document.querySelector('.cursor-col-resize');
    if (!resizer || resizer.dataset.rtlResizerInit) return;
    resizer.dataset.rtlResizerInit = 'true';

    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    const parent = sidebar ? sidebar.parentElement : null;
    const grandParent = parent ? parent.parentElement : null;

    if (grandParent) {
      const storedW = parseInt(localStorage.getItem('sidebarWidth') || rtlConfig.sidebarWidth, 10);
      if (storedW && storedW >= 160 && storedW < 256) {
        grandParent.style.setProperty('width', storedW + 'px', 'important');
        if (parent) parent.style.setProperty('width', storedW + 'px', 'important');
      }
    }

    let isDragging = false;
    let startX = 0;
    let startW = 0;

    function onPointerMove(ev) {
      if (!isDragging || !grandParent) return;
      const delta = ev.clientX - startX;
      let newW = Math.round(startW + delta);
      const maxLimit = Math.min(420, Math.floor(window.innerWidth * 0.45));
      if (newW < 160) newW = 160;
      if (newW > maxLimit) newW = maxLimit;

      grandParent.style.setProperty('width', newW + 'px', 'important');
      if (parent) parent.style.setProperty('width', newW + 'px', 'important');
    }

    function onPointerEnd() {
      if (!isDragging) return;
      isDragging = false;
      window.removeEventListener('pointermove', onPointerMove, true);
      window.removeEventListener('pointerup', onPointerEnd, true);
      if (grandParent) {
        localStorage.setItem('sidebarWidth', grandParent.offsetWidth);
      }
    }

    function onPointerStart(e) {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      isDragging = true;
      startX = e.clientX;
      startW = grandParent ? grandParent.offsetWidth : 256;
      window.addEventListener('pointermove', onPointerMove, true);
      window.addEventListener('pointerup', onPointerEnd, true);
    }

    resizer.addEventListener('pointerdown', onPointerStart, { capture: true });
    resizer.addEventListener('mousedown', onPointerStart, { capture: true });
  }

  // Shift+2 @ Fix
  if (rtlConfig.fixAtSign !== false && !window.__ANTIGRAVITY_AT_FIX__) {
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

  window.__ANTIGRAVITY_UI_UPDATE__ = (newCfg) => {
    rtlConfig = newCfg;
    applyDynamicCSS(newCfg);
  };

  applyDynamicCSS(rtlConfig);
  initSidebarResizer();
  setInterval(initSidebarResizer, 2000);

  return 'Antigravity UI CDP Injection Active!';
})()
    `;
  }

  sendInjectionScript(config) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const script = this.generateInjectionScript(config);
    this.ws.send(JSON.stringify({
      id: Date.now(),
      method: 'Runtime.evaluate',
      params: { expression: script }
    }));
  }

  updateLive(config) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return this.connectAndInject(config);
    }
    const updateExpr = `if (typeof window.__ANTIGRAVITY_UI_UPDATE__ === 'function') { window.__ANTIGRAVITY_UI_UPDATE__(${JSON.stringify(config)}); } else { ${this.generateInjectionScript(config)} }`;
    this.ws.send(JSON.stringify({
      id: Date.now(),
      method: 'Runtime.evaluate',
      params: { expression: updateExpr }
    }));
  }
}

const cdpBridge = new CdpBridge();

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
    cdpConnected: cdpBridge.isConnected,
    cdpPort: cdpBridge.getDevToolsPort(),
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
    
    // Trigger instant live update to main window via CDP!
    cdpBridge.updateLive(data);
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

// Start initial CDP Bridge connection
const initialConfig = loadConfig();
cdpBridge.connectAndInject(initialConfig);

app.run();
