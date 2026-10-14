import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { SidecarApp, Response } from 'sidecar_sdk';
import { generatePopupBundle } from './popup-engine.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(homedir(), '.antigravity-ui.json');
const LEGACY_CONFIG_PATH = join(homedir(), '.antigravity-rtl.json');
const DEVTOOLS_PORT_PATH = join(homedir(), 'AppData', 'Roaming', 'Antigravity', 'DevToolsActivePort');
const ASAR_PATH = join(homedir(), 'AppData', 'Local', 'Programs', 'antigravity', 'resources', 'app.asar');
const FONT_PATH = join(HERE, 'Vazirmatn-Variable.woff2');

let fontBase64 = '';
const candidateFonts = [
  join(HERE, 'Vazirmatn-Variable.woff2'),
  'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/Vazirmatn-Variable.woff2',
  'E:/programming/antigravity-ui/bin/Vazirmatn-Variable.woff2'
];
for (const f of candidateFonts) {
  try {
    if (existsSync(f)) {
      fontBase64 = readFileSync(f).toString('base64');
      if (fontBase64) break;
    }
  } catch (_) {}
}

function getDevToolsPort() {
  if (!existsSync(DEVTOOLS_PORT_PATH)) return null;
  try {
    const content = readFileSync(DEVTOOLS_PORT_PATH, 'utf8').trim().split('\n');
    return content[0]?.trim() || null;
  } catch (_) {
    return null;
  }
}

