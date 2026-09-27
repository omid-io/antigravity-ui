<div align="center">

# 🌌 Antigravity RTL

**First-class Persian, Arabic, and Multilingual (RTL/BiDi) typography & smart layout suite for Google Antigravity IDE, Cursor & VS Code.**

[![Open VSX](https://img.shields.io/open-vsx/v/omid-io/antigravity-rtl.svg?color=purple)](https://open-vsx.org/extension/omid-io/antigravity-rtl)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/omid-io/antigravity-ui/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/omid-io/antigravity-ui)

</div>

---

## ⚡ Overview

Working with Persian, Arabic, and bidirectional text in AI-powered IDEs often results in fragmented reading experiences: reversed punctuation, misplaced brackets, right-aligned code snippets, and awkward mixed English-Persian paragraphs.

**Antigravity RTL** solves this across the entire IDE environment. It delivers automatic paragraph-level language detection, seamless **Vazirmatn** typography, and strict Left-to-Right (LTR) isolation for code blocks, terminal outputs, and monospace elements.

---

## ✨ Features

### 1. 🧠 Smart BiDi Paragraph Engine
* **Automatic Language Detection:** Paragraphs containing Persian or Arabic characters are automatically aligned Right-to-Left (`dir="rtl"`).
* **Mixed-Text Integrity:** Punctuation marks, parentheses, and brackets stay in their natural reading order without flipping code or symbols.
* **Strict Code Isolation:** Blocks inside `<pre>`, `<code>`, inline backticks, Monaco editor instances, and terminals remain strictly Left-to-Right (`direction: ltr !important`) with clean monospace font fidelity.

### 2. 💬 Complete AI Workspace Coverage
* **AI Chat & Responses:** Smooth RTL rendering in chat messages (`.composer-rendered-message`).
* **Composer & Input Fields:** Native right-aligned input for Persian prompts and slash commands (`.aislash-editor-input`, `.ui-prompt-input-editor__input`).
* **Agent & Plan Panels:** Real-time RTL formatting across interactive agent execution steps and plan checklists (`.plan-editor`, `.ui-plan-editor`).
* **Markdown Previews & Tables:** Tables preserve LTR column order with bidirectional cell text support.

### 3. 🔤 Vazirmatn Typography Suite
* High-legibility Persian typography integrated across the workbench.
* Prioritizes local system fonts (`local('Vazirmatn')`) with zero-latency rendering, paired with a reliable CDN fallback.

### 4. 🎛️ 1-Click Status Bar & Hotkey
* **Shortcut:** Press `Ctrl+Alt+R` (macOS: `Cmd+Alt+R`) in any open file to instantly toggle direction on current line or selection.
* **Status Bar Item:** Click `$(arrow-both) RTL` in the bottom status bar for quick toggling.

### 5. 🛡️ Clean Reversible Lifecycle
* Built with an automated uninstaller (`uninstall.js`) wired to `"vscode:uninstall"`.
* When uninstalled or disabled, it automatically restores the original files from pristine backups—leaving zero orphaned patch scripts behind.

---

## ⌨️ Keyboard Shortcuts & Commands

| Command | Title | Shortcut | Scope |
| :--- | :--- | :--- | :--- |
| `antigravity-ui.toggleRtl` | **Toggle RTL / BiDi Marker** | `Ctrl+Alt+R` (`Cmd+Alt+R`) | Active Editor & Chat |
| `antigravity-ui.enable` | **Enable RTL & Typography** | Command Palette | Workbench & Electron Loader |
| `antigravity-ui.disable` | **Disable RTL & Restore** | Command Palette | Workbench & Electron Loader |
| `antigravity-ui.setupTypography` | **Configure Editor Typography** | Command Palette | Global Settings (`editor.fontFamily`) |

---

## 🚀 Installation

### Via Open VSX (Recommended)
Search for `Antigravity RTL` in the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`) in Antigravity IDE, Cursor, or VS Code, or install via terminal:
```bash
antigravity-ide --install-extension omid-io.antigravity-rtl
```

### Via VSIX File
Download `antigravity-rtl-1.0.1.vsix` from the [Latest GitHub Release](https://github.com/omid-io/antigravity-ui/releases/latest) and install directly:
```bash
antigravity-ide --install-extension antigravity-rtl-1.0.1.vsix
```

---

## 🇮🇷 راهنمای فارسی

افزونه **Antigravity RTL** راهکار جامع و بدون نقص برای راست چین سازی و بهینه سازی تایپوگرافی زبان فارسی در Antigravity IDE، محیط های کدنویسی مبتنی بر VS Code و Cursor است.

### امکانات کلیدی:
* **راست چین کاملا هوشمند:** بدون به هم ریختن چیدمان، متون فارسی را در چت، ایجنت، پنل Plan و ویرایشگر کد راست چین می کند.
* **ایزوله سازی قطعی کدها:** بلوک های کد، ترمینال و متن های انگلیسی کاملا چپ چین (LTR) و با فونت های برنامه نویسی باقی می مانند.
* **فونت وزیرمتن:** فعال سازی خودکار فونت استاندارد و زیبای وزیرمتن برای محیط رابط کاربری و چت.
* **کلید میانبر سریع:** با زدن کلید `Ctrl+Alt+R` (در مک: `Cmd+Alt+R`) می توانید جهت خط یا متن انتخابی را تغییر دهید.
* **حذف کاملا تمیز:** در صورت غیرفعال سازی یا حذف افزونه، تمام تنظیمات و فایل ها بدون بر جای ماندن فایل های اضافه به حالت اولیه بازمی گردند.

---

## 📄 License
Released under the [MIT License](https://github.com/omid-io/antigravity-ui/blob/main/LICENSE). Developed and maintained by [Omid Zaferi](https://github.com/omid-io).
