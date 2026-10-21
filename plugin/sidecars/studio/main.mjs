import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { SidecarApp, Response } from 'sidecar_sdk';
import { generatePopupBundle } from './popup-engine.js';

// Immortal Sidecar Process Immunity (Zero-Crash Guarantee)
process.on('uncaughtException', (err) => {
  console.error('[antigravity-ui] Suppressed uncaughtException:', err?.message || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[antigravity-ui] Suppressed unhandledRejection:', reason?.message || reason);
});

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(homedir(), '.antigravity-ui.json');
const LEGACY_CONFIG_PATH = join(homedir(), '.antigravity-rtl.json');
const DEVTOOLS_PORT_PATH = join(homedir(), 'AppData', 'Roaming', 'Antigravity', 'DevToolsActivePort');
const ASAR_PATH = join(homedir(), 'AppData', 'Local', 'Programs', 'antigravity', 'resources', 'app.asar');
const FONT_PATH = join(HERE, 'Vazirmatn-Variable.woff2');

let fontBase64 = '';
const bundledFonts = {};
const fontCandidates = [
  { name: 'Vazirmatn', files: [join(HERE, 'Vazirmatn-Variable.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/Vazirmatn-Variable.woff2', 'E:/programming/antigravity-ui/bin/Vazirmatn-Variable.woff2'] },
  { name: 'Rubik', files: [join(HERE, 'fonts', 'Rubik.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/Rubik.woff2'] },
  { name: 'Noto Sans Arabic', files: [join(HERE, 'fonts', 'NotoSansArabic.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/NotoSansArabic.woff2'] },
  { name: 'Markazi Text', files: [join(HERE, 'fonts', 'MarkaziText.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/MarkaziText.woff2'] },
  { name: 'Inter', files: [join(HERE, 'fonts', 'Inter.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/Inter.woff2'] },
  { name: 'Plus Jakarta Sans', files: [join(HERE, 'fonts', 'PlusJakartaSans.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/PlusJakartaSans.woff2'] },
  { name: 'JetBrains Mono', files: [join(HERE, 'fonts', 'JetBrainsMono.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/JetBrainsMono.woff2'] },
  { name: 'Fira Code', files: [join(HERE, 'fonts', 'FiraCode.woff2'), 'C:/Users/Omid io/.gemini/config/plugins/antigravity-ui/sidecars/studio/fonts/FiraCode.woff2'] }
];

for (const fc of fontCandidates) {
  for (const f of fc.files) {
    try {
      if (existsSync(f)) {
        bundledFonts[fc.name] = readFileSync(f).toString('base64');
        break;
      }
    } catch (_) {}
  }
}
if (bundledFonts['Vazirmatn']) fontBase64 = bundledFonts['Vazirmatn'];

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
      case 'soft': return '0 12px 30px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3), inset 0 1.5px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.4)';
      case '3d':
      case 'medium':
        return '0 5px 0 0 rgba(0, 0, 0, 0.18), 0 12px 24px -2px rgba(15, 23, 42, 0.22)';
      case 'glow':
        return `0 0 0 1.5px ${borderCol}, 0 6px 22px 3px ${borderCol}66, 0 2px 6px ${borderCol}40`;
      case 'clay':
        return '0 16px 32px -4px rgba(70, 95, 140, 0.2), 0 6px 14px -2px rgba(70, 95, 140, 0.1), inset 3.5px 3.5px 6px rgba(255, 255, 255, 0.95), inset -3.5px -3.5px 7px rgba(70, 95, 140, 0.12)';
      default:
        return 'none';
    }
  } else {
    switch (type) {
      case 'soft': return '0 12px 30px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3), inset 0 1.5px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.4)';
      case '3d':
      case 'medium':
        return '0 5px 0 0 rgba(0, 0, 0, 0.8), 0 14px 28px -3px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
      case 'glow':
        return `0 0 0 1.5px ${borderCol}, 0 0 25px 4px ${borderCol}88, 0 0 50px 10px ${borderCol}44`;
      case 'clay':
        return '0 20px 40px -6px rgba(0, 0, 0, 0.75), 0 8px 16px -2px rgba(0, 0, 0, 0.6), inset 2.5px 2.5px 5px rgba(255, 255, 255, 0.22), inset -3.5px -3.5px 8px rgba(0, 0, 0, 0.75)';
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
    borderRadius: '14',
    shadow: 'clay',
    ...(c.userMsgDark || {})
  };

  const userMsgLight = {
    bg: '#f0f4ff',
    text: '#0f172a',
    border: '#cbd5e1',
    borderWidth: '1.5',
    borderRadius: '14',
    shadow: 'clay',
    ...(c.userMsgLight || {})
  };

  const isDarkClay = userMsgDark.shadow === 'clay';
  const isLightClay = userMsgLight.shadow === 'clay';
  const isDarkSoft = userMsgDark.shadow === 'soft';
  const isLightSoft = userMsgLight.shadow === 'soft';

  const lightBg = isLightClay ? 'linear-gradient(145deg, #f0f6ff 0%, #e2ecfa 100%)' : (isLightSoft ? 'linear-gradient(112deg, rgba(255,255,255,0.97) 0%, rgba(249,252,255,0.96) 20%, rgba(236,244,255,0.94) 58%, rgba(222,235,255,0.95) 100%)' : userMsgLight.bg);
  const lightText = isLightClay ? '#0f172a' : (isLightSoft ? '#243a59' : userMsgLight.text);
  const lightBorder = isLightClay ? 'rgba(255, 255, 255, 0.95)' : (isLightSoft ? 'rgba(255, 255, 255, 0.96)' : userMsgLight.border);
  const lightBorderWidth = isLightClay ? '1.5' : (isLightSoft ? (userMsgLight.borderWidth || '1') : userMsgLight.borderWidth);
  const lightBorderRadius = (userMsgLight && userMsgLight.borderRadius) || '14';

  const darkBg = isDarkClay ? 'linear-gradient(145deg, #1e2638 0%, #141b29 100%)' : (isDarkSoft ? 'linear-gradient(112deg, rgba(30, 41, 59, 0.95) 0%, rgba(23, 32, 48, 0.93) 50%, rgba(15, 23, 42, 0.92) 100%)' : userMsgDark.bg);
  const darkText = isDarkClay ? '#f8fafc' : (isDarkSoft ? '#e2e8f0' : userMsgDark.text);
  const darkBorder = isDarkClay ? 'rgba(147, 197, 253, 0.24)' : (isDarkSoft ? 'rgba(255, 255, 255, 0.16)' : userMsgDark.border);
  const darkBorderWidth = isDarkClay ? '1.5' : (isDarkSoft ? (userMsgDark.borderWidth || '1') : userMsgDark.borderWidth);
  const darkBorderRadius = (userMsgDark && userMsgDark.borderRadius) || '14';

  // Strict Unicode-range virtual font definitions
  // Ensures Persian font ONLY matches Persian/Arabic chars, English font handles Latin chars,
  // and Code font strictly handles monospace blocks.
  const ARABIC_UNICODE_RANGE = 'U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF';
  const LATIN_UNICODE_RANGE = 'U+0000-05FF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2200-22FF, U+FB00-FB4F';

  let extraFontRules = '';

  // 1. Virtual Persian Font: Strictly scoped to Arabic/Persian Unicode Range
  const targetFaName = faFont || 'Vazirmatn';
  const targetFaB64 = bundledFonts[targetFaName] || bundledFonts['Vazirmatn'] || fontBase64;
  if (targetFaB64) {
    extraFontRules += `
      @font-face {
        font-family: 'AppPersianFont';
        src: url('data:font/woff2;base64,${targetFaB64}') format('woff2');
        font-weight: 100 900;
        font-display: swap;
        unicode-range: ${ARABIC_UNICODE_RANGE};
      }
    `;
  }

  // 2. Virtual English Font: Dedicated to Latin characters
  if (enFont && bundledFonts[enFont]) {
    extraFontRules += `
      @font-face {
        font-family: 'AppEnglishFont';
        src: url('data:font/woff2;base64,${bundledFonts[enFont]}') format('woff2');
        font-weight: 100 900;
        font-display: swap;
        unicode-range: ${LATIN_UNICODE_RANGE};
      }
    `;
  }

  // 3. Virtual Code Monospace Font
  if (codeFont && bundledFonts[codeFont]) {
    extraFontRules += `
      @font-face {
        font-family: 'AppCodeFont';
        src: url('data:font/woff2;base64,${bundledFonts[codeFont]}') format('woff2');
        font-weight: 100 900;
        font-display: swap;
      }
    `;
  }

  const appFontStack = enFont && bundledFonts[enFont] 
    ? "'AppPersianFont', 'AppEnglishFont', ui-sans-serif, system-ui, sans-serif"
    : (enFont 
        ? `'AppPersianFont', '${enFont}', ui-sans-serif, system-ui, sans-serif` 
        : "'AppPersianFont', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif");

  const appCodeStack = codeFont && bundledFonts[codeFont]
    ? "'AppCodeFont', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    : (codeFont
        ? `'${codeFont}', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
        : "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace");

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

  const darkShadow = getShadowCSS(userMsgDark.shadow, darkBorder, 'dark');
  const lightShadow = getShadowCSS(userMsgLight.shadow, lightBorder, 'light');

  const userMsgCSS = userMsgEnabled ? `
    :root, body, body.light, body.theme-light {
      --user-msg-bg: ${lightBg};
      --user-msg-text: ${lightText};
      --user-msg-border-color: ${lightBorder};
      --user-msg-border-width: ${lightBorderWidth}px;
      --user-msg-border-radius: ${lightBorderRadius}px;
      --user-msg-shadow: ${lightShadow};
    }
    body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
      --user-msg-bg: ${darkBg};
      --user-msg-text: ${darkText};
      --user-msg-border-color: ${darkBorder};
      --user-msg-border-width: ${darkBorderWidth}px;
      --user-msg-border-radius: ${darkBorderRadius}px;
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
    [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"],
    [data-testid="user-input-step"] .bg-card-border {
      background: transparent !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: var(--user-msg-border-radius, 14px) !important;
      overflow: visible !important;
      transition: all 0.2s ease !important;
    }

    ${(isLightSoft || isDarkSoft) ? `
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
      [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
      [data-testid="user-input-step"] > .w-full > div > .bg-card {
        isolation: isolate !important;
        backdrop-filter: blur(20px) saturate(155%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(155%) !important;
        transform: translateZ(0) !important;
        overflow: hidden !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      [data-testid="user-input-step"] > .w-full > div > .bg-card::before {
        content: "" !important;
        position: absolute !important;
        z-index: 0 !important;
        pointer-events: none !important;
        top: 1px !important;
        left: 2% !important;
        right: 2% !important;
        height: 52% !important;
        border-radius: 12px 12px 48% 48% / 10px 10px 36% 36% !important;
        background: linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.36) 31%, rgba(255,255,255,0.08) 72%, transparent 100%) !important;
        filter: blur(0.25px) !important;
      }
      [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      [data-testid="user-input-step"] > .w-full > div > .bg-card::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        background: radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.7), transparent 37%), radial-gradient(ellipse at 100% 100%, rgba(106,157,247,0.15), transparent 42%), linear-gradient(120deg, transparent 28%, rgba(255,255,255,0.2) 49%, transparent 68%) !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.24), inset 0 -7px 16px rgba(126,166,228,0.055) !important;
      }
      .theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      .dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before {
        background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 100%) !important;
      }
      .theme-light [data-testid="user-input-step"] [data-quotable="true"],
      .theme-light [data-testid="user-input-step"] .whitespace-pre-wrap {
        text-shadow: 0 1px 0 rgba(255,255,255,0.9) !important;
      }
    ` : ''}

    [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
    [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
    [data-testid="user-input-step"] > .w-full > div > .bg-card {
      background: var(--user-msg-bg) !important;
      border: var(--user-msg-border-width) solid var(--user-msg-border-color) !important;
      box-shadow: var(--user-msg-shadow) !important;
      color: var(--user-msg-text) !important;
      border-radius: var(--user-msg-border-radius, 14px) !important;
      position: relative !important;
      z-index: 2 !important;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, filter 0.2s ease !important;
    }
    [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"]:hover > div,
    [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container):hover,
    [data-testid="user-input-step"] > .w-full > div > .bg-card:hover {
      transform: translateY(-2.5px) !important;
      filter: brightness(1.025);
    }
    [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"]:active > div,
    [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container):active,
    [data-testid="user-input-step"] > .w-full > div > .bg-card:active {
      transform: scale(0.985) !important;
    }
    [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] .whitespace-pre-wrap,
    [data-testid="user-input-step"] .whitespace-pre-wrap,
    [data-testid="user-input-step"] [data-quotable="true"],
    [data-testid="user-input-step"] p,
    [data-testid="user-input-step"] span:not(.text-muted-foreground) {
      color: var(--user-msg-text) !important;
    }

    /* Harmonized Action Toolbar */
    [data-testid="user-input-step"] .user-input-buttons-container {
      background: var(--user-msg-bg) !important;
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
      --input-box-bg: ${isLightClay ? 'linear-gradient(145deg, #f0f6ff 0%, #e2ecfa 100%)' : 'transparent'};
      --input-box-border-color: ${lightBorder};
      --input-box-border-width: ${lightBorderWidth}px;
      --input-box-shadow: ${lightShadow};
    }
    body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
      --input-box-bg: ${isDarkClay ? 'linear-gradient(145deg, #1e2638 0%, #141b29 100%)' : 'transparent'};
      --input-box-border-color: ${darkBorder};
      --input-box-border-width: ${darkBorderWidth}px;
      --input-box-shadow: ${darkShadow};
    }
    [id="antigravity.agentSidePanelInputBox"], [id*="agentSidePanelInputBox"] {
      border: var(--input-box-border-width) solid var(--input-box-border-color) !important;
      box-shadow: var(--input-box-shadow) !important;
      background: var(--input-box-bg) !important;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    ${(isLightClay || isDarkClay) ? `
    [id="antigravity.agentSidePanelInputBox"] .bg-card, 
    [id*="agentSidePanelInputBox"] .bg-card {
      background: transparent !important;
    }
    [id="antigravity.agentSidePanelInputBox"]:hover, 
    [id*="agentSidePanelInputBox"]:hover {
      filter: brightness(1.02);
      transform: translateY(-1.5px);
    }
    ` : ''}
  ` : '';

  return `
(() => {
  try {
    const legacyGFonts = document.getElementById('antigravity-gfonts-link');
    if (legacyGFonts) legacyGFonts.remove();

    let uiStyle = document.getElementById('antigravity-ui-style');
    if (!uiStyle) {
      uiStyle = document.createElement('style');
      uiStyle.id = 'antigravity-ui-style';
      document.head.appendChild(uiStyle);
    }

    uiStyle.textContent = \`
      ${extraFontRules}

      /* Seamless Sidebar Top Action Buttons Gap Fix (Prevents Search Icon Overflow) */
      div:has(> button[aria-label="Toggle Sidebar"]) {
        gap: 2px !important;
      }
      div.flex.items-center:has(> button[data-testid="app-icon-new-conversation-button"]) {
        padding-left: 4px !important;
      }
      button[data-testid="app-icon-new-conversation-button"] {
        padding-left: 2px !important;
        padding-right: 4px !important;
        margin-right: 2px !important;
      }

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

      /* Typography & Fonts - Strict BiDi Scoped Application */
      :root, :host, html, body,
      .prose, .prose p, .prose span:not(pre *):not(code *), .prose li,
      [data-testid="chat-message"], [data-testid="chat-message"] p,
      [data-testid="chat-message"] span:not(pre *):not(code *),
      .markdown-body, .markdown-body p,
      .markdown-body span:not(pre *):not(code *),
      .leading-relaxed, .leading-relaxed p,
      [data-testid="user-input-step"], [data-testid="user-input-step"] p,
      [data-testid="user-input-step"] span:not(pre *):not(code *),
      [contenteditable="true"], [data-lexical-text="true"],
      p, li, h1, h2, h3, h4, h5, h6 {
        font-family: ${appFontStack} !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
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

      /* Monospace Code Isolation - Dedicated Font & Direction Guard */
      pre, code, pre *, code *,
      .prose pre, .prose code, .prose pre *, .prose code *,
      [data-testid="chat-message"] pre, [data-testid="chat-message"] code,
      [data-testid="chat-message"] pre *, [data-testid="chat-message"] code *,
      .markdown-body pre, .markdown-body code,
      .markdown-body pre *, .markdown-body code *,
      .monaco-editor, .monaco-editor * {
        unicode-bidi: isolate !important;
        direction: ltr !important;
        text-align: left !important;
        font-family: ${appCodeStack} !important;
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

    /* Shift+2 Fix (Unconditionally active) */
    if (!window.__ANTIGRAVITY_AT_FIX__) {
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
// Autonomous GitHub Update Engine State & Helpers
// ---------------------------------------------------------------------------
function getStudioVersion() {
  try {
    const pkgPath = join(HERE, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      if (pkg && pkg.version) return pkg.version;
    }
  } catch (_) {}
  return '3.2.0';
}

function compareVersions(v1, v2) {
  const p1 = (v1 || '').replace(/^v/, '').split('.').map(Number);
  const p2 = (v2 || '').replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const num1 = p1[i] || 0;
    const num2 = p2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

let CURRENT_VERSION = getStudioVersion();
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/omid-io/antigravity-ui/main';

let updateState = {
  currentVersion: CURRENT_VERSION,
  latestVersion: CURRENT_VERSION,
  hasUpdate: false,
  checkedAt: 0,
  checking: false,
  error: null
};

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
  const popupScript = generatePopupBundle(config, fontBase64, myPort, myToken, updateState.currentVersion, bundledFonts);

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
            if (typeof ws.on === 'function') {
              ws.on('error', () => {});
            }
            ws.onerror = () => {};
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
                  if (force || !val.hasStyle || !val.hasBtn || !val.hasPopup || String(val.popupVersion) !== String(updateState.currentVersion)) {
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
let app;
try {
  app = new SidecarApp();
} catch (_) {
  app = {
    page: () => {},
    api: () => {},
    run: () => {}
  };
}

const readLocal = (filename) => readFileSync(join(HERE, filename), 'utf8');

app.page('/', () => readLocal('index.html'));
app.page('/app.js', () => readLocal('app.js'));
app.api('/styles.css', () => new Response(readLocal('styles.css'), { contentType: 'text/css' }), 'GET');
app.api('/font.woff2', () => new Response(readFileSync(join(HERE, 'Vazirmatn-Variable.woff2')), { contentType: 'font/woff2' }), 'GET');
app.api('/logo.svg', () => new Response(readFileSync(join(HERE, 'logo.svg')), { contentType: 'image/svg+xml' }), 'GET');
app.api('/icon.png', () => new Response(readFileSync(join(HERE, 'icon.png')), { contentType: 'image/png' }), 'GET');

// ---------------------------------------------------------------------------
// Autonomous GitHub Update Engine
// ---------------------------------------------------------------------------
async function checkGitHubUpdate() {
  if (updateState.checking) return updateState;
  updateState.checking = true;
  updateState.error = null;
  try {
    const res = await fetch(`${GITHUB_RAW_BASE}/package.json`, {
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.version) {
        updateState.latestVersion = data.version;
        updateState.hasUpdate = compareVersions(data.version, updateState.currentVersion) > 0;
        updateState.checkedAt = Date.now();
      }
    }
  } catch (err) {
    updateState.error = err.message;
  } finally {
    updateState.checking = false;
  }
  return updateState;
}

// Check once on sidecar boot in background (zero blocking)
setTimeout(() => {
  checkGitHubUpdate().catch(() => {});
}, 3000);

async function downloadAndApplyUpdate() {
  try {
    const filesToUpdate = [
      { url: `${GITHUB_RAW_BASE}/plugin/sidecars/studio/package.json`, dest: join(HERE, 'package.json') },
      { url: `${GITHUB_RAW_BASE}/plugin/sidecars/studio/popup-engine.js`, dest: join(HERE, 'popup-engine.js') },
      { url: `${GITHUB_RAW_BASE}/plugin/sidecars/studio/main.mjs`, dest: join(HERE, 'main.mjs') },
      { url: `${GITHUB_RAW_BASE}/plugin/sidecars/studio/index.html`, dest: join(HERE, 'index.html') },
      { url: `${GITHUB_RAW_BASE}/plugin/sidecars/studio/styles.css`, dest: join(HERE, 'styles.css') }
    ];

    for (const f of filesToUpdate) {
      try {
        const resp = await fetch(f.url, { signal: AbortSignal.timeout(8000) });
        if (!resp.ok) continue;
        const text = await resp.text();
        if (text && text.length > 5) {
          writeFileSync(f.dest, text, 'utf8');
        }
      } catch (_) {}
    }

    CURRENT_VERSION = updateState.latestVersion;
    updateState.currentVersion = updateState.latestVersion;
    updateState.hasUpdate = false;

    // Force re-inject new engine to open Electron windows in 0ms!
    injectToLiveWindows(currentActiveConfig, true);

    // Gracefully restart sidecar so supervisor (restart_policy: always) loads fresh code into memory
    setTimeout(() => {
      try {
        process.exit(0);
      } catch (_) {}
    }, 1200);

    return { success: true, version: updateState.latestVersion };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

app.api('/api/status', () => {
  return {
    version: updateState.currentVersion,
    nodeVersion: process.version,
    cdpPort: getDevToolsPort(),
    asarPatched: existsSync(ASAR_PATH + '.meta.json'),
    configExists: existsSync(CONFIG_PATH),
    updateState
  };
}, 'GET');

app.api('/api/check-update', async () => {
  return await checkGitHubUpdate();
}, 'GET');

app.api('/api/perform-update', async () => {
  return await downloadAndApplyUpdate();
}, 'POST');

// Dedicated Local HTTP Server for 1-Click Zero-Downtime Live Updates
const LOCAL_UPDATE_PORT = 58888;
try {
  const localHttp = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://127.0.0.1:${LOCAL_UPDATE_PORT}`);
    if (url.pathname === '/api/check-update') {
      const st = await checkGitHubUpdate();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        updateAvailable: st.hasUpdate,
        currentVersion: updateState.currentVersion,
        remoteVersion: st.latestVersion
      }));
      return;
    }

    if (url.pathname === '/api/perform-update' && req.method === 'POST') {
      try {
        const result = await downloadAndApplyUpdate();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    res.writeHead(404);
    res.end('Not Found');
  });

  localHttp.listen(LOCAL_UPDATE_PORT, '127.0.0.1', () => {
    console.log(`[antigravity-ui] Dedicated update server listening on 127.0.0.1:${LOCAL_UPDATE_PORT}`);
  });
  localHttp.on('error', (err) => {
    console.warn('[antigravity-ui] Update server port already bound or in use:', err.message);
  });
} catch (_) {}

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

try { app.run(); } catch (_) {}