function getShadowCSS(type, borderCol, mode) {
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

function generateScript(c) {
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
    [data-testid="user-input-step"] > *:not(pre):not(code),
    [data-testid="ask-question-header-text"],
    [data-testid="ask-question-header-text"] *,
    [data-testid="ask-question-option"],
    [data-testid="ask-question-option"] *,
    [data-testid="ask-question-option-hover-card"],
    label[htmlFor*="__write_in__"],
    label[htmlFor*="__write_in__"] * {
      direction: rtl !important;
      text-align: right !important;
      unicode-bidi: isolate !important;
    }
  ` : '';

  const darkShadow = getShadowCSS(userMsgDark.shadow, userMsgDark.border, 'dark');
  const lightShadow = getShadowCSS(userMsgLight.shadow, userMsgLight.border, 'light');

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

      /* Multi-Choice Questions (ask_question) BiDi & RTL Support */
      [data-testid="ask-question-header-text"],
      [data-testid="ask-question-header-text"] p,
      [data-testid="ask-question-header-text"] span,
      [data-testid="ask-question-option"] > span,
      [data-testid="ask-question-option-hover-card"],
      [data-testid="ask-question-writein"],
      label[htmlFor*="__write_in__"] span {
        unicode-bidi: plaintext !important;
        text-align: start;
      }

      [data-testid="ask-question-option"][dir="rtl"],
      [data-testid="ask-question-option"]:dir(rtl),
      [dir="rtl"] [data-testid="ask-question-option"] {
        direction: rtl !important;
        text-align: right !important;
      }

      [data-testid="ask-question-option"][dir="rtl"] > span,
      [data-testid="ask-question-option"]:dir(rtl) > span,
      [dir="rtl"] [data-testid="ask-question-option"] > span {
        text-align: right !important;
        unicode-bidi: isolate !important;
      }

      [data-testid="ask-question-header-text"][dir="rtl"],
      [data-testid="ask-question-header-text"]:dir(rtl),
      [dir="rtl"] [data-testid="ask-question-header-text"] {
        direction: rtl !important;
        text-align: right !important;
      }

      label[htmlFor*="__write_in__"][dir="rtl"],
      label[htmlFor*="__write_in__"]:dir(rtl),
      [dir="rtl"] label[htmlFor*="__write_in__"] {
        direction: rtl !important;
        text-align: right !important;
      }

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

      /* Pure CSS Compact Sidebar Architecture - 100% Native Resilience */
      ${c.compactSidebar !== false ? `
        :root {
          --compact-sidebar-width: ${(parseInt(c.sidebarWidth, 10) >= 160 && parseInt(c.sidebarWidth, 10) < 256) ? parseInt(c.sidebarWidth, 10) : 200}px;
        }
        .h-screen:has([aria-label="Toggle Sidebar"][aria-expanded="true"]) {
          --sidebar-width: var(--compact-sidebar-width, 200px) !important;
        }
        .h-screen:has([aria-label="Toggle Sidebar"][aria-expanded="true"]) div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) {
          width: var(--compact-sidebar-width, 200px) !important;
        }
        div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) > div {
          width: 100% !important;
        }
      ` : ''}

      ${userMsgCSS}
      ${inputBoxCSS}
    \`;

    /* Pure CSS Compact Sidebar Initialization */
    if (window.__ANTIGRAVITY_SIDEBAR_OBSERVER__) {
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__.disconnect();
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__ = null;
    }
    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    const parent = sidebar ? sidebar.parentElement : null;
    const grandParent = parent ? parent.parentElement : null;
    const root = document.querySelector('.h-screen.w-screen') || document.body;
    if (grandParent) grandParent.style.removeProperty('width');
    if (parent) parent.style.removeProperty('width');
    if (root) root.style.removeProperty('--sidebar-width');

    if (${c.compactSidebar === false}) {
      localStorage.removeItem('sidebarWidth');
      document.documentElement.style.removeProperty('--compact-sidebar-width');
    } else {
      const storedW = parseInt(localStorage.getItem('sidebarWidth'), 10);
      const targetW = (storedW && storedW >= 160 && storedW < 256) ? storedW : 200;
      document.documentElement.style.setProperty('--compact-sidebar-width', targetW + 'px');
    }

    const resizer = document.querySelector('.cursor-col-resize');
    if (resizer && !resizer.dataset.pureCssResizer) {
      resizer.dataset.pureCssResizer = 'true';

      let isDragging = false;
      let startX = 0;
      let startW = 0;

      function onMove(ev) {
        if (!isDragging) return;
        const delta = ev.clientX - startX;
        let newW = Math.round(startW + delta);
        if (newW < 160) newW = 160;
        if (newW > 450) newW = 450;
        document.documentElement.style.setProperty('--compact-sidebar-width', newW + 'px');
      }

      function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        window.removeEventListener('pointermove', onMove, true);
        window.removeEventListener('pointerup', onEnd, true);
        window.removeEventListener('mouseup', onEnd, true);
        const curW = parseInt(document.documentElement.style.getPropertyValue('--compact-sidebar-width'), 10);
        if (curW && curW >= 160 && curW <= 450) {
          localStorage.setItem('sidebarWidth', curW);
        }
      }

      resizer.addEventListener('pointerdown', (e) => {
        const cfg = window.__ANTIGRAVITY_CONFIG__ || {};
        if (cfg.compactSidebar === false) return;
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isDragging = true;
        startX = e.clientX;
        const curW = parseInt(document.documentElement.style.getPropertyValue('--compact-sidebar-width'), 10);
        const gp = document.querySelector('[role="navigation"][aria-label="Sidebar"]')?.parentElement?.parentElement;
        startW = curW || (gp ? gp.offsetWidth : 200);
        window.addEventListener('pointermove', onMove, true);
        window.addEventListener('pointerup', onEnd, true);
        window.addEventListener('mouseup', onEnd, true);
      }, { capture: true });
    }

    /* Auto-Detect Persian in Multi-Choice Questions */
    function scanQuestionsRTL() {
      const hasPersian = (txt) => /[\u0600-\u06FF]/.test(txt || '');
      document.querySelectorAll('[data-testid="ask-question-header-text"]').forEach(hdr => {
        if (hasPersian(hdr.textContent) && hdr.getAttribute('dir') !== 'rtl') hdr.setAttribute('dir', 'rtl');
      });
      document.querySelectorAll('[data-testid="ask-question-option"]').forEach(opt => {
        if (hasPersian(opt.textContent) && opt.getAttribute('dir') !== 'rtl') opt.setAttribute('dir', 'rtl');
      });
      document.querySelectorAll('label[htmlFor*="__write_in__"]').forEach(lbl => {
        if (hasPersian(lbl.textContent) && lbl.getAttribute('dir') !== 'rtl') lbl.setAttribute('dir', 'rtl');
      });
    }

    scanQuestionsRTL();
    if (!window.__ANTIGRAVITY_QUESTIONS_OBSERVER__) {
      window.__ANTIGRAVITY_QUESTIONS_OBSERVER__ = new MutationObserver(() => scanQuestionsRTL());
      window.__ANTIGRAVITY_QUESTIONS_OBSERVER__.observe(document.body, { childList: true, subtree: true });
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

// ---------------------------------------------------------------------------
// Direct Instant Injector Engine (No persistent socket stall, 100% Reliable)
// ---------------------------------------------------------------------------
let currentActiveConfig = loadConfig();

function injectToLiveWindows(config, force = false) {
  currentActiveConfig = config;
  const port = getDevToolsPort();
  if (!port) {
    console.error('[antigravity-ui] No DevTools port found');
    return;
  }

  const script = generateScript(config);
  const myPort = process.env.ANTIGRAVITY_SIDECAR_WEB_PORT || 0;
  const myToken = process.env.ANTIGRAVITY_SIDECAR_UI_TOKEN || '';
  const popupScript = generatePopupBundle(config, fontBase64, myPort, myToken);

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const targets = JSON.parse(raw);
        const pages = targets.filter(t => t.type === 'page');

        for (const page of pages) {
          if (!page.webSocketDebuggerUrl) continue;
          try {
            const ws = new WebSocket(page.webSocketDebuggerUrl);
            ws.onopen = () => {
              // 1. Check health of live page before doing any DOM manipulation
              ws.send(JSON.stringify({
                id: 100,
                method: 'Runtime.evaluate',
                params: {
                  expression: '({ hasStyle: Boolean(document.getElementById("antigravity-ui-style")), hasBtn: Boolean(document.getElementById("antigravity-ui-sidebar-btn")), hasPopup: Boolean(document.getElementById("antigravity-ui-popup")), popupVersion: window.__ANTIGRAVITY_POPUP_VERSION__ || 0, config: window.__ANTIGRAVITY_CONFIG__ || null })',
                  returnByValue: true
                }
              }));
            };
            ws.onmessage = (event) => {
              try {
                const msg = JSON.parse(event.data);
                if (msg.id === 100) {
                  const val = msg.result?.result?.value || {};
                  // Sync config changes to disk
                  if (val.config && JSON.stringify(val.config) !== JSON.stringify(currentActiveConfig)) {
                    currentActiveConfig = val.config;
                    try {
                      const jsonPretty = JSON.stringify(val.config, null, 2);
                      writeFileSync(CONFIG_PATH, jsonPretty, 'utf8');
                      try { writeFileSync(LEGACY_CONFIG_PATH, jsonPretty, 'utf8'); } catch (_) {}
                    } catch (_) {}
                  }

                  // ONLY touch DOM/evaluate if missing or outdated version or forced
                  if (force || !val.hasStyle || !val.hasBtn || !val.hasPopup || val.popupVersion < 16) {
                    ws.send(JSON.stringify({
                      id: 101,
                      method: 'Runtime.evaluate',
                      params: { expression: script, returnByValue: true }
                    }));
                    ws.send(JSON.stringify({
                      id: 102,
                      method: 'Page.addScriptToEvaluateOnNewDocument',
                      params: { source: script }
                    }));
                    ws.send(JSON.stringify({
                      id: 103,
                      method: 'Runtime.evaluate',
                      params: { expression: popupScript, returnByValue: true }
                    }));
                    ws.send(JSON.stringify({
                      id: 104,
                      method: 'Page.addScriptToEvaluateOnNewDocument',
                      params: { source: popupScript }
                    }));
                  } else {
                    setTimeout(() => { try { ws.close(); } catch (_) {} }, 50);
                  }
                }
                if (msg.id === 103) {
                  setTimeout(() => { try { ws.close(); } catch (_) {} }, 100);
                }
              } catch (_) {}
            };
            ws.onerror = () => {};
          } catch (_) {}
        }
      } catch (_) {}
    });
  }).on('error', () => {});
}

// Continuous background health check (every 3s, zero reflow, zero DOM touch unless missing)
setInterval(() => {
  injectToLiveWindows(currentActiveConfig, false);
}, 3000);

// Initial forced injection
injectToLiveWindows(currentActiveConfig, true);

// ---------------------------------------------------------------------------
// Sidecar Application Routes
// ---------------------------------------------------------------------------
const app = new SidecarApp();

const readLocal = (filename) => readFileSync(join(HERE, filename), 'utf8');

app.page('/', () => readLocal('index.html'));
app.page('/app.js', () => readLocal('app.js'));
app.api('/styles.css', () => new Response(readLocal('styles.css'), { contentType: 'text/css' }), 'GET');
app.api('/font.woff2', () => new Response(readFileSync(join(HERE, 'Vazirmatn-Variable.woff2')), { contentType: 'font/woff2' }), 'GET');
app.api('/logo.svg', () => new Response(readFileSync(join(HERE, 'logo.svg')), { contentType: 'image/svg+xml' }), 'GET');
app.api('/icon.png', () => new Response(readFileSync(join(HERE, 'icon.png')), { contentType: 'image/png' }), 'GET');

app.api('/api/status', () => {
  return {
    version: '3.0.0-hybrid',
    nodeVersion: process.version,
    cdpPort: getDevToolsPort(),
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
    
    // Live update all open pages immediately!
    injectToLiveWindows(data);
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
