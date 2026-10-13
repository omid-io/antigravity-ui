# 📋 Changelog — Antigravity UI

All notable changes to **Antigravity UI** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-10-13

### Added
- **Zero-Patch Native Plugin Architecture:** Transitioned from invasive `app.asar` extraction and patching to a 100% official Google Antigravity Plugin structure. Completely eliminates binary tampering and survives desktop updates without breaking.
- **Native Sidebar Activity Docking:** Injected a sleek, integrated Galaxy 🌌 button directly above Settings in the primary chat sidebar.
- **Direct In-Memory Mutation (0ms Latency):** Eliminated network HTTP roundtrips between the main window and sidecar. Toggles, sliders, and color pickers instantly mutate CSS styles and variables directly in client DOM with zero lag.
- **Dynamic Active Theme Auto-Sync:** Integrated real-time Antigravity window theme detection (`theme-light` vs `theme-dark`). The popup customizer automatically defaults to the active theme tab (Light or Dark) upon opening, powered by a reactive `MutationObserver`.
- **Pixel-Crisp Subpixel Typography (Anti AI-Slop Standard):** Removed destructive `backdrop-filter: blur(...)` and fractional GPU matrix scalings (`transform: scale(...)`). When open, the panel enforces `transform: none !important;` with `-webkit-font-smoothing: antialiased;` and Vazirmatn variable font for razor-sharp ClearType readability.
- **Stable 480px Fixed-Height Frame:** Replaced erratic tab-jumping heights with a balanced, rock-solid 480px fixed height frame across all 3 tabs, eliminating visual jitter during tab switching.
- **Interactive GitHub Star Badge Footer:** Replaced basic text link with a polished capsule badge featuring gold animated star SVG (`#f59e0b`), subtle hover elevation, and a minimalist `v3.0 Native` version pill.

### Fixed
- **Periodic 2.5s Reflow Flicker:** Replaced destructive periodic `Runtime.evaluate` stylesheet overwrites with a non-destructive DOM health check. If styles and buttons exist, the DOM is left untouched, permanently resolving shadow blinking and sidebar jumps.
- **Bidirectional Inversion Fix:** Enforced strict `direction: rtl` and `unicode-bidi: isolate` on panel labels, preventing parenthesis inversion (e.g. `(RTL)`) in Persian UI text.

---

## [2.0.10] - 2026-10-06

### Fixed
- **Code Editor Font Isolation:** Fixed unintended override where `rtl.js` forced Vazirmatn onto the entire IDE workbench (`body`, `.monaco-workbench`) and forced Cascadia Code onto `.monaco-editor .view-line`.
- **Chat-Only Typography Mandate:** Scoped `Vazirmatn` font exclusively to Chat, AI Assistant, Composer, Markdown responses, and prompt inputs (`.interactive-session`, `.chat-widget`, `.composer-rendered-message`, etc.).
- **Editor Settings Sanitization:** Removed forced `editor.fontFamily` and `editor.letterSpacing` overrides from workspace `.vscode/settings.json` and user `settings.json`, fully restoring native IDE code font and cursor alignment.
- **Extension Command Guard:** Patched `setupTypography` command in `ide-extension/extension.js` to ensure it never overrides `editor.fontFamily`.

### Added
- **Automated Deployment Pipeline:** Added `scripts/publish-ovsx.js` and `npm run publish:ovsx` script for zero-prompt, automated deployment to Open VSX Registry.
- **Companion Extension v1.0.4:** Released `omid-io.antigravity-rtl@1.0.4` to Open VSX Registry and built `antigravity-rtl-1.0.4.vsix`.

---

## [2.0.9] - 2026-09-30

### Fixed
- **UI & Styling Tab DOM Hierarchy Fix:** Resolved blank UI tab issue caused by missing closing `</div>` in `rtl-card` which nested `#rtl-view-ui` inside `#rtl-view-rtl`.
- **Zero-Scroll Ergonomics:** Verified perfect 520px height layout with zero scrollbars on both RTL and UI tabs.
- **Bin Path Normalization:** Normalized `package.json` executable `bin` field to bare-relative paths to satisfy npm 11 publish specifications.

---

## [2.0.8] - 2026-09-29

### Added
- **Production CLI Re-execution:** Direct physical global CLI re-execution via `npm root -g` and `process.execPath`.
- **Zero-Latency Network Termination:** `AbortController` cancellation for rapid CLI exits.
- **SemVer Dependency:** Formal `semver` npm dependency integration.

---

## [2.0.5] - 2026-09-28

### Added
- **Permanent Sidebar Docking:** Docked sidebar controls directly into native container layout.
- **Atomic Backup Hashes:** Full 64-character SHA-256 backup verification.

---

## [2.0.0] - 2026-09-27

### Added
- **Standalone Fork Launch:** Complete decoupling under MIT License as `antigravity-ui`.
- **UI & Theme Studio:** Real-time controls for line-height, font-size, preview badges, and dark/light themes.
- **Sidebar Resizer:** Dynamic workspace resizing (160px–420px).
- **IDE Companion Extension:** Integrated VS Code / Antigravity IDE companion extension with `Ctrl+Alt+R` toggle.
