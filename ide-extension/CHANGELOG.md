# 📋 Changelog — Antigravity RTL (IDE Extension)

All notable changes to the **Antigravity RTL** IDE companion extension are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.3] - 2026-10-06

### Added
- **Official Open VSX Changelog Asset:** Registered `extension/CHANGELOG.md` as an official `Microsoft.VisualStudio.Services.Content.Changelog` asset in VSIX manifest for native Changelog tab rendering on Open VSX Registry.

## [1.0.2] - 2026-10-06

### Fixed
- **Font Isolation (Chat Only):** Removed broad `body` and `.monaco-workbench` selectors that forced Vazirmatn onto the entire IDE UI.
- **Code Editor Immunity:** Removed `.monaco-editor .view-line` font override. The code editor now retains 100% native IDE code fonts without interference.
- **Command Safety:** Updated `antigravity-ui.setupTypography` command to notify the user rather than modifying `editor.fontFamily`.

### Added
- **Scoped Chat Selectors:** Explicitly scoped `Vazirmatn` font to `.interactive-session`, `.chat-widget`, `.chat-editor`, `.composer-rendered-message`, `.markdown-root`, and `.ui-prompt-input-editor__input`.
- **Monospace Code Inside Chat:** Preserved monospace font styling for code blocks and inline code within chat messages.

---

## [1.0.1] - 2026-09-27

### Added
- **Documentation:** Enriched extension README for Open VSX Registry compliance and showcase.
- **Icon:** Embedded official high-resolution extension icon.

---

## [1.0.0] - 2026-09-27

### Added
- **Initial Release:** Companion VSIX extension with `Ctrl+Alt+R` status bar toggle and markdown RTL preview.
