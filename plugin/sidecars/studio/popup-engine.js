// Antigravity UI Studio - CDP Sidebar & Popup Injector Engine
// Injects native-looking sidebar button and customizer popup directly into Antigravity Chat Window without any Asar patches!

export function generatePopupBundle(config, fontBase64, sidecarPort, sidecarToken) {
  const cfgJson = JSON.stringify(config);
  return `
(() => {
  const POPUP_ENGINE_VERSION = 22;
  const popupEl = document.getElementById('antigravity-ui-popup');
  if (window.__ANTIGRAVITY_UI_POPUP_LOADED__ === POPUP_ENGINE_VERSION && popupEl) {
    if (typeof window.__ANTIGRAVITY_SYNC_CONFIG__ === 'function') {
      try { window.__ANTIGRAVITY_SYNC_CONFIG__(${cfgJson}); } catch (_) {}
    }
    return;
  }
  window.__ANTIGRAVITY_UI_POPUP_LOADED__ = POPUP_ENGINE_VERSION;
  window.__ANTIGRAVITY_POPUP_VERSION__ = POPUP_ENGINE_VERSION;
  const prevContainer = document.getElementById('antigravity-ui-widget-container');
  if (prevContainer) prevContainer.remove();
  const prevBtn = document.getElementById('antigravity-ui-sidebar-btn');
  if (prevBtn) prevBtn.remove();

  const SIDECAR_PORT = ${sidecarPort || 0};
  const SIDECAR_TOKEN = "${sidecarToken || ''}";
  const FONT_BASE64 = "${fontBase64 || ''}";
  let currentConfig = ${cfgJson};
  try {
    const cached = localStorage.getItem('__antigravity_ui_config__');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === 'object') {
        currentConfig = Object.assign({}, currentConfig, parsed);
      }
    }
  } catch (_) {}

  // 0. Direct in-memory styling engine (0ms latency, zero network dependency)
  function applyConfigDirectly(c) {
    if (!c) return;
    window.__ANTIGRAVITY_CONFIG__ = c;
    try { localStorage.setItem('__antigravity_ui_config__', JSON.stringify(c)); } catch (_) {}

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
      faFontName = "'" + faFont + "', 'Vazirmatn'";
      const baseFa = faFont.replace(/[-\\s]?Regular$/i, '');
      faFontRule = \`
        @font-face {
          font-family: '\${faFont}';
          src: local('\${faFont}'), local('\${baseFa}');
          font-weight: 400;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
        @font-face {
          font-family: '\${faFont}';
          src: local('\${baseFa} Bold'), local('\${baseFa}-Bold'), local('\${baseFa}Bold');
          font-weight: 700;
          unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
        }
      \`;
    }

    const enFontStr = enFont ? "'" + enFont + "', ui-sans-serif, system-ui, sans-serif" : 'ui-sans-serif, system-ui, sans-serif';
    const codeFontStr = codeFont ? "'" + codeFont + "', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" : 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

    const forceRtlCSS = forceRTL ? \`
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
    \` : '';

    function getShadow(type, borderCol, mode) {
      if (type === 'none') return 'none';
      if (mode === 'light') {
        switch (type) {
          case 'soft': return '0 4px 14px -1px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.08)';
          case '3d':
          case 'medium': return '0 4px 0 0 rgba(15, 23, 42, 0.28), 0 10px 22px -2px rgba(15, 23, 42, 0.22)';
          case 'glow': return '0 0 0 1.5px ' + borderCol + ', 0 6px 22px 3px ' + borderCol + '66, 0 2px 6px ' + borderCol + '40';
          default: return 'none';
        }
      } else {
        switch (type) {
          case 'soft': return '0 6px 18px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)';
          case '3d':
          case 'medium': return '0 5px 0 0 rgba(0, 0, 0, 0.8), 0 14px 28px -3px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          case 'glow': return '0 0 0 1.5px ' + borderCol + ', 0 0 25px 4px ' + borderCol + '88, 0 0 50px 10px ' + borderCol + '44';
          default: return 'none';
        }
      }
    }

    const darkShadow = getShadow(userMsgDark.shadow, userMsgDark.border, 'dark');
    const lightShadow = getShadow(userMsgLight.shadow, userMsgLight.border, 'light');

    const userMsgCSS = userMsgEnabled ? \`
      :root, body, body.light, body.theme-light {
        --user-msg-bg: \${userMsgLight.bg};
        --user-msg-text: \${userMsgLight.text};
        --user-msg-border-color: \${userMsgLight.border};
        --user-msg-border-width: \${userMsgLight.borderWidth}px;
        --user-msg-shadow: \${lightShadow};
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --user-msg-bg: \${userMsgDark.bg};
        --user-msg-text: \${userMsgDark.text};
        --user-msg-border-color: \${userMsgDark.border};
        --user-msg-border-width: \${userMsgDark.borderWidth}px;
        --user-msg-shadow: \${darkShadow};
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
    \` : '';

    const inputBoxCSS = inputBoxEnabled ? \`
      :root, body, body.light, body.theme-light {
        --input-box-border-color: \${userMsgLight.border};
        --input-box-border-width: \${userMsgLight.borderWidth}px;
        --input-box-shadow: \${lightShadow};
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        --input-box-border-color: \${userMsgDark.border};
        --input-box-border-width: \${userMsgDark.borderWidth}px;
        --input-box-shadow: \${darkShadow};
      }
      [id="antigravity.agentSidePanelInputBox"], [id*="agentSidePanelInputBox"] {
        border: var(--input-box-border-width) solid var(--input-box-border-color) !important;
        box-shadow: var(--input-box-shadow) !important;
        transition: border 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease !important;
      }
    \` : '';

    let uiStyle = document.getElementById('antigravity-ui-style');
    if (!uiStyle) {
      uiStyle = document.createElement('style');
      uiStyle.id = 'antigravity-ui-style';
      document.head.appendChild(uiStyle);
    }

    uiStyle.textContent = \`
      @font-face {
        font-family: 'Vazirmatn';
        src: url('data:font/woff2;base64,' + FONT_BASE64 + ')') format('woff2');
        font-weight: 100 900;
        font-display: swap;
        unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
      }
      \${faFontRule}

      /* Compact Sidebar Resizer Support */
      div:has(> div > [role="navigation"][aria-label="Sidebar"]),
      div:has(> [role="navigation"][aria-label="Sidebar"]) {
        min-width: 0 !important;
      }

      /* Sidebar Navigation & Chat Titles: Left-Aligned LTR Mandate */
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
        font-family: \${faFontName}, \${enFontStr} !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
      }
      .prose, .prose p, .prose li, [data-testid="chat-message"], [data-testid="chat-message"] p,
      .markdown-body, .markdown-body p, .leading-relaxed, .leading-relaxed p,
      [data-testid="user-input-step"], [contenteditable="true"], [data-lexical-text="true"] {
        font-size: \${fs}px !important;
      }
      .leading-relaxed, .prose p, .prose li, [data-testid="chat-message"] p,
      [data-testid="user-input-step"], [contenteditable="true"] {
        line-height: \${lh} !important;
      }

      /* Plaintext Direction Isolation */
      p, h1, h2, h3, h4, h5, h6, ul, ol, .prose > *, [data-testid="chat-message"] > * {
        unicode-bidi: plaintext;
        text-align: start;
      }
      \${forceRtlCSS}

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
        font-family: \${codeFontStr} !important;
      }

      /* Pure CSS Compact Sidebar Architecture - 100% Native Resilience */
      \${c.compactSidebar !== false ? \`
        :root {
          --compact-sidebar-width: \${(parseInt(localStorage.getItem('sidebarWidth'), 10) >= 160 && parseInt(localStorage.getItem('sidebarWidth'), 10) < 256) ? parseInt(localStorage.getItem('sidebarWidth'), 10) : 200}px;
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
      \` : ''}

      \${userMsgCSS}
      \${inputBoxCSS}
    \`;

    /* Pure CSS Compact Sidebar Synchronization */
    syncSidebarWidth(c);

    /* Instant BiDi Scan for Multiple-Choice Questions */
    scanQuestionsRTL();

    /* Initialize Resizer Drag Support */
    initCompactResizer();
  }

  function triggerReactSidebarResize(targetWidth) {
    try {
      const resizer = document.querySelector('.cursor-col-resize');
      if (!resizer) return;
      const fiberKey = Object.keys(resizer).find(k => k.startsWith('__reactFiber'));
      let f = fiberKey ? resizer[fiberKey] : null;
      while (f) {
        if (f.memoizedProps?.minSidebarSize !== undefined) {
          const fn = f.memoizedProps.onSidebarResize;
          if (typeof fn === 'function') {
            fn(targetWidth);
            return;
          }
        }
        f = f.return;
      }
    } catch (_) {}
  }

  function syncSidebarWidth(c) {
    if (window.__ANTIGRAVITY_SIDEBAR_OBSERVER__) {
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__.disconnect();
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__ = null;
    }
    const sb = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    const p = sb?.parentElement;
    const gp = p?.parentElement;
    const root = document.querySelector('.h-screen.w-screen');

    if (c.compactSidebar === false) {
      localStorage.removeItem('sidebarWidth');
      document.documentElement.style.removeProperty('--compact-sidebar-width');
      if (gp) gp.style.width = '256px';
      if (p) p.style.width = '256px';
      if (root) root.style.setProperty('--sidebar-width', '256px');
      triggerReactSidebarResize(256);
    } else {
      if (gp) gp.style.removeProperty('width');
      if (p) p.style.removeProperty('width');
      if (root) root.style.removeProperty('--sidebar-width');
      const storedW = parseInt(localStorage.getItem('sidebarWidth'), 10);
      const targetW = (storedW && storedW >= 160 && storedW < 256) ? storedW : 200;
      document.documentElement.style.setProperty('--compact-sidebar-width', targetW + 'px');
    }
  }

  function initCompactResizer() {
    const resizer = document.querySelector('.cursor-col-resize');
    if (!resizer || resizer.dataset.pureCssResizer) return;
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
      // If compact sidebar is OFF, do NOT prevent or capture events! Allow React's native onMouseDown to handle resizing completely!
      if (cfg.compactSidebar === false) return;
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX;
      const curW = parseInt(document.documentElement.style.getPropertyValue('--compact-sidebar-width'), 10);
      const gp = document.querySelector('[role="navigation"][aria-label="Sidebar"]')?.parentElement?.parentElement;
      startW = curW || (gp ? gp.offsetWidth : 200);
      window.addEventListener('pointermove', onMove, true);
      window.addEventListener('pointerup', onEnd, true);
      window.addEventListener('mouseup', onEnd, true);
    });
  }

  function scanQuestionsRTL() {
    const hasPersian = (txt) => /[\\u0600-\\u06FF]/.test(txt || '');

    document.querySelectorAll('[data-testid="ask-question-header-text"]').forEach(hdr => {
      if (hasPersian(hdr.textContent)) {
        if (hdr.getAttribute('dir') !== 'rtl') hdr.setAttribute('dir', 'rtl');
      }
    });

    document.querySelectorAll('[data-testid="ask-question-option"]').forEach(opt => {
      if (hasPersian(opt.textContent)) {
        if (opt.getAttribute('dir') !== 'rtl') opt.setAttribute('dir', 'rtl');
      }
    });

    document.querySelectorAll('label[htmlFor*="__write_in__"]').forEach(lbl => {
      if (hasPersian(lbl.textContent)) {
        if (lbl.getAttribute('dir') !== 'rtl') lbl.setAttribute('dir', 'rtl');
      }
    });
  }

  // Set up continuous DOM observer for dynamic question dialogs
  if (!window.__ANTIGRAVITY_QUESTIONS_OBSERVER__) {
    window.__ANTIGRAVITY_QUESTIONS_OBSERVER__ = new MutationObserver(() => {
      scanQuestionsRTL();
    });
    window.__ANTIGRAVITY_QUESTIONS_OBSERVER__.observe(document.body, { childList: true, subtree: true });
  }

  // Initial apply right now!
  applyConfigDirectly(currentConfig);

  // 1. Permanent Widget & Popup Styles (Vibe UI Spec & Anti AI-Slop Crisp Typography)
  let s = document.getElementById('antigravity-popup-styles');
  if (!s) {
    s = document.createElement('style');
    s.id = 'antigravity-popup-styles';
    document.head.appendChild(s);
  }
  s.textContent = \`
      @font-face {
        font-family: 'Vazirmatn';
        src: url('data:font/woff2;base64,' + FONT_BASE64 + ')') format('woff2');
        font-weight: 100 900;
        font-display: swap;
        unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
      }

      /* Light Mode Tokens (Sharp & High Contrast) */
      :root, body, body.light, body.theme-light, body.vscode-light, .rtl-widget-panel.rtl-is-light {
        --rtl-bg: #ffffff;
        --rtl-surface: #f1f5f9;
        --rtl-surface-hover: #e2e8f0;
        --rtl-card-bg: #f8fafc;
        --rtl-card-border: #cbd5e1;
        --rtl-text: #0f172a;
        --rtl-text-secondary: #334155;
        --rtl-text-muted: #64748b;
        --rtl-border: #cbd5e1;
        --rtl-border-subtle: #e2e8f0;
        --rtl-input-bg: #ffffff;
        --rtl-input-border: #94a3b8;
        --rtl-accent: #4f46e5;
        --rtl-accent-hover: #4338ca;
        --rtl-toggle-off: #94a3b8;
        --rtl-shadow-panel: 0 16px 40px -6px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(15, 23, 42, 0.1);
      }

      /* Dark Mode Tokens (Deep, Rich & Crisp) */
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark, .rtl-widget-panel.rtl-is-dark {
        --rtl-bg: #131722;
        --rtl-surface: #1a2030;
        --rtl-surface-hover: #232c42;
        --rtl-card-bg: #171d2b;
        --rtl-card-border: #29354e;
        --rtl-text: #f8fafc;
        --rtl-text-secondary: #cbd5e1;
        --rtl-text-muted: #94a3b8;
        --rtl-border: #29354e;
        --rtl-border-subtle: #1e263a;
        --rtl-input-bg: #10141f;
        --rtl-input-border: #3b4b6d;
        --rtl-accent: #6366f1;
        --rtl-accent-hover: #4f46e5;
        --rtl-toggle-off: #475569;
        --rtl-shadow-panel: 0 24px 50px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08);
      }

      .rtl-widget-container {
        direction: ltr !important;
        position: fixed !important;
        z-index: 999999 !important;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none !important;
        overflow: visible !important;
      }

      /* Pixel-Crisp Popup Panel (Zero Fractional GPU Blur & Natural Height) */
      .rtl-widget-panel {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 400 !important;
        font-synthesis: none !important;
        direction: ltr !important;
        text-align: left !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
        position: fixed !important;
        bottom: 56px !important;
        left: 16px !important;
        right: auto !important;
        width: 330px !important;
        height: 480px !important;
        max-height: calc(100vh - 75px) !important;
        background-color: var(--rtl-bg) !important;
        color: var(--rtl-text) !important;
        border: 1px solid var(--rtl-border) !important;
        box-shadow: var(--rtl-shadow-panel) !important;
        border-radius: 14px !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: opacity 0.16s ease, visibility 0.16s, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        transform: translateY(8px);
        transform-origin: bottom left;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      .rtl-widget-panel.rtl-panel-open {
        transform: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }

      .rtl-tab-view {
        display: none;
        flex-direction: column;
        gap: 10px;
        animation: fadeInTab 0.14s ease-out;
      }

      .rtl-tab-view.active {
        display: flex !important;
      }

      @keyframes fadeInTab {
        from { opacity: 0; transform: translateY(3px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Custom Crisp Scrollbar & Fixed-Frame Body */
      .rtl-panel-body {
        scrollbar-width: thin !important;
        scrollbar-color: rgba(140, 150, 170, 0.45) transparent !important;
        flex: 1 1 0 !important;
        overflow-y: auto !important;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .rtl-panel-body::-webkit-scrollbar { width: 4px; }
      .rtl-panel-body::-webkit-scrollbar-thumb { background: rgba(140, 150, 170, 0.45); border-radius: 9999px; }

      /* Tabs Nav */
      .rtl-main-nav {
        display: flex;
        gap: 4px;
        padding: 3px;
        background-color: var(--rtl-surface);
        border: 1px solid var(--rtl-border);
        border-radius: 9px;
      }
      .rtl-main-nav-btn {
        flex: 1 1 0;
        padding: 5px 3px;
        border: none;
        background: transparent;
        color: var(--rtl-text-secondary);
        font-size: 11px;
        font-weight: 500 !important;
        border-radius: 7px;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
        white-space: nowrap;
      }
      .rtl-main-nav-btn.active {
        background-color: var(--rtl-accent) !important;
        color: #ffffff !important;
        font-weight: 600 !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      /* Cards & Controls */
      .rtl-card {
        background-color: var(--rtl-card-bg);
        border: 1px solid var(--rtl-card-border);
        border-radius: 11px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .rtl-control-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 11.5px;
        font-weight: 400 !important;
        color: var(--rtl-text);
        min-height: 26px;
      }
      .rtl-control-row > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1 1 auto;
        font-weight: 400 !important;
        direction: ltr !important;
        text-align: left !important;
        letter-spacing: -0.1px;
      }

      /* Switch (Sharp & Clean) */
      .rtl-switch {
        position: relative;
        display: inline-block;
        width: 36px;
        height: 20px;
        flex-shrink: 0;
      }
      .rtl-switch input { opacity: 0; width: 0; height: 0; margin: 0; }
      .rtl-slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: var(--rtl-toggle-off);
        transition: .18s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 20px;
      }
      .rtl-slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        transition: .18s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 50%;
      }
      .rtl-switch input:checked + .rtl-slider {
        background-color: var(--rtl-accent) !important;
      }
      .rtl-switch input:checked + .rtl-slider:before {
        transform: translateX(16px);
      }

      /* Inputs */
      .rtl-text-input {
        background-color: var(--rtl-input-bg);
        border: 1px solid var(--rtl-input-border);
        border-radius: 6px;
        padding: 4px 7px;
        font-size: 11px;
        color: var(--rtl-text);
        width: 110px;
        text-align: left;
        direction: ltr;
        outline: none;
      }
      .rtl-range-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 68px;
        height: 4px;
        background: var(--rtl-surface-hover);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
      }
      .rtl-range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--rtl-accent);
        border: 2px solid var(--rtl-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        cursor: pointer;
      }
      .rtl-badge-val {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        font-size: 10.5px;
        font-weight: 600;
        min-width: 34px;
        text-align: center;
        background-color: var(--rtl-surface);
        border: 1px solid var(--rtl-border);
        padding: 2px 4px;
        border-radius: 5px;
        color: var(--rtl-text);
      }
      .rtl-color-input {
        -webkit-appearance: none;
        appearance: none;
        width: 22px;
        height: 22px;
        border: 1px solid var(--rtl-border);
        border-radius: 6px;
        padding: 0;
        cursor: pointer;
        background: transparent;
      }
      .rtl-hex-input {
        width: 68px;
        height: 22px;
        padding: 0 5px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        font-size: 10.5px;
        text-transform: uppercase;
        text-align: center;
        color: var(--rtl-text);
        background-color: var(--rtl-input-bg);
        border: 1px solid var(--rtl-input-border);
        border-radius: 6px;
        outline: none;
      }

      /* Segmented shadow buttons */
      .rtl-shadow-group {
        display: flex;
        gap: 3px;
        background-color: var(--rtl-surface);
        border: 1px solid var(--rtl-border);
        border-radius: 7px;
        padding: 2px;
        width: 100%;
      }
      .rtl-shadow-btn {
        flex: 1 1 0;
        padding: 4px 2px;
        border: none;
        background: transparent;
        color: var(--rtl-text-secondary);
        font-size: 10.5px;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
      }
      .rtl-shadow-btn.active {
        background-color: var(--rtl-accent);
        color: #ffffff;
        font-weight: 600;
      }

      /* Mode switcher */
      .rtl-mode-switcher {
        display: flex;
        background-color: var(--rtl-surface);
        border: 1px solid var(--rtl-border);
        border-radius: 8px;
        padding: 2px;
        gap: 4px;
      }
      .rtl-mode-btn {
        flex: 1 1 0;
        padding: 5px;
        border: none;
        background: transparent;
        color: var(--rtl-text-secondary);
        font-size: 11px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
      }
      .rtl-mode-btn.active {
        background-color: var(--rtl-accent);
        color: #ffffff;
      }

      /* Footer (Enhanced GitHub Star Invite & Clean Badge) */
      .rtl-panel-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 12px;
        border-top: 1px solid var(--rtl-border-subtle);
        background-color: var(--rtl-surface);
        direction: ltr !important;
      }
      .rtl-footer-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--rtl-text);
      }
      .rtl-star-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 9999px;
        background: var(--rtl-card-bg);
        border: 1px solid var(--rtl-border);
        font-size: 11px;
        font-weight: 450;
        color: var(--rtl-text);
        transition: all 0.16s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }
      .rtl-star-badge:hover {
        background: var(--rtl-surface-hover);
        border-color: #f59e0b;
        color: #f59e0b;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.22);
      }
      .rtl-star-icon {
        filter: drop-shadow(0 1px 2px rgba(245, 158, 11, 0.4));
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .rtl-star-badge:hover .rtl-star-icon {
        transform: scale(1.2) rotate(15deg);
      }
      .rtl-gh-icon {
        opacity: 0.75;
        transition: opacity 0.15s ease;
      }
      .rtl-star-badge:hover .rtl-gh-icon {
        opacity: 1;
      }
      .rtl-update-action-btn {
        font-family: inherit !important;
        font-size: 11px;
        font-weight: 500;
        color: var(--rtl-text);
        background: var(--rtl-card-bg);
        padding: 4px 10px;
        border-radius: 7px;
        border: 1px solid var(--rtl-border);
        direction: ltr !important;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        user-select: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      .rtl-update-action-btn:hover {
        background: var(--rtl-surface);
        border-color: var(--rtl-primary, #6366f1);
        color: var(--rtl-primary, #6366f1);
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(99, 102, 241, 0.15);
      }
      .rtl-update-action-btn:active {
        transform: translateY(0);
      }
      .rtl-update-action-btn .rtl-refresh-icon {
        transition: transform 0.4s ease;
      }
      .rtl-update-action-btn:hover .rtl-refresh-icon {
        transform: rotate(90deg);
      }
      .rtl-update-action-btn.rtl-checking .rtl-refresh-icon {
        animation: rtlSpin 1s linear infinite;
      }
      .rtl-update-action-btn.rtl-update-available {
        background: rgba(245, 158, 11, 0.15) !important;
        border-color: rgba(245, 158, 11, 0.7) !important;
        color: #d97706 !important;
        font-weight: 600 !important;
        animation: rtlUpdatePulse 2s infinite ease-in-out;
      }
      .rtl-version-tag {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        font-size: 10px;
        color: var(--rtl-text-muted);
        opacity: 0.85;
      }
      @keyframes rtlSpin {
        100% { transform: rotate(360deg); }
      }
      @keyframes rtlUpdatePulse {
        0% {
          box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6);
          border-color: rgba(245, 158, 11, 0.5);
        }
        50% {
          box-shadow: 0 0 0 5px rgba(245, 158, 11, 0);
          border-color: rgba(245, 158, 11, 1);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6);
          border-color: rgba(245, 158, 11, 0.5);
        }
      }
    \`;

  // 2. Mount Container & Popup DOM
  const existingContainer = document.getElementById('antigravity-ui-widget-container');
  if (existingContainer) existingContainer.remove();

  const container = document.createElement('div');
  container.id = 'antigravity-ui-widget-container';
  container.className = 'rtl-widget-container';
  container.innerHTML = \`
    <div id="antigravity-ui-popup" class="rtl-widget-panel">
      <!-- Pinned Top Header -->
      <div style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px 8px; border-bottom: 1px solid var(--rtl-border-subtle); direction: ltr !important;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--rtl-text);">
            <span style="font-size: 16px; line-height: 1;">🌌</span>
            <span>Antigravity UI Studio</span>
          </div>
          <button id="p-btn-close" type="button" style="background: none; border: none; cursor: pointer; color: var(--rtl-text-muted); font-size: 16px; padding: 2px 6px; line-height: 1;" title="Close">✕</button>
        </div>

        <!-- 3 Tabs Switcher -->
        <div class="rtl-main-nav">
          <button type="button" class="rtl-main-nav-btn active" data-tab="ptab-typo">Typography & RTL</button>
          <button type="button" class="rtl-main-nav-btn" data-tab="ptab-theme">Bubble & Themes</button>
          <button type="button" class="rtl-main-nav-btn" data-tab="ptab-sidebar">Sidebar & Layout</button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="rtl-panel-body">
        <!-- TAB 1: RTL & Typography -->
        <div id="ptab-typo" class="rtl-tab-view active">
          <div class="rtl-card">
            <div class="rtl-control-row">
              <span>Smart RTL Engine</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-isRTL">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <div class="rtl-control-row">
              <span>Force Global RTL</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-forceRTL">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <div class="rtl-control-row">
              <span>Persian Font (FA)</span>
              <input type="text" id="p-faFont" class="rtl-text-input" placeholder="Default: Vazirmatn">
            </div>
            <div class="rtl-control-row">
              <span>English Font (EN)</span>
              <input type="text" id="p-enFont" class="rtl-text-input" placeholder="Default: System UI">
            </div>
            <div class="rtl-control-row">
              <span>Code Font (Mono)</span>
              <input type="text" id="p-codeFont" class="rtl-text-input" placeholder="Default: Monospace">
            </div>
            <div class="rtl-control-row">
              <span>Line Height</span>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="range" id="p-lh" min="1.2" max="2.5" step="0.1" class="rtl-range-slider">
                <span id="p-val-lh" class="rtl-badge-val">1.6</span>
              </div>
            </div>
            <div class="rtl-control-row">
              <span>Font Size</span>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="range" id="p-fs" min="11" max="22" step="1" class="rtl-range-slider">
                <span id="p-val-fs" class="rtl-badge-val">16px</span>
              </div>
            </div>
            <div class="rtl-control-row">
              <span>Fix Shift+2 for @ Symbol</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-fixAtSign">
                <span class="rtl-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- TAB 2: Themes & Bubbles -->
        <div id="ptab-theme" class="rtl-tab-view">
          <div class="rtl-card">
            <div class="rtl-control-row">
              <span>Custom User Bubble Style</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-userMsgEnabled">
                <span class="rtl-slider"></span>
              </label>
            </div>

            <div class="rtl-mode-switcher">
              <button type="button" id="p-btn-dark" class="rtl-mode-btn active">Dark Theme</button>
              <button type="button" id="p-btn-light" class="rtl-mode-btn">Light Theme</button>
            </div>

            <!-- Dark controls -->
            <div id="p-group-dark" style="display: flex; flex-direction: column; gap: 6px;">
              <div class="rtl-control-row">
                <span>Background Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-bg" class="rtl-color-input">
                  <input type="text" id="p-dark-bg-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Text Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-text" class="rtl-color-input">
                  <input type="text" id="p-dark-text-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Border Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-border" class="rtl-color-input">
                  <input type="text" id="p-dark-border-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Border Width</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="range" id="p-dark-bw" min="0" max="4" step="0.5" class="rtl-range-slider">
                  <span id="p-val-dark-bw" class="rtl-badge-val">1.5px</span>
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Bubble Shadow & Depth</span>
                <div class="rtl-shadow-group" id="p-dark-shadow-group">
                  <button type="button" class="rtl-shadow-btn" data-val="none">None</button>
                  <button type="button" class="rtl-shadow-btn active" data-val="soft">Soft</button>
                  <button type="button" class="rtl-shadow-btn" data-val="3d">3D</button>
                  <button type="button" class="rtl-shadow-btn" data-val="glow">Glow</button>
                </div>
              </div>
            </div>

            <!-- Light controls -->
            <div id="p-group-light" style="display: none; flex-direction: column; gap: 6px;">
              <div class="rtl-control-row">
                <span>Background Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-bg" class="rtl-color-input">
                  <input type="text" id="p-light-bg-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Text Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-text" class="rtl-color-input">
                  <input type="text" id="p-light-text-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Border Color</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-border" class="rtl-color-input">
                  <input type="text" id="p-light-border-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Border Width</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="range" id="p-light-bw" min="0" max="4" step="0.5" class="rtl-range-slider">
                  <span id="p-val-light-bw" class="rtl-badge-val">1.5px</span>
                </div>
              </div>
              <div class="rtl-control-row">
                <span>Bubble Shadow & Depth</span>
                <div class="rtl-shadow-group" id="p-light-shadow-group">
                  <button type="button" class="rtl-shadow-btn" data-val="none">None</button>
                  <button type="button" class="rtl-shadow-btn active" data-val="soft">Soft</button>
                  <button type="button" class="rtl-shadow-btn" data-val="3d">3D</button>
                  <button type="button" class="rtl-shadow-btn" data-val="glow">Glow</button>
                </div>
              </div>
            </div>
          </div>

          <div class="rtl-card">
            <div class="rtl-control-row">
              <div>
                <span>Harmonize Chat Input Border</span>
                <p style="margin: 2px 0 0 0; font-size: 10px; color: var(--rtl-text-muted);">Sync input box border and glow with user bubble style</p>
              </div>
              <label class="rtl-switch">
                <input type="checkbox" id="p-inputBoxEnabled">
                <span class="rtl-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- TAB 3: Sidebar -->
        <div id="ptab-sidebar" class="rtl-tab-view">
          <div class="rtl-card">
            <div class="rtl-control-row">
              <span>Compact Sidebar (Resize down to 160px)</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-compactSidebar">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <p style="margin: 2px 0 6px 0; font-size: 10.5px; color: var(--rtl-text-muted); line-height: 1.4;">
              Enables ultra-compact sidebar mode. Drag the sidebar divider to freely shrink the left pane down to 160px.
            </p>
            <div style="display: flex; justify-content: flex-end;">
              <button type="button" id="p-btn-reset-sidebar" style="background: var(--rtl-surface); border: 1px solid var(--rtl-border); color: var(--rtl-text); font-size: 11px; padding: 4px 8px; border-radius: 6px; cursor: pointer;">Reset Width to 256px</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pinned Footer (Enhanced GitHub Star Invite & Clean Badge) -->
      <div class="rtl-panel-footer">
        <a href="https://github.com/omid-io/antigravity-ui" target="_blank" class="rtl-footer-link" title="Star Antigravity UI on GitHub">
          <span class="rtl-star-badge">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" class="rtl-gh-icon"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
            <span>Star on GitHub</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" class="rtl-star-icon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </span>
        </a>
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <span class="rtl-version-tag">v3.0.1</span>
          <button id="p-btn-check-update" type="button" class="rtl-update-action-btn" title="Check GitHub for newer releases">
            <svg class="rtl-refresh-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span id="p-update-btn-label">Check Updates</span>
          </button>
        </div>
      </div>
    </div>
  \`;
  document.body.appendChild(container);

  const popup = document.getElementById('antigravity-ui-popup');
  let isPopupOpen = false;

  function togglePopup(open) {
    isPopupOpen = open !== undefined ? open : !isPopupOpen;
    popup.classList.toggle('rtl-panel-open', isPopupOpen);
    if (isPopupOpen && typeof window.__ANTIGRAVITY_SYNC_THEME_MODE__ === 'function') {
      try { window.__ANTIGRAVITY_SYNC_THEME_MODE__(); } catch (_) {}
    }
  }

  document.getElementById('p-btn-close').addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup(false);
  });

  // Delegated Root Click Handler (React-proof, immune to node replacement)
  document.addEventListener('click', (e) => {
    const sBtn = e.target.closest('#antigravity-ui-sidebar-btn');
    if (sBtn) {
      e.preventDefault();
      e.stopPropagation();
      togglePopup();
      return;
    }
    if (isPopupOpen) {
      if (!popup.contains(e.target)) {
        togglePopup(false);
      }
    }
  }, { capture: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPopupOpen) togglePopup(false);
  });

  // Attach Sidebar Button
  function attachSidebarBtn() {
    const oldBtn = document.getElementById('cdp-sidebar-btn');
    if (oldBtn) oldBtn.remove();
    const existingBtns = document.querySelectorAll('#antigravity-ui-sidebar-btn');
    if (existingBtns.length > 1) {
      for (let i = 1; i < existingBtns.length; i++) existingBtns[i].remove();
    }
    if (existingBtns.length === 1) return;

    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    if (!sidebar) return;
    let settingsBtn = null;
    sidebar.querySelectorAll('button').forEach(b => {
      if (b.textContent.includes('Settings')) settingsBtn = b;
    });
    if (!settingsBtn) return;

    const btn = document.createElement('button');
    btn.id = 'antigravity-ui-sidebar-btn';
    btn.className = settingsBtn.className;
    btn.setAttribute('type', 'button');
    btn.innerHTML = \`
      <div class="flex items-center justify-center shrink-0 w-4 h-4 text-muted-foreground">
        <span style="font-size: 14px; line-height: 1;">🌌</span>
      </div>
      <span class="truncate text-xs font-medium">Antigravity UI</span>
    \`;
    settingsBtn.parentElement.insertBefore(btn, settingsBtn);
  }
  attachSidebarBtn();
  setInterval(attachSidebarBtn, 1500);

  // Bind Form Controls
  const $ = (id) => document.getElementById(id);
  function populateUI(cfg) {
    if (!$('p-isRTL')) return;
    $('p-isRTL').checked = cfg.isRTL !== false;
    $('p-forceRTL').checked = Boolean(cfg.forceRTL);
    $('p-faFont').value = cfg.faFont || '';
    $('p-enFont').value = cfg.enFont || '';
    $('p-codeFont').value = cfg.codeFont || '';
    $('p-lh').value = cfg.lh || '1.6';
    if ($('p-val-lh')) $('p-val-lh').textContent = cfg.lh || '1.6';
    $('p-fs').value = cfg.fs || '16';
    if ($('p-val-fs')) $('p-val-fs').textContent = (cfg.fs || '16') + 'px';
    $('p-fixAtSign').checked = cfg.fixAtSign !== false;

    $('p-userMsgEnabled').checked = cfg.userMsgEnabled !== false;
    $('p-inputBoxEnabled').checked = Boolean(cfg.inputBoxEnabled);
    $('p-compactSidebar').checked = cfg.compactSidebar !== false;

    const dark = cfg.userMsgDark || {};
    $('p-dark-bg').value = dark.bg || '#1e2433';
    $('p-dark-bg-hex').value = dark.bg || '#1e2433';
    $('p-dark-text').value = dark.text || '#f1f5f9';
    $('p-dark-text-hex').value = dark.text || '#f1f5f9';
    $('p-dark-border').value = dark.border || '#384c6e';
    $('p-dark-border-hex').value = dark.border || '#384c6e';
    $('p-dark-bw').value = dark.borderWidth || '1.5';
    if ($('p-val-dark-bw')) $('p-val-dark-bw').textContent = (dark.borderWidth || '1.5') + 'px';

    const light = cfg.userMsgLight || {};
    $('p-light-bg').value = light.bg || '#f0f4ff';
    $('p-light-bg-hex').value = light.bg || '#f0f4ff';
    $('p-light-text').value = light.text || '#0f172a';
    $('p-light-text-hex').value = light.text || '#0f172a';
    $('p-light-border').value = light.border || '#cbd5e1';
    $('p-light-border-hex').value = light.border || '#cbd5e1';
    $('p-light-bw').value = light.borderWidth || '1.5';
    if ($('p-val-light-bw')) $('p-val-light-bw').textContent = (light.borderWidth || '1.5') + 'px';
  }
  populateUI(currentConfig);

  function syncConfigFromUI() {
    if (!$('p-isRTL')) return;
    const darkShadow = document.querySelector('#p-dark-shadow-group .rtl-shadow-btn.active')?.dataset.val || 'soft';
    const lightShadow = document.querySelector('#p-light-shadow-group .rtl-shadow-btn.active')?.dataset.val || 'soft';
    const updated = {
      ...currentConfig,
      isRTL: $('p-isRTL').checked,
      forceRTL: $('p-forceRTL').checked,
      faFont: $('p-faFont').value.trim(),
      enFont: $('p-enFont').value.trim(),
      codeFont: $('p-codeFont').value.trim(),
      lh: $('p-lh').value,
      fs: $('p-fs').value,
      fixAtSign: $('p-fixAtSign').checked,
      userMsgEnabled: $('p-userMsgEnabled').checked,
      inputBoxEnabled: $('p-inputBoxEnabled').checked,
      compactSidebar: $('p-compactSidebar').checked,
      userMsgDark: {
        bg: $('p-dark-bg').value,
        text: $('p-dark-text').value,
        border: $('p-dark-border').value,
        borderWidth: $('p-dark-bw').value,
        shadow: darkShadow
      },
      userMsgLight: {
        bg: $('p-light-bg').value,
        text: $('p-light-text').value,
        border: $('p-light-border').value,
        borderWidth: $('p-light-bw').value,
        shadow: lightShadow
      }
    };
    currentConfig = updated;
    applyConfigDirectly(updated);
  }

  // Live Listeners with null safety
  ['p-isRTL', 'p-forceRTL', 'p-fixAtSign', 'p-userMsgEnabled', 'p-inputBoxEnabled', 'p-compactSidebar'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('change', syncConfigFromUI);
  });
  ['p-faFont', 'p-enFont', 'p-codeFont'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', syncConfigFromUI);
  });
  const lhEl = $('p-lh');
  if (lhEl) {
    lhEl.addEventListener('input', (e) => {
      if ($('p-val-lh')) $('p-val-lh').textContent = e.target.value;
      syncConfigFromUI();
    });
  }
  const fsEl = $('p-fs');
  if (fsEl) {
    fsEl.addEventListener('input', (e) => {
      if ($('p-val-fs')) $('p-val-fs').textContent = e.target.value + 'px';
      syncConfigFromUI();
    });
  }

  // Dynamic Antigravity Theme Detection & Auto Sync
  function detectAntigravityTheme() {
    const isLight = document.body.classList.contains('theme-light') || 
                    document.body.classList.contains('light') || 
                    document.documentElement.classList.contains('light') || 
                    document.body.classList.contains('vscode-light');
    return isLight ? 'light' : 'dark';
  }

  function setMode(mode) {
    const bDark = $('p-btn-dark');
    const bLight = $('p-btn-light');
    const grpDark = $('p-group-dark');
    const grpLight = $('p-group-light');
    const panel = $('antigravity-ui-popup');

    if (panel) {
      panel.classList.toggle('rtl-is-light', mode === 'light');
      panel.classList.toggle('rtl-is-dark', mode === 'dark');
    }

    if (mode === 'light') {
      bLight?.classList.add('active');
      bDark?.classList.remove('active');
      if (grpDark) grpDark.style.display = 'none';
      if (grpLight) grpLight.style.display = 'flex';
    } else {
      bDark?.classList.add('active');
      bLight?.classList.remove('active');
      if (grpDark) grpDark.style.display = 'flex';
      if (grpLight) grpLight.style.display = 'none';
    }
  }

  window.__ANTIGRAVITY_SYNC_THEME_MODE__ = () => {
    setMode(detectAntigravityTheme());
  };

  const btnDark = $('p-btn-dark');
  const btnLight = $('p-btn-light');
  if (btnDark && btnLight) {
    btnDark.addEventListener('click', () => setMode('dark'));
    btnLight.addEventListener('click', () => setMode('light'));
  }

  // Initial automatic mode sync to current Antigravity theme
  setMode(detectAntigravityTheme());

  // Dynamic observer for live Antigravity theme switches
  try {
    const themeObserver = new MutationObserver(() => {
      setMode(detectAntigravityTheme());
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  } catch (_) {}

  // 3 Tabs Switcher
  document.querySelectorAll('.rtl-main-nav-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.rtl-main-nav-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.rtl-tab-view').forEach(t => t.classList.remove('active'));
      b.classList.add('active');
      const targetId = b.dataset.tab;
      if ($(targetId)) $(targetId).classList.add('active');
    });
  });

  // Colors
  function bindC(colorId, hexId) {
    const col = $(colorId);
    const hex = $(hexId);
    if (!col || !hex) return;
    col.addEventListener('input', (e) => {
      hex.value = e.target.value;
      syncConfigFromUI();
    });
    hex.addEventListener('input', (e) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
        col.value = e.target.value;
        syncConfigFromUI();
      }
    });
  }
  bindC('p-dark-bg', 'p-dark-bg-hex');
  bindC('p-dark-text', 'p-dark-text-hex');
  bindC('p-dark-border', 'p-dark-border-hex');
  bindC('p-light-bg', 'p-light-bg-hex');
  bindC('p-light-text', 'p-light-text-hex');
  bindC('p-light-border', 'p-light-border-hex');

  const darkBwEl = $('p-dark-bw');
  if (darkBwEl) {
    darkBwEl.addEventListener('input', (e) => {
      if ($('p-val-dark-bw')) $('p-val-dark-bw').textContent = e.target.value + 'px';
      syncConfigFromUI();
    });
  }
  const lightBwEl = $('p-light-bw');
  if (lightBwEl) {
    lightBwEl.addEventListener('input', (e) => {
      if ($('p-val-light-bw')) $('p-val-light-bw').textContent = e.target.value + 'px';
      syncConfigFromUI();
    });
  }

  document.querySelectorAll('.rtl-shadow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.rtl-shadow-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      syncConfigFromUI();
    });
  });

  const resetSbBtn = $('p-btn-reset-sidebar');
  if (resetSbBtn) {
    resetSbBtn.addEventListener('click', () => {
      localStorage.removeItem('sidebarWidth');
      document.documentElement.style.removeProperty('--compact-sidebar-width');
      const root = document.querySelector('.h-screen.w-screen') || document.body;
      const grandParent = document.querySelector('[role="navigation"][aria-label="Sidebar"]')?.parentElement?.parentElement;
      const parent = document.querySelector('[role="navigation"][aria-label="Sidebar"]')?.parentElement;
      if (grandParent) grandParent.style.removeProperty('width');
      if (parent) parent.style.removeProperty('width');
      if (root) root.style.removeProperty('--sidebar-width');
      triggerReactSidebarResize(256);
      syncConfigFromUI();
    });
  }

  // Version & GitHub 1-Click Update System
  const updateBtn = $('p-btn-check-update');
  const updateLabel = $('p-update-btn-label');
  let isCheckingUpdate = false;
  let isPerformingUpdate = false;
  let availableUpdateInfo = null;

  async function checkUpdateStatus(quiet = false) {
    if (isCheckingUpdate || isPerformingUpdate) return;
    isCheckingUpdate = true;
    if (updateBtn) updateBtn.classList.add('rtl-checking');
    if (!quiet && updateLabel) updateLabel.textContent = 'Checking...';

    const currentVer = '3.0.1';
    let updateFound = false;
    let remoteVer = null;

    try {
      // 1. First try sidecar local API if active
      if (SIDECAR_PORT > 0) {
        try {
          const res = await fetch(\`http://localhost:\${SIDECAR_PORT}/api/check-update\`);
          if (res.ok) {
            const data = await res.json();
            if (data.updateAvailable) {
              updateFound = true;
              remoteVer = data.remoteVersion;
            }
          }
        } catch (_) {}
      }

      // 2. Direct fast GitHub fallback (anti-rate-limit raw check)
      if (!updateFound) {
        const ghRes = await fetch('https://raw.githubusercontent.com/omid-io/antigravity-ui/main/package.json');
        if (ghRes.ok) {
          const pkg = await ghRes.json();
          if (pkg && pkg.version && pkg.version !== currentVer) {
            updateFound = true;
            remoteVer = pkg.version;
          }
        }
      }

      if (updateFound && remoteVer) {
        availableUpdateInfo = { updateAvailable: true, remoteVersion: remoteVer, currentVersion: currentVer };
        if (updateBtn) {
          updateBtn.classList.add('rtl-update-available');
          updateBtn.title = \`New version v\${remoteVer} is available! Click to update now.\`;
        }
        if (updateLabel) updateLabel.textContent = \`Update to v\${remoteVer} ✨\`;
      } else {
        availableUpdateInfo = null;
        if (updateBtn) {
          updateBtn.classList.remove('rtl-update-available');
          updateBtn.title = 'Check GitHub for newer releases';
        }
        if (updateLabel) {
          updateLabel.textContent = quiet ? 'Check Updates' : 'Up to date ✔';
          if (!quiet) {
            setTimeout(() => {
              if (!availableUpdateInfo && updateLabel) updateLabel.textContent = 'Check Updates';
            }, 2500);
          }
        }
      }
    } catch (e) {
      if (!quiet && updateLabel) {
        updateLabel.textContent = 'Up to date ✔';
        setTimeout(() => {
          if (updateLabel) updateLabel.textContent = 'Check Updates';
        }, 2000);
      }
    } finally {
      if (updateBtn) updateBtn.classList.remove('rtl-checking');
      isCheckingUpdate = false;
    }
  }

  async function triggerUpdateFlow() {
    if (isPerformingUpdate) return;
    isPerformingUpdate = true;
    if (updateBtn) {
      updateBtn.classList.add('rtl-updating');
      updateBtn.classList.add('rtl-checking');
    }
    if (updateLabel) updateLabel.textContent = 'Updating...';

    try {
      if (SIDECAR_PORT > 0) {
        const res = await fetch(\`http://localhost:\${SIDECAR_PORT}/api/perform-update\`, { method: 'POST' });
        const result = await res.json();
        if (result.success) {
          if (updateBtn) {
            updateBtn.classList.remove('rtl-update-available');
            updateBtn.classList.remove('rtl-updating');
            updateBtn.classList.remove('rtl-checking');
          }
          if (updateLabel) updateLabel.textContent = \`Updated to v\${result.version}! 🎉\`;
          availableUpdateInfo = null;
          setTimeout(() => {
            if (updateLabel) updateLabel.textContent = 'Check Updates';
          }, 3000);
          return;
        }
      }
      // If sidecar API unavailable, open GitHub releases in browser
      window.open('https://github.com/omid-io/antigravity-ui/releases', '_blank');
      if (updateBtn) {
        updateBtn.classList.remove('rtl-updating');
        updateBtn.classList.remove('rtl-checking');
      }
      if (updateLabel) updateLabel.textContent = 'Opened GitHub 🔗';
      setTimeout(() => {
        if (updateLabel && availableUpdateInfo) updateLabel.textContent = \`Update to v\${availableUpdateInfo.remoteVersion} ✨\`;
      }, 3000);
    } catch (err) {
      if (updateBtn) {
        updateBtn.classList.remove('rtl-updating');
        updateBtn.classList.remove('rtl-checking');
      }
      if (updateLabel) updateLabel.textContent = 'Update Error ⚠️';
      setTimeout(() => {
        if (availableUpdateInfo) {
          if (updateBtn) updateBtn.classList.add('rtl-update-available');
          if (updateLabel) updateLabel.textContent = \`Update to v\${availableUpdateInfo.remoteVersion} ✨\`;
        } else {
          if (updateLabel) updateLabel.textContent = 'Check Updates';
        }
      }, 3000);
    } finally {
      isPerformingUpdate = false;
    }
  }

  if (updateBtn) {
    updateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (availableUpdateInfo) {
        triggerUpdateFlow();
      } else {
        checkUpdateStatus(false);
      }
    });
  }

  // Auto-check on popup initialization (startup check)
  setTimeout(() => {
    checkUpdateStatus(true);
  }, 1000);

  window.__ANTIGRAVITY_SYNC_CONFIG__ = (cfg) => {
    currentConfig = cfg;
    populateUI(cfg);
    applyConfigDirectly(cfg);
  };
})();
`;
}
