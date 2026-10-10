// Antigravity UI Studio - CDP Sidebar & Popup Injector Engine
// Injects native-looking sidebar button and customizer popup directly into Antigravity Chat Window without any Asar patches!

export function generatePopupBundle(config, fontBase64, sidecarPort, sidecarToken) {
  const cfgJson = JSON.stringify(config);
  return `
(() => {
  const POPUP_ENGINE_VERSION = 6;
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
      [data-testid="user-input-step"] > *:not(pre):not(code) {
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

      \${userMsgCSS}
      \${inputBoxCSS}
    \`;

    /* Compact sidebar runtime sync */
    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    const parent = sidebar ? sidebar.parentElement : null;
    const grandParent = parent ? parent.parentElement : null;
    if (grandParent) {
      if (c.compactSidebar === false) {
        localStorage.removeItem('sidebarWidth');
        grandParent.style.removeProperty('width');
        if (parent) parent.style.removeProperty('width');
      } else {
        const storedW = parseInt(localStorage.getItem('sidebarWidth'), 10);
        if (storedW && storedW >= 160 && storedW < 256) {
          grandParent.style.setProperty('width', storedW + 'px', 'important');
          if (parent) parent.style.setProperty('width', storedW + 'px', 'important');
        }
      }
    }
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

      /* Pixel-Crisp Popup Panel (Zero Fractional GPU Blur) */
      .rtl-widget-panel {
        font-family: 'Vazirmatn', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
        position: fixed !important;
        bottom: 56px !important;
        left: 16px !important;
        right: auto !important;
        width: 326px !important;
        height: 524px !important;
        max-height: 85vh !important;
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

      /* Custom Crisp Scrollbar */
      .rtl-panel-body {
        scrollbar-width: thin !important;
        scrollbar-color: rgba(140, 150, 170, 0.45) transparent !important;
        flex: 1 1 0;
        overflow-y: auto;
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
        padding: 6px 4px;
        border: none;
        background: transparent;
        color: var(--rtl-text-secondary);
        font-size: 11px;
        font-weight: 600;
        border-radius: 7px;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: center;
        white-space: nowrap;
      }
      .rtl-main-nav-btn.active {
        background-color: var(--rtl-accent) !important;
        color: #ffffff !important;
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
        font-weight: 500;
        color: var(--rtl-text);
        min-height: 26px;
      }
      .rtl-control-row > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1 1 auto;
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

      /* Footer */
      .rtl-panel-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border-top: 1px solid var(--rtl-border-subtle);
        background-color: var(--rtl-surface);
        font-size: 11px;
      }
      .rtl-footer-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: var(--rtl-text-secondary);
        text-decoration: none;
        font-weight: 500;
      }
      .rtl-footer-link:hover { color: #f59e0b; }
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
      <div style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px 8px; border-bottom: 1px solid var(--rtl-border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px;">
            <span style="font-size: 16px;">🌌</span>
            <span>Antigravity UI Studio</span>
          </div>
          <button id="p-btn-close" type="button" style="background: none; border: none; cursor: pointer; color: var(--rtl-text-muted); font-size: 16px; padding: 2px 6px;">✕</button>
        </div>

        <!-- 3 Tabs Switcher -->
        <div class="rtl-main-nav">
          <button type="button" class="rtl-main-nav-btn active" data-tab="ptab-typo">راست‌چین و قلم</button>
          <button type="button" class="rtl-main-nav-btn" data-tab="ptab-theme">پیام کاربر و تم</button>
          <button type="button" class="rtl-main-nav-btn" data-tab="ptab-sidebar">سایدبار و محیط</button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="rtl-panel-body">
        <!-- TAB 1: RTL & Typography -->
        <div id="ptab-typo" class="rtl-tab-view active">
          <div class="rtl-card">
            <div class="rtl-control-row">
              <span>موتور هوشمند راست‌چین (RTL)</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-isRTL">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <div class="rtl-control-row">
              <span>اجبار سراسری به راست‌چین (Force RTL)</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-forceRTL">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <div class="rtl-control-row">
              <span>فونت فارسی (FA Font)</span>
              <input type="text" id="p-faFont" class="rtl-text-input" placeholder="پیش‌فرض: Vazirmatn">
            </div>
            <div class="rtl-control-row">
              <span>فونت انگلیسی (EN Font)</span>
              <input type="text" id="p-enFont" class="rtl-text-input" placeholder="پیش‌فرض: System">
            </div>
            <div class="rtl-control-row">
              <span>فونت کدها (Code Font)</span>
              <input type="text" id="p-codeFont" class="rtl-text-input" placeholder="پیش‌فرض: Monospace">
            </div>
            <div class="rtl-control-row">
              <span>ارتفاع خطوط (Line Height)</span>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="range" id="p-lh" min="1.2" max="2.5" step="0.1" class="rtl-range-slider">
                <span id="p-val-lh" class="rtl-badge-val">1.6</span>
              </div>
            </div>
            <div class="rtl-control-row">
              <span>اندازه قلم (Font Size)</span>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="range" id="p-fs" min="11" max="22" step="1" class="rtl-range-slider">
                <span id="p-val-fs" class="rtl-badge-val">16px</span>
              </div>
            </div>
            <div class="rtl-control-row">
              <span>اصلاح Shift+2 برای علامت @</span>
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
              <span style="font-weight: 600;">استایل اختصاصی حباب پیام کاربر</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-userMsgEnabled">
                <span class="rtl-slider"></span>
              </label>
            </div>

            <div class="rtl-mode-switcher">
              <button type="button" id="p-btn-dark" class="rtl-mode-btn active">تاریک (Dark)</button>
              <button type="button" id="p-btn-light" class="rtl-mode-btn">روشن (Light)</button>
            </div>

            <!-- Dark controls -->
            <div id="p-group-dark" style="display: flex; flex-direction: column; gap: 6px;">
              <div class="rtl-control-row">
                <span>رنگ پس‌زمینه</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-bg" class="rtl-color-input">
                  <input type="text" id="p-dark-bg-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>رنگ متن</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-text" class="rtl-color-input">
                  <input type="text" id="p-dark-text-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>رنگ کادر</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-dark-border" class="rtl-color-input">
                  <input type="text" id="p-dark-border-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>ضخامت کادر</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="range" id="p-dark-bw" min="0" max="4" step="0.5" class="rtl-range-slider">
                  <span id="p-val-dark-bw" class="rtl-badge-val">1.5px</span>
                </div>
              </div>
              <div class="rtl-control-row">
                <span>سایه و عمق حباب</span>
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
                <span>رنگ پس‌زمینه</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-bg" class="rtl-color-input">
                  <input type="text" id="p-light-bg-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>رنگ متن</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-text" class="rtl-color-input">
                  <input type="text" id="p-light-text-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>رنگ کادر</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="color" id="p-light-border" class="rtl-color-input">
                  <input type="text" id="p-light-border-hex" class="rtl-hex-input" maxlength="7">
                </div>
              </div>
              <div class="rtl-control-row">
                <span>ضخامت کادر</span>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="range" id="p-light-bw" min="0" max="4" step="0.5" class="rtl-range-slider">
                  <span id="p-val-light-bw" class="rtl-badge-val">1.5px</span>
                </div>
              </div>
              <div class="rtl-control-row">
                <span>سایه و عمق حباب</span>
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
                <span style="font-weight: 500;">کادر دور باکس ورودی چت</span>
                <p style="margin: 2px 0 0 0; font-size: 10px; color: var(--rtl-text-muted);">همگام‌سازی کادر با پیام کاربر</p>
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
              <span>سایدبار فوق‌فشرده (امکان ریسایز تا ۱۶۰px)</span>
              <label class="rtl-switch">
                <input type="checkbox" id="p-compactSidebar">
                <span class="rtl-slider"></span>
              </label>
            </div>
            <p style="margin: 2px 0 6px 0; font-size: 10.5px; color: var(--rtl-text-muted); line-height: 1.4;">
              با فعال‌سازی این گزینه، با کشیدن خط جداکننده سایدبار سمت چپ می‌توانید عرض آن را آزادانه تا ۱۶۰ پیکسل باریک کنید.
            </p>
            <div style="display: flex; justify-content: flex-end;">
              <button type="button" id="p-btn-reset-sidebar" style="background: var(--rtl-surface); border: 1px solid var(--rtl-border); color: var(--rtl-text); font-size: 11px; padding: 4px 8px; border-radius: 6px; cursor: pointer;">بازنشانی به ۲۵۶ پیکسل</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pinned Footer -->
      <div class="rtl-panel-footer">
        <a href="https://github.com/omid-io/antigravity-ui" target="_blank" class="rtl-footer-link">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
          <span>پروژه در گیت‌هاب</span>
          <span style="color: #f59e0b; font-weight: 700; margin-right: 4px;">★ Star</span>
        </a>
        <span style="font-family: ui-monospace, monospace; font-size: 10px; color: var(--rtl-text-muted);">v3.0 Native</span>
      </div>
    </div>
  \`;
  document.body.appendChild(container);

  const popup = document.getElementById('antigravity-ui-popup');
  let isPopupOpen = false;

  function togglePopup(open) {
    isPopupOpen = open !== undefined ? open : !isPopupOpen;
    popup.classList.toggle('rtl-panel-open', isPopupOpen);
  }

  document.getElementById('p-btn-close').addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup(false);
  });

  document.addEventListener('click', (e) => {
    if (!isPopupOpen) return;
    const sBtn = document.getElementById('antigravity-ui-sidebar-btn');
    if (!popup.contains(e.target) && (!sBtn || !sBtn.contains(e.target))) {
      togglePopup(false);
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePopup();
    });
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

  // Dark/Light tabs
  const btnDark = $('p-btn-dark');
  const btnLight = $('p-btn-light');
  if (btnDark && btnLight) {
    btnDark.addEventListener('click', () => {
      btnDark.classList.add('active');
      btnLight.classList.remove('active');
      if ($('p-group-dark')) $('p-group-dark').style.display = 'flex';
      if ($('p-group-light')) $('p-group-light').style.display = 'none';
    });
    btnLight.addEventListener('click', () => {
      btnLight.classList.add('active');
      btnDark.classList.remove('active');
      if ($('p-group-dark')) $('p-group-dark').style.display = 'none';
      if ($('p-group-light')) $('p-group-light').style.display = 'flex';
    });
  }

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
      const grandParent = document.querySelector('[role="navigation"][aria-label="Sidebar"]')?.parentElement?.parentElement;
      if (grandParent) grandParent.style.setProperty('width', '256px', 'important');
      syncConfigFromUI();
    });
  }

  window.__ANTIGRAVITY_SYNC_CONFIG__ = (cfg) => {
    currentConfig = cfg;
    populateUI(cfg);
    applyConfigDirectly(cfg);
  };
})();
`;
}
