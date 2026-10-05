# 📋 Changelog — Antigravity UI

All notable changes to **Antigravity UI** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.10] - 2026-10-06

### Fixed
- **Code Editor Font Isolation:** Fixed unintended override where `rtl.js` forced Vazirmatn onto the entire IDE workbench (`body`, `.monaco-workbench`) and forced Cascadia Code onto `.monaco-editor .view-line`.
- **Chat-Only Typography Mandate:** Scoped `Vazirmatn` font exclusively to Chat, AI Assistant, Composer, Markdown responses, and prompt inputs (`.interactive-session`, `.chat-widget`, `.composer-rendered-message`, etc.).
- **Editor Settings Sanitization:** Removed forced `editor.fontFamily` and `editor.letterSpacing` overrides from workspace `.vscode/settings.json` and user `settings.json`, fully restoring native IDE code font and cursor alignment.
- **Extension Command Guard:** Patched `setupTypography` command in `ide-extension/extension.js` to ensure it never overrides `editor.fontFamily`.

### Added
- **Automated Open VSX Pipeline:** Added `scripts/publish-ovsx.js` and `npm run publish:ovsx` script for zero-prompt, automated deployment to Open VSX Registry.
- **Companion Extension v1.0.2:** Released `omid-io.antigravity-rtl@1.0.2` on Open VSX and built `antigravity-rtl-1.0.2.vsix`.

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
