function generatePresetComponentVars(preset, isDark) {
  const p = (preset || 'none').toLowerCase();

  if (p === 'clay') {
    if (!isDark) {
      return `
        --code-card-bg: #f8fafc;
        --code-card-border: rgba(210, 224, 240, 0.9);
        --code-card-border-hover: rgba(147, 197, 253, 0.8);
        --code-card-radius: 16px;
        --code-card-shadow: 0 8px 20px rgba(166, 180, 200, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --code-header-bg: linear-gradient(180deg, #f0f6ff 0%, #e2ecfa 100%);
        --code-header-border: rgba(210, 224, 240, 0.9);
        --code-header-color: #2d3b55;
        --code-lang-color: #2d3b55;
        --code-lang-bg: #ffffff;
        --code-lang-border: rgba(210, 224, 240, 0.9);
        --code-btn-color: #2d3b55;
        --code-btn-hover-color: #1d4ed8;
        --code-btn-hover-bg: #ffffff;
        --review-bar-bg: linear-gradient(180deg, #f0f6ff 0%, #e2ecfa 100%);
        --review-bar-border: rgba(210, 224, 240, 0.9);
        --review-bar-shadow: 0 8px 20px rgba(166, 180, 200, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --review-btn-bg: #3b82f6;
        --review-btn-color: #ffffff;
        --review-btn-border: #2563eb;
        --review-btn-shadow: 0 4px 10px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        --review-btn-hover-bg: #2563eb;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #1d4ed8;
        --diff-list-bg: #ffffff;
        --table-bg: #ffffff;
        --table-border: rgba(210, 224, 240, 0.9);
        --table-radius: 14px;
        --table-shadow: 0 8px 20px rgba(166, 180, 200, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --table-th-bg: linear-gradient(180deg, #f0f6ff 0%, #e2ecfa 100%);
        --table-th-color: #1e293b;
        --table-th-border: rgba(210, 224, 240, 0.9);
        --table-tr-even-bg: rgba(240, 246, 255, 0.5);
        --table-tr-hover-bg: rgba(226, 238, 255, 0.7);
        --table-td-color: #1e293b;
        --table-td-border: rgba(230, 238, 248, 0.8);
        --artifact-card-bg: linear-gradient(180deg, #f8fafc 0%, #f0f6ff 100%);
        --artifact-card-border: rgba(210, 224, 240, 0.9);
        --artifact-card-border-hover: rgba(147, 197, 253, 0.9);
        --artifact-card-radius: 16px;
        --artifact-card-shadow: 0 8px 20px rgba(166, 180, 200, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --artifact-title-color: #0f172a;
        --artifact-summary-color: #475569;
        --titlebar-bg: #eaf0f8;
        --titlebar-border: rgba(210, 224, 240, 0.6);
        --titlebar-shadow: 0 2px 6px rgba(166, 180, 200, 0.15);
        --backdrop-blur: none;
        --sb-bg: #f8fafc;
        --sb-border: rgba(210, 224, 240, 0.85);
        --sb-radius: 18px;
        --sb-shadow: 8px 12px 28px rgba(166, 180, 200, 0.32), inset -4px -4px 8px rgba(210, 224, 240, 0.6), inset 4px 4px 8px rgba(255, 255, 255, 0.95);
        --sb-backdrop-blur: none;
        --sb-item-active-bg: linear-gradient(180deg, #f0f6ff 0%, #e2ecfa 100%);
        --sb-item-active-color: #1d4ed8;
        --sb-item-active-border: rgba(147, 197, 253, 0.7);
        --sb-btn-new-bg: #3b82f6;
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: #2563eb;
        --sb-btn-new-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        --sb-footer-bg: #f0f6ff;
      `;
    } else {
      return `
        --code-card-bg: linear-gradient(180deg, #182234 0%, #141b29 100%);
        --code-card-border: rgba(255, 255, 255, 0.08);
        --code-card-border-hover: rgba(147, 197, 253, 0.35);
        --code-card-radius: 16px;
        --code-card-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --code-header-bg: #1c273a;
        --code-header-border: rgba(255, 255, 255, 0.08);
        --code-header-color: #94a3b8;
        --code-lang-color: #93c5fd;
        --code-lang-bg: #1e2a40;
        --code-lang-border: rgba(255, 255, 255, 0.08);
        --code-btn-color: #cbd5e1;
        --code-btn-hover-color: #60a5fa;
        --code-btn-hover-bg: #263550;
        --review-bar-bg: linear-gradient(180deg, #182234 0%, #141b29 100%);
        --review-bar-border: rgba(255, 255, 255, 0.08);
        --review-bar-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --review-btn-bg: #2563eb;
        --review-btn-color: #ffffff;
        --review-btn-border: rgba(147, 197, 253, 0.3);
        --review-btn-shadow: 0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        --review-btn-hover-bg: #1d4ed8;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: rgba(147, 197, 253, 0.5);
        --diff-list-bg: #141b29;
        --table-bg: #101622;
        --table-border: rgba(255, 255, 255, 0.08);
        --table-radius: 14px;
        --table-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --table-th-bg: #182234;
        --table-th-color: #e2e8f0;
        --table-th-border: rgba(255, 255, 255, 0.08);
        --table-tr-even-bg: rgba(255, 255, 255, 0.02);
        --table-tr-hover-bg: rgba(59, 130, 246, 0.12);
        --table-td-color: #cbd5e1;
        --table-td-border: rgba(255, 255, 255, 0.06);
        --artifact-card-bg: linear-gradient(180deg, #182234 0%, #141b29 100%);
        --artifact-card-border: rgba(255, 255, 255, 0.08);
        --artifact-card-border-hover: rgba(147, 197, 253, 0.35);
        --artifact-card-radius: 16px;
        --artifact-card-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --artifact-title-color: #f1f5f9;
        --artifact-summary-color: #94a3b8;
        --titlebar-bg: #141b29;
        --titlebar-border: rgba(255, 255, 255, 0.06);
        --titlebar-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
        --backdrop-blur: none;
        --sb-bg: linear-gradient(180deg, #182234 0%, #141b29 100%);
        --sb-border: rgba(255, 255, 255, 0.08);
        --sb-radius: 18px;
        --sb-shadow: 10px 16px 36px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(10, 15, 25, 0.7), inset 4px 4px 8px rgba(255, 255, 255, 0.06);
        --sb-backdrop-blur: none;
        --sb-item-active-bg: rgba(59, 130, 246, 0.2);
        --sb-item-active-color: #93c5fd;
        --sb-item-active-border: rgba(147, 197, 253, 0.3);
        --sb-btn-new-bg: #2563eb;
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: rgba(147, 197, 253, 0.3);
        --sb-btn-new-shadow: 0 4px 14px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        --sb-footer-bg: #1c273a;
      `;
    }
  }

  if (p === '3d') {
    if (!isDark) {
      return `
        --code-card-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        --code-card-border: #94a3b8;
        --code-card-border-hover: #64748b;
        --code-card-radius: 14px;
        --code-card-shadow: 0 6px 0 #94a3b8, 0 14px 26px rgba(15, 23, 42, 0.16), inset 0 1.5px 0 #ffffff;
        --code-header-bg: linear-gradient(180deg, #f8fafc 0%, #e2ecfa 100%);
        --code-header-border: #cbd5e1;
        --code-lang-color: #0f172a;
        --code-lang-bg: #ffffff;
        --code-lang-border: #94a3b8;
        --code-btn-color: #1e293b;
        --code-btn-hover-color: #0f172a;
        --code-btn-hover-bg: #ffffff;
        --review-bar-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        --review-bar-border: #94a3b8;
        --review-bar-border-hover: #64748b;
        --review-card-radius: 14px;
        --review-bar-shadow: 0 6px 0 #94a3b8, 0 14px 24px rgba(15, 23, 42, 0.14), inset 0 1.5px 0 #ffffff;
        --review-btn-bg: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: #1e40af;
        --review-btn-shadow: 0 3px 0 #1e3a8a, 0 6px 12px rgba(29, 78, 216, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        --review-btn-hover-bg: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #172554;
        --diff-list-bg: #ffffff;
        --table-bg: #ffffff;
        --table-border: #94a3b8;
        --table-radius: 12px;
        --table-shadow: 0 6px 0 #94a3b8, 0 16px 28px rgba(15, 23, 42, 0.14), inset 0 1.5px 0 #ffffff;
        --table-th-bg: linear-gradient(180deg, #f8fafc 0%, #e2ecfa 100%);
        --table-th-color: #0f172a;
        --table-th-border: #cbd5e1;
        --table-tr-even-bg: #f8fafc;
        --table-tr-hover-bg: #e2e8f0;
        --table-td-color: #0f172a;
        --table-td-border: #e2e8f0;
        --artifact-card-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        --artifact-card-border: #94a3b8;
        --artifact-card-border-hover: #64748b;
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 6px 0 #94a3b8, 0 14px 26px rgba(15, 23, 42, 0.14), inset 0 1.5px 0 #ffffff;
        --artifact-title-color: #0f172a;
        --artifact-summary-color: #334155;
        --titlebar-bg: #ffffff;
        --titlebar-border: #cbd5e1;
        --titlebar-shadow: 0 3px 0 #cbd5e1, 0 6px 12px rgba(0, 0, 0, 0.04);
        --backdrop-blur: none;
        --sb-bg: #ffffff;
        --sb-border: #94a3b8;
        --sb-radius: 16px;
        --sb-shadow: 4px 4px 0 #94a3b8, 6px 10px 20px rgba(15, 23, 42, 0.12), inset 0 1.5px 0 #ffffff;
        --sb-backdrop-blur: none;
        --sb-item-active-bg: #f1f5f9;
        --sb-item-active-color: #0f172a;
        --sb-item-active-border: #94a3b8;
        --sb-btn-new-bg: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: #1e40af;
        --sb-btn-new-shadow: 0 3px 0 #1e3a8a, 0 6px 12px rgba(29, 78, 216, 0.3);
        --sb-footer-bg: #ffffff;
      `;
    } else {
      return `
        --code-card-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        --code-card-border: #334155;
        --code-card-border-hover: #475569;
        --code-card-radius: 14px;
        --code-card-shadow: 0 6px 0 #020617, 0 18px 32px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        --code-header-bg: linear-gradient(180deg, #334155 0%, #1e293b 100%);
        --code-header-border: #475569;
        --code-lang-color: #f1f5f9;
        --code-lang-bg: #0f172a;
        --code-lang-border: #334155;
        --code-btn-color: #cbd5e1;
        --code-btn-hover-color: #ffffff;
        --code-btn-hover-bg: #334155;
        --review-bar-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        --review-bar-border: #334155;
        --review-card-border-hover: #475569;
        --review-card-radius: 14px;
        --review-bar-shadow: 0 6px 0 #020617, 0 18px 32px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        --review-btn-bg: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: #1e40af;
        --review-btn-shadow: 0 3px 0 #020617, 0 6px 14px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        --review-btn-hover-bg: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #172554;
        --diff-list-bg: #0f172a;
        --table-bg: #0f172a;
        --table-border: #334155;
        --table-radius: 12px;
        --table-shadow: 0 6px 0 #020617, 0 18px 32px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        --table-th-bg: linear-gradient(180deg, #334155 0%, #1e293b 100%);
        --table-th-color: #f8fafc;
        --table-th-border: #475569;
        --table-tr-even-bg: rgba(255, 255, 255, 0.02);
        --table-tr-hover-bg: rgba(255, 255, 255, 0.06);
        --table-td-color: #e2e8f0;
        --table-td-border: rgba(255, 255, 255, 0.08);
        --artifact-card-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        --artifact-card-border: #334155;
        --artifact-card-border-hover: #475569;
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 6px 0 #020617, 0 18px 32px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        --artifact-title-color: #f1f5f9;
        --artifact-summary-color: #94a3b8;
        --titlebar-bg: #0f172a;
        --titlebar-border: #1e293b;
        --titlebar-shadow: 0 3px 0 #020617, 0 8px 16px rgba(0, 0, 0, 0.4);
        --backdrop-blur: none;
        --sb-bg: #0f172a;
        --sb-border: #334155;
        --sb-radius: 16px;
        --sb-shadow: 4px 4px 0 #020617, 8px 16px 30px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        --sb-backdrop-blur: none;
        --sb-item-active-bg: #1e293b;
        --sb-item-active-color: #f8fafc;
        --sb-item-active-border: #475569;
        --sb-btn-new-bg: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: #1e40af;
        --sb-btn-new-shadow: 0 3px 0 #020617, 0 6px 14px rgba(0, 0, 0, 0.5);
        --sb-footer-bg: #1e293b;
      `;
    }
  }

  if (p === 'glow') {
    if (!isDark) {
      return `
        --code-card-bg: #ffffff;
        --code-card-border: rgba(56, 189, 248, 0.6);
        --code-card-border-hover: rgba(56, 189, 248, 0.9);
        --code-card-radius: 14px;
        --code-card-shadow: 0 0 20px rgba(56, 189, 248, 0.2), 0 4px 12px rgba(14, 165, 233, 0.1);
        --code-header-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        --code-header-border: rgba(56, 189, 248, 0.3);
        --code-lang-color: #0284c7;
        --code-lang-bg: rgba(56, 189, 248, 0.12);
        --code-lang-border: rgba(56, 189, 248, 0.3);
        --code-btn-color: #0284c7;
        --code-btn-hover-color: #7c3aed;
        --code-btn-hover-bg: rgba(56, 189, 248, 0.12);
        --review-card-bg: #ffffff;
        --review-card-border: rgba(56, 189, 248, 0.6);
        --review-card-border-hover: rgba(56, 189, 248, 0.9);
        --review-card-radius: 14px;
        --review-card-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        --review-btn-bg: linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: transparent;
        --review-btn-shadow: 0 0 14px rgba(56, 189, 248, 0.5);
        --review-btn-hover-bg: linear-gradient(135deg, #0369a1 0%, #7c3aed 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: transparent;
        --diff-list-bg: #ffffff;
        --table-bg: #ffffff;
        --table-border: rgba(56, 189, 248, 0.4);
        --table-radius: 12px;
        --table-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
        --table-th-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        --table-th-color: #0284c7;
        --table-th-border: rgba(56, 189, 248, 0.3);
        --table-tr-even-bg: rgba(56, 189, 248, 0.03);
        --table-tr-hover-bg: rgba(56, 189, 248, 0.08);
        --table-td-color: #0f172a;
        --table-td-border: rgba(56, 189, 248, 0.15);
        --artifact-card-bg: #ffffff;
        --artifact-card-border: rgba(56, 189, 248, 0.45);
        --artifact-card-border-hover: rgba(56, 189, 248, 0.8);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 0 18px rgba(14, 165, 233, 0.18);
        --artifact-title-color: #0284c7;
        --artifact-summary-color: #334155;
        --titlebar-bg: #ffffff;
        --titlebar-border: rgba(99, 102, 241, 0.1);
        --titlebar-shadow: 0 2px 10px rgba(99, 102, 241, 0.05);
        --backdrop-blur: none;
        --sb-bg: #ffffff;
        --sb-border: rgba(56, 189, 248, 0.55);
        --sb-radius: 16px;
        --sb-shadow: 0 0 24px rgba(56, 189, 248, 0.22), 4px 8px 24px rgba(14, 165, 233, 0.1);
        --sb-backdrop-blur: none;
        --sb-item-active-bg: rgba(56, 189, 248, 0.12);
        --sb-item-active-color: #0284c7;
        --sb-item-active-border: rgba(56, 189, 248, 0.45);
        --sb-btn-new-bg: linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%);
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: transparent;
        --sb-btn-new-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
        --sb-footer-bg: rgba(56, 189, 248, 0.08);
      `;
    } else {
      return `
        --code-card-bg: rgba(10, 15, 26, 0.95);
        --code-card-border: rgba(56, 189, 248, 0.5);
        --code-card-border-hover: rgba(56, 189, 248, 0.8);
        --code-card-radius: 14px;
        --code-card-shadow: 0 0 24px rgba(56, 189, 248, 0.25), inset 0 1px 0 rgba(56, 189, 248, 0.25);
        --code-header-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
        --code-header-border: rgba(56, 189, 248, 0.3);
        --code-lang-color: #38bdf8;
        --code-lang-bg: rgba(56, 189, 248, 0.15);
        --code-lang-border: rgba(56, 189, 248, 0.35);
        --code-btn-color: #38bdf8;
        --code-btn-hover-color: #a78bfa;
        --code-btn-hover-bg: rgba(56, 189, 248, 0.18);
        --review-card-bg: rgba(10, 15, 26, 0.95);
        --review-card-border: rgba(56, 189, 248, 0.5);
        --review-card-border-hover: rgba(56, 189, 248, 0.8);
        --review-card-radius: 14px;
        --review-card-shadow: 0 0 22px rgba(56, 189, 248, 0.22);
        --review-btn-bg: linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: transparent;
        --review-btn-shadow: 0 0 16px rgba(56, 189, 248, 0.55);
        --review-btn-hover-bg: linear-gradient(135deg, #0369a1 0%, #7c3aed 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: transparent;
        --diff-list-bg: rgba(10, 15, 26, 0.95);
        --table-bg: rgba(10, 15, 26, 0.95);
        --table-border: rgba(56, 189, 248, 0.4);
        --table-radius: 12px;
        --table-shadow: 0 0 22px rgba(56, 189, 248, 0.2);
        --table-th-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.18) 0%, rgba(139, 92, 246, 0.18) 100%);
        --table-th-color: #38bdf8;
        --table-th-border: rgba(56, 189, 248, 0.3);
        --table-tr-even-bg: rgba(56, 189, 248, 0.04);
        --table-tr-hover-bg: rgba(56, 189, 248, 0.1);
        --table-td-color: #e2e8f0;
        --table-td-border: rgba(56, 189, 248, 0.18);
        --artifact-card-bg: rgba(10, 15, 26, 0.95);
        --artifact-card-border: rgba(56, 189, 248, 0.4);
        --artifact-card-border-hover: rgba(56, 189, 248, 0.7);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        --artifact-title-color: #38bdf8;
        --artifact-summary-color: #cbd5e1;
        --titlebar-bg: #090d16;
        --titlebar-border: rgba(99, 102, 241, 0.15);
        --titlebar-shadow: 0 2px 12px rgba(99, 102, 241, 0.12);
        --backdrop-blur: none;
        --sb-bg: rgba(10, 15, 26, 0.92);
        --sb-border: rgba(56, 189, 248, 0.45);
        --sb-radius: 16px;
        --sb-shadow: 0 0 28px rgba(56, 189, 248, 0.22), 6px 12px 32px rgba(0, 0, 0, 0.5);
        --sb-backdrop-blur: none;
        --sb-item-active-bg: rgba(56, 189, 248, 0.18);
        --sb-item-active-color: #38bdf8;
        --sb-item-active-border: rgba(56, 189, 248, 0.4);
        --sb-btn-new-bg: linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%);
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: transparent;
        --sb-btn-new-shadow: 0 0 18px rgba(56, 189, 248, 0.55);
        --sb-footer-bg: rgba(10, 15, 26, 0.95);
      `;
    }
  }

  if (p === 'soft') {
    if (!isDark) {
      return `
        --code-card-bg: rgba(255, 255, 255, 0.88);
        --code-card-border: rgba(226, 232, 240, 0.85);
        --code-card-border-hover: rgba(186, 215, 248, 1);
        --code-card-radius: 16px;
        --code-card-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --code-header-bg: rgba(248, 250, 252, 0.88);
        --code-header-border: rgba(226, 232, 240, 0.7);
        --code-header-color: #475569;
        --code-lang-color: #3b82f6;
        --code-lang-bg: rgba(59, 130, 246, 0.08);
        --code-lang-border: rgba(59, 130, 246, 0.2);
        --code-btn-color: #64748b;
        --code-btn-hover-color: #1e293b;
        --code-btn-hover-bg: rgba(0, 0, 0, 0.04);
        --review-bar-bg: rgba(255, 255, 255, 0.88);
        --review-bar-border: rgba(226, 232, 240, 0.85);
        --review-bar-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --review-btn-bg: rgba(255, 255, 255, 0.95);
        --review-btn-color: #1e293b;
        --review-btn-border: rgba(226, 232, 240, 0.95);
        --review-btn-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        --review-btn-hover-bg: #3b82f6;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #2563eb;
        --diff-list-bg: rgba(255, 255, 255, 0.95);
        --table-bg: rgba(255, 255, 255, 0.92);
        --table-border: rgba(226, 232, 240, 0.85);
        --table-radius: 12px;
        --table-shadow: 0 6px 20px -2px rgba(67, 105, 169, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --table-th-bg: linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 100%);
        --table-th-color: #334155;
        --table-th-border: rgba(226, 232, 240, 0.9);
        --table-tr-even-bg: rgba(248, 250, 252, 0.5);
        --table-tr-hover-bg: rgba(239, 246, 255, 0.7);
        --table-td-color: #1e293b;
        --table-td-border: rgba(241, 245, 249, 1);
        --artifact-card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.92) 100%);
        --artifact-card-border: rgba(226, 232, 240, 0.95);
        --artifact-card-border-hover: rgba(186, 215, 248, 1);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --artifact-title-color: #0f172a;
        --artifact-summary-color: #475569;
        --titlebar-bg: #ffffff;
        --titlebar-border: rgba(0, 0, 0, 0.04);
        --titlebar-shadow: 0 2px 8px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.01);
        --backdrop-blur: blur(12px);
        --sb-bg: rgba(255, 255, 255, 0.82);
        --sb-border: rgba(226, 232, 240, 0.85);
        --sb-radius: 16px;
        --sb-shadow: 4px 6px 24px -2px rgba(67, 105, 169, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95);
        --sb-backdrop-blur: blur(16px);
        --sb-item-active-bg: rgba(59, 130, 246, 0.1);
        --sb-item-active-color: #1d4ed8;
        --sb-item-active-border: rgba(59, 130, 246, 0.25);
        --sb-btn-new-bg: #2563eb;
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: #1d4ed8;
        --sb-btn-new-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        --sb-footer-bg: rgba(255, 255, 255, 0.65);
      `;
    } else {
      return `
        --code-card-bg: rgba(18, 24, 38, 0.85);
        --code-card-border: rgba(255, 255, 255, 0.1);
        --code-card-border-hover: rgba(147, 197, 253, 0.3);
        --code-card-radius: 16px;
        --code-card-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --code-header-bg: rgba(24, 32, 47, 0.85);
        --code-header-border: rgba(255, 255, 255, 0.08);
        --code-header-color: #94a3b8;
        --code-lang-color: #60a5fa;
        --code-lang-bg: rgba(59, 130, 246, 0.15);
        --code-lang-border: rgba(59, 130, 246, 0.25);
        --code-btn-color: #94a3b8;
        --code-btn-hover-color: #f8fafc;
        --code-btn-hover-bg: rgba(255, 255, 255, 0.06);
        --review-bar-bg: rgba(18, 24, 38, 0.85);
        --review-bar-border: rgba(255, 255, 255, 0.1);
        --review-bar-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --review-btn-bg: rgba(30, 41, 59, 0.95);
        --review-btn-color: #f8fafc;
        --review-btn-border: rgba(255, 255, 255, 0.12);
        --review-btn-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        --review-btn-hover-bg: #2563eb;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #3b82f6;
        --diff-list-bg: rgba(18, 24, 38, 0.85);
        --table-bg: rgba(18, 24, 38, 0.85);
        --table-border: rgba(255, 255, 255, 0.1);
        --table-radius: 12px;
        --table-shadow: 0 8px 26px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --table-th-bg: rgba(24, 32, 47, 0.9);
        --table-th-color: #cbd5e1;
        --table-th-border: rgba(255, 255, 255, 0.08);
        --table-tr-even-bg: rgba(255, 255, 255, 0.02);
        --table-tr-hover-bg: rgba(59, 130, 246, 0.1);
        --table-td-color: #cbd5e1;
        --table-td-border: rgba(255, 255, 255, 0.06);
        --artifact-card-bg: linear-gradient(135deg, rgba(20, 26, 40, 0.96) 0%, rgba(15, 20, 32, 0.92) 100%);
        --artifact-card-border: rgba(255, 255, 255, 0.1);
        --artifact-card-border-hover: rgba(147, 197, 253, 0.3);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --artifact-title-color: #f1f5f9;
        --artifact-summary-color: #94a3b8;
        --titlebar-bg: #12141a;
        --titlebar-border: rgba(255, 255, 255, 0.05);
        --titlebar-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        --backdrop-blur: blur(14px);
        --sb-bg: rgba(15, 23, 42, 0.75);
        --sb-border: rgba(255, 255, 255, 0.08);
        --sb-radius: 16px;
        --sb-shadow: 6px 12px 32px -4px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        --sb-backdrop-blur: blur(16px);
        --sb-item-active-bg: rgba(59, 130, 246, 0.2);
        --sb-item-active-color: #93c5fd;
        --sb-item-active-border: rgba(96, 165, 250, 0.35);
        --sb-btn-new-bg: #2563eb;
        --sb-btn-new-color: #ffffff;
        --sb-btn-new-border: rgba(96, 165, 250, 0.3);
        --sb-btn-new-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
        --sb-footer-bg: rgba(30, 41, 59, 0.65);
      `;
    }
  }

  // Default 'none' (Sleek Linear Minimal)
  if (!isDark) {
    return `
      --code-card-bg: #ffffff;
      --code-card-border: #e2e8f0;
      --code-card-border-hover: #cbd5e1;
      --code-card-radius: 10px;
      --code-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --code-header-bg: #f8fafc;
      --code-header-border: #e2e8f0;
      --code-header-color: #475569;
      --code-lang-color: #475569;
      --code-lang-bg: #f1f5f9;
      --code-lang-border: #e2e8f0;
      --code-btn-color: #64748b;
      --code-btn-hover-color: #0f172a;
      --code-btn-hover-bg: #f1f5f9;
      --review-bar-bg: #ffffff;
      --review-bar-border: #e2e8f0;
      --review-bar-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --review-btn-bg: #0f172a;
      --review-btn-color: #ffffff;
      --review-btn-border: #0f172a;
      --review-btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      --review-btn-hover-bg: #1e293b;
      --review-btn-hover-color: #ffffff;
      --review-btn-hover-border: #1e293b;
      --diff-list-bg: #ffffff;
      --table-bg: #ffffff;
      --table-border: #e2e8f0;
      --table-radius: 8px;
      --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --table-th-bg: #f8fafc;
      --table-th-color: #475569;
      --table-th-border: #e2e8f0;
      --table-tr-even-bg: #f8fafc;
      --table-tr-hover-bg: #f1f5f9;
      --table-td-color: #0f172a;
      --table-td-border: #f1f5f9;
      --artifact-card-bg: #ffffff;
      --artifact-card-border: #e2e8f0;
      --artifact-card-border-hover: #cbd5e1;
      --artifact-card-radius: 10px;
      --artifact-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --artifact-title-color: #0f172a;
      --artifact-summary-color: #475569;
      --titlebar-bg: #ffffff;
      --titlebar-border: #e2e8f0;
      --titlebar-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --backdrop-blur: none;
      --sb-bg: #ffffff;
      --sb-border: #e2e8f0;
      --sb-radius: 14px;
      --sb-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      --sb-backdrop-blur: none;
      --sb-item-active-bg: #f1f5f9;
      --sb-item-active-color: #0f172a;
      --sb-item-active-border: #cbd5e1;
      --sb-btn-new-bg: #0f172a;
      --sb-btn-new-color: #ffffff;
      --sb-btn-new-border: #0f172a;
      --sb-btn-new-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      --sb-footer-bg: #ffffff;
    `;
  } else {
    return `
      --code-card-bg: #14171f;
      --code-card-border: rgba(255, 255, 255, 0.08);
      --code-card-border-hover: rgba(255, 255, 255, 0.15);
      --code-card-radius: 10px;
      --code-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --code-header-bg: #1a1e27;
      --code-header-border: rgba(255, 255, 255, 0.08);
      --code-header-color: #94a3b8;
      --code-lang-color: #cbd5e1;
      --code-lang-bg: #222734;
      --code-lang-border: rgba(255, 255, 255, 0.08);
      --code-btn-color: #94a3b8;
      --code-btn-hover-color: #f1f5f9;
      --code-btn-hover-bg: #222734;
      --review-bar-bg: #14171f;
      --review-bar-border: rgba(255, 255, 255, 0.08);
      --review-bar-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --review-btn-bg: #2563eb;
      --review-btn-color: #ffffff;
      --review-btn-border: #2563eb;
      --review-btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      --review-btn-hover-bg: #1d4ed8;
      --review-btn-hover-color: #ffffff;
      --review-btn-hover-border: #1d4ed8;
      --diff-list-bg: #14171f;
      --table-bg: #14171f;
      --table-border: rgba(255, 255, 255, 0.08);
      --table-radius: 8px;
      --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --table-th-bg: #1a1e27;
      --table-th-color: #cbd5e1;
      --table-th-border: rgba(255, 255, 255, 0.08);
      --table-tr-even-bg: rgba(255, 255, 255, 0.02);
      --table-tr-hover-bg: rgba(255, 255, 255, 0.05);
      --table-td-color: #cbd5e1;
      --table-td-border: rgba(255, 255, 255, 0.05);
      --artifact-card-bg: #14171f;
      --artifact-card-border: rgba(255, 255, 255, 0.1);
      --artifact-card-border-hover: rgba(255, 255, 255, 0.18);
      --artifact-card-radius: 10px;
      --artifact-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --artifact-title-color: #f1f5f9;
      --artifact-summary-color: #94a3b8;
      --titlebar-bg: #0e1117;
      --titlebar-border: rgba(255, 255, 255, 0.06);
      --titlebar-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      --backdrop-blur: none;
      --sb-bg: #0f172a;
      --sb-border: #1e293b;
      --sb-radius: 14px;
      --sb-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      --sb-backdrop-blur: none;
      --sb-item-active-bg: #1e293b;
      --sb-item-active-color: #f8fafc;
      --sb-item-active-border: #334155;
      --sb-btn-new-bg: #3b82f6;
      --sb-btn-new-color: #ffffff;
      --sb-btn-new-border: #2563eb;
      --sb-btn-new-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      --sb-footer-bg: #1e293b;
    `;
  }
}

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { SidecarApp, Response } from 'sidecar_sdk';
import { generatePopupBundle } from './popup-engine.js';

// Immortal Sidecar Process Immunity (Zero-Crash Guarantee)
process.on('uncaughtException', (err) => {
  console.error('[antigravity-ui] Suppressed uncaughtException:', err?.stack || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[antigravity-ui] Suppressed unhandledRejection:', reason?.message || reason);
});

// Singleton Sidecar Process Guard (Eliminates Zombie Duplicates Permanently)
const SIDECAR_PID_FILE = join(tmpdir(), 'antigravity-ui-sidecar.pid');
try {
  if (existsSync(SIDECAR_PID_FILE)) {
    const oldPid = parseInt(readFileSync(SIDECAR_PID_FILE, 'utf8').trim(), 10);
    if (oldPid && oldPid !== process.pid) {
      try {
        process.kill(oldPid, 0);
        console.log(`[antigravity-ui] Terminating older zombie sidecar instance PID ${oldPid}`);
        process.kill(oldPid, 'SIGKILL');
      } catch (_) {}
    }
  }
  writeFileSync(SIDECAR_PID_FILE, String(process.pid), 'utf8');
} catch (_) {}

process.on('exit', () => {
  try {
    if (existsSync(SIDECAR_PID_FILE)) {
      const p = parseInt(readFileSync(SIDECAR_PID_FILE, 'utf8').trim(), 10);
      if (p === process.pid) unlinkSync(SIDECAR_PID_FILE);
    }
  } catch (_) {}
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
  if (type === 'none') return mode === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.05)' : '0 1px 4px rgba(0, 0, 0, 0.3)';
  if (mode === 'light') {
    switch (type) {
      case 'soft':
        return '0 -2px 8px rgba(67, 105, 169, 0.045), 0 12px 30px rgba(67, 105, 169, 0.11), 0 3px 8px rgba(64, 101, 163, 0.05), inset 0 1.5px 0 rgba(255,255,255,0.99), inset 0 -1px 0 rgba(117,158,222,0.12), inset 1px 0 0 rgba(255,255,255,0.58), inset -1px 0 0 rgba(109,151,219,0.08)';
      case '3d':
      case 'medium':
        return '0 6px 0 #94a3b8, 0 14px 28px -2px rgba(15, 23, 42, 0.2), inset 0 2px 0 #ffffff';
      case 'glow':
        return `0 0 0 1.5px ${borderCol}, 0 0 20px 2px ${borderCol}66, 0 2px 6px ${borderCol}40`;
      case 'clay':
        return '0 16px 32px -4px rgba(70, 95, 140, 0.2), 0 6px 14px -2px rgba(70, 95, 140, 0.1), inset 3.5px 3.5px 6px rgba(255, 255, 255, 0.95), inset -3.5px -3.5px 7px rgba(70, 95, 140, 0.12)';
      default:
        return 'none';
    }
  } else {
    switch (type) {
      case 'soft':
        return '0 -2px 8px rgba(0, 0, 0, 0.18), 0 12px 30px rgba(0, 0, 0, 0.42), 0 3px 8px rgba(0, 0, 0, 0.22), inset 0 1.5px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.5)';
      case '3d':
      case 'medium':
        return '0 6px 0 #020617, 0 18px 34px -2px rgba(0, 0, 0, 0.9), inset 0 1.5px 0 rgba(255, 255, 255, 0.18)';
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

  const isLightClay = userMsgLight.shadow === 'clay';
  const isDarkClay = userMsgDark.shadow === 'clay';
  const isLightSoft = userMsgLight.shadow === 'soft';
  const isDarkSoft = userMsgDark.shadow === 'soft';
  const isLight3D = userMsgLight.shadow === '3d';
  const isDark3D = userMsgDark.shadow === '3d';
  const isLightGlow = userMsgLight.shadow === 'glow';
  const isDarkGlow = userMsgDark.shadow === 'glow';

  const lightPresetName = (userMsgLight.preset || userMsgLight.shadow || 'none').toLowerCase();
  const darkPresetName = (userMsgDark.preset || userMsgDark.shadow || 'none').toLowerCase();
  const lightComponentVars = generatePresetComponentVars(lightPresetName, false);
  const darkComponentVars = generatePresetComponentVars(darkPresetName, true);

  const lightBg = isLightClay ? 'linear-gradient(145deg, #f0f6ff 0%, #e2ecfa 100%)' :
                  (isLightSoft ? 'linear-gradient(112deg, rgba(255,255,255,0.97) 0%, rgba(249,252,255,0.96) 20%, rgba(236,244,255,0.94) 58%, rgba(222,235,255,0.95) 100%)' :
                  (isLight3D ? 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)' :
                  (isLightGlow ? '#ffffff' : userMsgLight.bg)));

  const lightText = isLightClay ? '#0f172a' : (isLightSoft ? '#243a59' : (isLight3D ? '#0f172a' : userMsgLight.text));

  const lightBorder = isLightClay ? 'rgba(255, 255, 255, 0.95)' :
                      (isLightSoft ? 'rgba(255, 255, 255, 0.96)' :
                      (isLight3D ? '#94a3b8' :
                      (isLightGlow ? 'rgba(56, 189, 248, 0.8)' : userMsgLight.border)));

  const lightBorderWidth = (isLightClay || isLight3D || isLightGlow) ? '1.5' : (userMsgLight.borderWidth || '1');
  const lightBorderRadius = (userMsgLight && userMsgLight.borderRadius) || '14';

  const darkBg = isDarkClay ? 'linear-gradient(145deg, #1e2638 0%, #141b29 100%)' :
                 (isDarkSoft ? 'linear-gradient(112deg, rgba(30, 41, 59, 0.95) 0%, rgba(23, 32, 48, 0.93) 50%, rgba(15, 23, 42, 0.92) 100%)' :
                 (isDark3D ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' :
                 (isDarkGlow ? '#0b101b' : userMsgDark.bg)));

  const darkText = isDarkClay ? '#f8fafc' : (isDarkSoft ? '#e2e8f0' : (isDark3D ? '#f8fafc' : userMsgDark.text));

  const darkBorder = isDarkClay ? 'rgba(147, 197, 253, 0.24)' :
                     (isDarkSoft ? 'rgba(255, 255, 255, 0.16)' :
                     (isDark3D ? '#334155' :
                     (isDarkGlow ? 'rgba(56, 189, 248, 0.8)' : userMsgDark.border)));

  const darkBorderWidth = (isDarkClay || isDark3D || isDarkGlow) ? '1.5' : (userMsgDark.borderWidth || '1');
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

    let softGlassRules = '';

  if (isLightSoft) {
    softGlassRules += `
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] > .w-full > div > .bg-card,
      .theme-light [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
      .theme-light [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
      .theme-light [data-testid="user-input-step"] > .w-full > div > .bg-card {
        isolation: isolate !important;
        backdrop-filter: blur(20px) saturate(155%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(155%) !important;
        transform: translateZ(0) !important;
        overflow: hidden !important;
      }
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      .theme-light [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      .theme-light [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      .theme-light [data-testid="user-input-step"] > .w-full > div > .bg-card::before {
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
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] > .w-full > div > .bg-card::after,
      .theme-light [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      .theme-light [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      .theme-light [data-testid="user-input-step"] > .w-full > div > .bg-card::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        background: radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.7), transparent 37%), radial-gradient(ellipse at 100% 100%, rgba(106,157,247,0.15), transparent 42%), linear-gradient(120deg, transparent 28%, rgba(255,255,255,0.2) 49%, transparent 68%) !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.24), inset 0 -7px 16px rgba(126,166,228,0.055) !important;
      }
      .theme-light [data-testid="user-input-step"] [data-quotable="true"],
      .theme-light [data-testid="user-input-step"] .whitespace-pre-wrap {
        text-shadow: 0 1px 0 rgba(255,255,255,0.9) !important;
      }
    `;
  } else {
    softGlassRules += `
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body:not(.theme-dark):not(.dark) [data-testid="user-input-step"] > .w-full > div > .bg-card::after,
      .theme-light [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      .theme-light [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      .theme-light [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      .theme-light [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      .theme-light [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      .theme-light [data-testid="user-input-step"] > .w-full > div > .bg-card::after {
        content: none !important;
        display: none !important;
      }
    `;
  }

  if (isDarkSoft) {
    softGlassRules += `
      body.theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
      body.theme-dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
      body.theme-dark [data-testid="user-input-step"] > .w-full > div > .bg-card,
      body.dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div,
      body.dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container),
      body.dark [data-testid="user-input-step"] > .w-full > div > .bg-card {
        isolation: isolate !important;
        backdrop-filter: blur(20px) saturate(155%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(155%) !important;
        transform: translateZ(0) !important;
        overflow: hidden !important;
      }
      body.theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body.theme-dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body.theme-dark [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      body.dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body.dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body.dark [data-testid="user-input-step"] > .w-full > div > .bg-card::before {
        content: "" !important;
        position: absolute !important;
        z-index: 0 !important;
        pointer-events: none !important;
        top: 1px !important;
        left: 2% !important;
        right: 2% !important;
        height: 52% !important;
        border-radius: 12px 12px 48% 48% / 10px 10px 36% 36% !important;
        background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 100%) !important;
        filter: blur(0.25px) !important;
      }
      body.theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body.theme-dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body.theme-dark [data-testid="user-input-step"] > .w-full > div > .bg-card::after,
      body.dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body.dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body.dark [data-testid="user-input-step"] > .w-full > div > .bg-card::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        background: radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.15), transparent 37%), radial-gradient(ellipse at 100% 100%, rgba(59,130,246,0.12), transparent 42%), linear-gradient(120deg, transparent 28%, rgba(255,255,255,0.08) 49%, transparent 68%) !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 -7px 16px rgba(0,0,0,0.3) !important;
      }
    `;
  } else {
    softGlassRules += `
      body.theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body.theme-dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body.theme-dark [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      body.theme-dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body.theme-dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body.theme-dark [data-testid="user-input-step"] > .w-full > div > .bg-card::after,
      body.dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::before,
      body.dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::before,
      body.dark [data-testid="user-input-step"] > .w-full > div > .bg-card::before,
      body.dark [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > div::after,
      body.dark [data-testid="user-input-step"] .bg-card:not(.user-input-buttons-container)::after,
      body.dark [data-testid="user-input-step"] > .w-full > div > .bg-card::after {
        content: none !important;
        display: none !important;
      }
    `;
  }

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

    ${softGlassRules}

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

    /* Hover Action Toolbar Padding & Collision Prevention */
    [data-testid="user-input-step"] [data-quotable="true"],
    [data-testid="user-input-step"] .whitespace-pre-wrap {
      padding-right: 74px !important;
    }

    /* Harmonized Action Toolbar */
    [data-testid="user-input-step"] .user-input-buttons-container {
      background: var(--user-msg-bg) !important;
      border: 1px solid var(--user-msg-border-color) !important;
      box-shadow: 0 0 16px 6px rgba(0, 0, 0, 0.15) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      z-index: 10 !important;
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

  const lightInputBg = isLightClay ? 'linear-gradient(145deg, #f0f6ff 0%, #e2ecfa 100%)' :
                       (isLightSoft ? 'rgba(255, 255, 255, 0.92)' :
                       (isLight3D ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' :
                       (isLightGlow ? '#ffffff' : 'transparent')));

  const darkInputBg = isDarkClay ? 'linear-gradient(145deg, #1e2638 0%, #141b29 100%)' :
                      (isDarkSoft ? 'rgba(24, 32, 47, 0.88)' :
                      (isDark3D ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' :
                      (isDarkGlow ? '#0b101b' : 'transparent')));

  const lightInputBorder = isLightClay ? 'rgba(255, 255, 255, 0.95)' :
                           (isLightSoft ? 'rgba(255, 255, 255, 0.96)' :
                           (isLight3D ? '#94a3b8' :
                           (isLightGlow ? 'rgba(56, 189, 248, 0.8)' : lightBorder)));

  const darkInputBorder = isDarkClay ? 'rgba(147, 197, 253, 0.24)' :
                          (isDarkSoft ? 'rgba(255, 255, 255, 0.14)' :
                          (isDark3D ? '#334155' :
                          (isDarkGlow ? 'rgba(56, 189, 248, 0.8)' : darkBorder)));

  const lightInputShadow = isLightClay ? lightShadow :
                           (isLightSoft ? '0 10px 28px rgba(67, 105, 169, 0.10), 0 2px 6px rgba(64, 101, 163, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)' :
                           (isLight3D ? '0 5px 0 #cbd5e1, 0 12px 24px rgba(15, 23, 42, 0.12), inset 0 1.5px 0 #ffffff' :
                           (isLightGlow ? '0 0 0 1.5px rgba(56, 189, 248, 0.6), 0 0 20px rgba(56, 189, 248, 0.2)' :
                           (userMsgLight.shadow === 'none' ? 'none' : lightShadow))));

  const darkInputShadow = isDarkClay ? darkShadow :
                          (isDarkSoft ? '0 10px 28px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)' :
                          (isDark3D ? '0 5px 0 #020617, 0 14px 28px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)' :
                          (isDarkGlow ? '0 0 0 1.5px rgba(56, 189, 248, 0.6), 0 0 25px rgba(56, 189, 248, 0.3)' :
                          (userMsgDark.shadow === 'none' ? 'none' : darkShadow))));

  const inputBoxCSS = inputBoxEnabled ? `
    :root, body, body.light, body.theme-light {
      --input-box-bg: ${lightInputBg};
      --input-box-border-color: ${lightInputBorder};
      --input-box-border-width: ${isLightSoft ? '1' : lightBorderWidth}px;
      --input-box-shadow: ${lightInputShadow};
      --input-box-radius: 18px;
    }
    body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
      --input-box-bg: ${darkInputBg};
      --input-box-border-color: ${darkInputBorder};
      --input-box-border-width: ${isDarkSoft ? '1' : darkBorderWidth}px;
      --input-box-shadow: ${darkInputShadow};
      --input-box-radius: 18px;
    }
    [id="antigravity.agentSidePanelInputBox"], [id*="agentSidePanelInputBox"] {
      border: var(--input-box-border-width) solid var(--input-box-border-color) !important;
      box-shadow: var(--input-box-shadow) !important;
      background: var(--input-box-bg) !important;
      border-radius: var(--input-box-radius, 18px) !important;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
      transform: none !important;
    }
    [id="antigravity.agentSidePanelInputBox"] .bg-card, 
    [id*="agentSidePanelInputBox"] .bg-card {
      background: transparent !important;
    }
    [id="antigravity.agentSidePanelInputBox"]:hover, 
    [id*="agentSidePanelInputBox"]:hover {
      transform: none !important;
    }
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

      /* Antigravity Logo & Sidebar Top Actions Harmonious Spacing */
      div.flex.items-center:has(> button[data-testid="app-icon-new-conversation-button"]) {
        padding-left: 4px !important;
        gap: 8px !important;
      }
      button[data-testid="app-icon-new-conversation-button"] {
        padding: 0 2px !important;
        margin-right: 4px !important;
        flex-shrink: 0 !important;
      }

      /* Compact Sidebar Resizer Support */
      div:has(> div > [role="navigation"][aria-label="Sidebar"]),
      div:has(> [role="navigation"][aria-label="Sidebar"]) {
        min-width: 0 !important;
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

      /* Modern Translucent Blockquote / Callout Card */
      blockquote,
      .prose blockquote,
      [data-testid="chat-message"] blockquote,
      .markdown-body blockquote {
        background: rgba(59, 130, 246, 0.05) !important;
        border: none !important;
        border-inline-start: 3.5px solid var(--accent, #3b82f6) !important;
        border-radius: 0 10px 10px 0 !important;
        padding: 10px 16px !important;
        margin: 12px 0 !important;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02) !important;
        backdrop-filter: blur(6px) !important;
        -webkit-backdrop-filter: blur(6px) !important;
        color: inherit !important;
        transition: background-color 0.2s ease, border-color 0.2s ease !important;
      }
      .theme-dark blockquote,
      .theme-dark .prose blockquote,
      .theme-dark [data-testid="chat-message"] blockquote,
      .dark blockquote {
        background: rgba(59, 130, 246, 0.1) !important;
        border-inline-start-color: #60a5fa !important;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2) !important;
      }
      [dir="rtl"] blockquote,
      blockquote:dir(rtl) {
        border-radius: 10px 0 0 10px !important;
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

      /* Pure CSS Compact Sidebar Architecture (160px) */
      ${c.compactSidebar !== false ? `
        :root {
          --compact-sidebar-width: ${(parseInt(c.sidebarWidth, 10) >= 160 && parseInt(c.sidebarWidth, 10) <= 450) ? parseInt(c.sidebarWidth, 10) : 200}px;
        }
        body:has([aria-label*="Sidebar"][aria-expanded="true"]) [style*="--sidebar-width"] {
          --sidebar-width: var(--compact-sidebar-width, 200px) !important;
        }
        body:has([aria-label*="Sidebar"][aria-expanded="true"]) div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) {
          width: var(--compact-sidebar-width, 200px) !important;
        }
        div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) > div {
          width: 100% !important;
        }
      ` : ''}

      /* Responsive Fluid Top Toolbar & Icons - Tied to Sidebar Architecture (Only when expanded) */
      ${(c.floatingSidebar !== false || c.compactSidebar !== false) ? `
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]),
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) {
          top: ${c.floatingSidebar !== false ? '10px' : '0px'} !important;
          left: ${c.floatingSidebar !== false ? '10px' : '0px'} !important;
          padding-left: 6px !important;
          padding-top: 4px !important;
          padding-right: 6px !important;
          width: calc(var(--sidebar-width, 256px) - ${c.floatingSidebar !== false ? '20px' : '8px'}) !important;
          max-width: calc(var(--sidebar-width, 256px) - ${c.floatingSidebar !== false ? '20px' : '8px'}) !important;
          box-sizing: border-box !important;
          z-index: 35 !important;
        }

        /* Toolbar direct container */
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) > div,
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) > div {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          padding: 0 !important;
          gap: 6px !important;
        }

        /* Antigravity Logo - Standard native size, zero shrinking */
        button[data-testid="app-icon-new-conversation-button"] {
          padding: 0 !important;
          margin: 0 !important;
          width: 24px !important;
          height: 28px !important;
          flex-shrink: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        button[data-testid="app-icon-new-conversation-button"] svg {
          width: 24px !important;
          height: 24px !important;
          fill: currentColor !important;
        }
        .theme-dark button[data-testid="app-icon-new-conversation-button"] svg,
        .dark button[data-testid="app-icon-new-conversation-button"] svg {
          fill: #f8fafc !important;
        }

        /* Action Buttons Container (Toggle, Back/Forward, Search) */
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) > div > div.flex.items-center,
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) > div > div.flex.items-center {
          display: flex !important;
          align-items: center !important;
          flex: 1 !important;
          min-width: 0 !important;
          gap: clamp(1px, calc((var(--sidebar-width, 256px) - 160px) / 12), 6px) !important;
          justify-content: flex-start !important;
        }

        /* Back / Forward inner pair */
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) div.flex.items-center.gap-1,
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) div.flex.items-center.gap-1 {
          display: flex !important;
          align-items: center !important;
          gap: clamp(1px, calc((var(--sidebar-width, 256px) - 160px) / 20), 4px) !important;
        }

        /* Search icon */
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) button[data-testid="sidebar-search-button"],
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) button[data-testid="sidebar-search-button"] {
          flex-shrink: 0 !important;
          margin-left: auto !important;
        }

        /* Action Buttons - Standard native size, zero shrinking */
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) button:not([data-testid="app-icon-new-conversation-button"]),
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) button:not([data-testid="app-icon-new-conversation-button"]) {
          width: 26px !important;
          height: 26px !important;
          flex-shrink: 0 !important;
          padding: 0 !important;
        }
        div.absolute.left-0.top-0:has(button[aria-label*="Sidebar"][aria-expanded="true"]) button:not([data-testid="app-icon-new-conversation-button"]) svg,
        div.absolute.left-0.top-0:has(button[data-testid="sidebar-toggle"][aria-expanded="true"]) button:not([data-testid="app-icon-new-conversation-button"]) svg {
          width: 18px !important;
          height: 18px !important;
        }
      ` : ''}

      ${userMsgCSS}
      ${inputBoxCSS}

      /* ========================================================
         PRESET-ADAPTIVE CHAT COMPONENTS & SYSTEM ARCHITECTURE
         ======================================================== */
      :root, body, body.light, body.theme-light {
        ${lightComponentVars}
      }
      body.dark, body.theme-dark, body.dark-theme, body.vscode-dark, :root.dark, .dark {
        ${darkComponentVars}
      }

      /* --- 1. CODE BLOCKS --- */
      pre > div.rounded-xl.bg-muted.border,
      pre > div[node].rounded-xl {
        background: var(--code-card-bg) !important;
        border: 1px solid var(--code-card-border) !important;
        border-radius: var(--code-card-radius, 14px) !important;
        box-shadow: var(--code-card-shadow) !important;
        overflow: hidden !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        margin: 12px 0 !important;
        backdrop-filter: var(--backdrop-blur, none) !important;
        -webkit-backdrop-filter: var(--backdrop-blur, none) !important;
      }
      pre > div.rounded-xl.bg-muted.border:hover,
      pre > div[node].rounded-xl:hover {
        border-color: var(--code-card-border-hover) !important;
      }
      pre > div.rounded-xl > div:first-child {
        min-height: 34px !important;
        background: var(--code-header-bg) !important;
        border-bottom: 1px solid var(--code-header-border) !important;
        padding: 4px 12px !important;
        border-top-left-radius: calc(var(--code-card-radius, 14px) - 2px) !important;
        border-top-right-radius: calc(var(--code-card-radius, 14px) - 2px) !important;
      }
      pre > div.rounded-xl > div:first-child > div.font-sans {
        font-size: 11px !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.06em !important;
        color: var(--code-lang-color) !important;
        background: var(--code-lang-bg) !important;
        border: 1px solid var(--code-lang-border) !important;
        padding: 2px 8px !important;
        border-radius: 6px !important;
        display: inline-flex !important;
        align-items: center !important;
      }
      pre > div.rounded-xl > div:first-child button {
        padding: 4px 6px !important;
        border-radius: 6px !important;
        color: var(--code-btn-color) !important;
        opacity: 0.8 !important;
        transition: all 0.15s ease !important;
      }
      pre > div.rounded-xl > div:first-child button:hover {
        opacity: 1 !important;
        color: var(--code-btn-hover-color) !important;
        background: var(--code-btn-hover-bg) !important;
        transform: translateY(-1px) !important;
      }
      pre > div.rounded-xl > div.p-3 {
        padding: 14px 16px !important;
        font-size: 12.5px !important;
        line-height: 1.65 !important;
      }

      /* --- 2. INLINE CODE PILLS --- */
      :not(pre) > code {
        background: rgba(0, 0, 0, 0.05) !important;
        border: 1px solid rgba(0, 0, 0, 0.07) !important;
        color: var(--code-lang-color, inherit) !important;
        padding: 2px 6px !important;
        border-radius: 6px !important;
        font-size: 0.88em !important;
        font-family: ${appCodeStack} !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;
      }
      .theme-dark :not(pre) > code {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #f1f5f9 !important;
      }

      /* --- 3. REVIEW & FILES CHANGED BAR --- */
      .files-changed-header {
        background: var(--review-card-bg) !important;
        border: 1px solid var(--review-card-border) !important;
        border-radius: var(--review-card-radius, 14px) !important;
        padding: 8px 14px !important;
        box-shadow: var(--review-card-shadow) !important;
        backdrop-filter: var(--backdrop-blur, none) !important;
        -webkit-backdrop-filter: var(--backdrop-blur, none) !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        margin: 8px 0 !important;
      }
      .files-changed-header:hover {
        border-color: var(--review-card-border-hover) !important;
      }
      .files-changed-header .text-green-500 {
        background: rgba(34, 197, 94, 0.12) !important;
        color: #16a34a !important;
        padding: 1.5px 8px !important;
        border-radius: 9999px !important;
        font-weight: 600 !important;
        font-size: 11.5px !important;
        border: 1px solid rgba(34, 197, 94, 0.22) !important;
        margin-right: 2px !important;
      }
      .files-changed-header .text-red-500 {
        background: rgba(239, 68, 68, 0.12) !important;
        color: #dc2626 !important;
        padding: 1.5px 8px !important;
        border-radius: 9999px !important;
        font-weight: 600 !important;
        font-size: 11.5px !important;
        border: 1px solid rgba(239, 68, 68, 0.22) !important;
      }
      .review-button {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: var(--review-btn-bg) !important;
        color: var(--review-btn-color) !important;
        border: 1px solid var(--review-btn-border) !important;
        border-radius: 9999px !important;
        padding: 4px 12px 4px 10px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        letter-spacing: -0.01em !important;
        box-shadow: var(--review-btn-shadow) !important;
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
        cursor: pointer !important;
      }
      .review-button:hover {
        background: var(--review-btn-hover-bg) !important;
        color: var(--review-btn-hover-color) !important;
        border-color: var(--review-btn-hover-border) !important;
        transform: translateY(-1px) !important;
      }
      .review-button:active {
        transform: translateY(0.5px) !important;
      }
      .review-button svg {
        opacity: 0.85 !important;
        transition: transform 0.18s ease, color 0.18s ease !important;
      }
      .review-button:hover svg {
        opacity: 1 !important;
        color: var(--review-btn-hover-color) !important;
        transform: scale(1.08) !important;
      }
      .files-changed-header + div > div.border-card-border {
        border-radius: 0 0 var(--review-card-radius, 14px) var(--review-card-radius, 14px) !important;
        background: var(--diff-list-bg) !important;
        border-color: var(--review-card-border) !important;
        box-shadow: var(--review-card-shadow) !important;
      }

      /* --- 4. MARKDOWN TABLES --- */
      div.md-table-scroll,
      div:has(> table),
      div[data-md-table] {
        border-radius: var(--table-radius, 12px) !important;
        border: 1px solid var(--table-border) !important;
        box-shadow: var(--table-shadow) !important;
        overflow: hidden !important;
        margin: 14px 0 !important;
        background: var(--table-bg) !important;
        backdrop-filter: var(--backdrop-blur, none) !important;
        -webkit-backdrop-filter: var(--backdrop-blur, none) !important;
      }
      table, table.min-w-full {
        width: 100% !important;
        border-collapse: separate !important;
        border-spacing: 0 !important;
        font-size: 13px !important;
        text-align: right !important;
      }
      table thead th, div[data-md-table] thead th {
        background: var(--table-th-bg) !important;
        color: var(--table-th-color) !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        letter-spacing: 0.02em !important;
        padding: 10px 14px !important;
        border-bottom: 1px solid var(--table-th-border) !important;
        border-left: 1px solid rgba(226, 232, 240, 0.4) !important;
        white-space: nowrap !important;
      }
      table thead th:last-child, div[data-md-table] thead th:last-child {
        border-left: none !important;
      }
      table tbody tr, div[data-md-table] tbody tr {
        transition: background-color 0.15s ease !important;
      }
      table tbody tr:nth-child(even), div[data-md-table] tbody tr:nth-child(even) {
        background: var(--table-tr-even-bg) !important;
      }
      table tbody tr:hover, div[data-md-table] tbody tr:hover {
        background: var(--table-tr-hover-bg) !important;
      }
      table tbody td, div[data-md-table] tbody td {
        padding: 10px 14px !important;
        color: var(--table-td-color) !important;
        border-bottom: 1px solid var(--table-td-border) !important;
        border-left: 1px solid rgba(226, 232, 240, 0.3) !important;
        line-height: 1.5 !important;
      }
      table tbody tr:last-child td, div[data-md-table] tbody tr:last-child td {
        border-bottom: none !important;
      }
      table tbody td:last-child, div[data-md-table] tbody td:last-child {
        border-left: none !important;
      }

      /* --- 5. ARTIFACT CARDS --- */
      .artifact-card {
        background: var(--artifact-card-bg) !important;
        border: 1px solid var(--artifact-card-border) !important;
        border-radius: var(--artifact-card-radius, 14px) !important;
        padding: 10px 14px !important;
        box-shadow: var(--artifact-card-shadow) !important;
        backdrop-filter: var(--backdrop-blur, none) !important;
        -webkit-backdrop-filter: var(--backdrop-blur, none) !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        margin: 6px 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .artifact-card:hover {
        border-color: var(--artifact-card-border-hover) !important;
        transform: translateY(-0.5px) !important;
      }
      .artifact-card > button {
        background: rgba(0, 0, 0, 0.04) !important;
        border: 1px solid rgba(0, 0, 0, 0.06) !important;
        border-radius: 8px !important;
        padding: 3px 8px !important;
        font-weight: 600 !important;
        font-size: 12.5px !important;
        color: var(--artifact-title-color) !important;
        transition: all 0.15s ease !important;
      }
      .theme-dark .artifact-card > button {
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
      }
      .artifact-card .line-clamp-3,
      .artifact-card > span:last-child {
        width: 100% !important;
        unicode-bidi: plaintext !important;
        text-align: start !important;
        line-height: 1.6 !important;
        font-size: 12.5px !important;
        color: var(--artifact-summary-color) !important;
      }
      .artifact-card .line-clamp-3:dir(rtl),
      .artifact-card[dir="rtl"] .line-clamp-3,
      [dir="rtl"] .artifact-card .line-clamp-3 {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: isolate !important;
      }

      /* --- 6. TOP WINDOW TITLEBAR --- */
      div.shrink-0:has(> [data-testid="title-menu-bar"]),
      [data-testid="title-menu-bar"] {
        position: relative !important;
        z-index: 100 !important;
        background: var(--titlebar-bg) !important;
        border-bottom: 1px solid var(--titlebar-border) !important;
        box-shadow: var(--titlebar-shadow) !important;
        transition: background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
      }
      [data-testid="title-menu-bar"] button {
        border-radius: 6px !important;
        font-size: 12px !important;
        padding: 3px 8px !important;
        transition: all 0.15s ease !important;
      }
      [data-testid="title-menu-bar"] button:hover {
        background: rgba(0, 0, 0, 0.05) !important;
        color: #0f172a !important;
      }
      .theme-dark [data-testid="title-menu-bar"] button:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #f8fafc !important;
      }
      [data-radix-popper-content-wrapper],
      [role="menu"],
      div[data-state="open"]:has([role="menuitem"]),
      div[data-testid="menu-bar-item-dropdown"],
      div:has(> [role="menu"]) {
        z-index: 99999 !important;
      }

      /* --- 7. QUEUED MESSAGES CARD --- */
      [data-testid="queued-messages-card"] span.line-clamp-2,
      [data-testid="queued-messages-card"] .line-clamp-2 {
        unicode-bidi: plaintext !important;
        text-align: start !important;
        width: 100% !important;
      }
      [data-testid="queued-messages-card"] div.flex-1:has(> .line-clamp-2) {
        width: 100% !important;
      }
      [data-testid="queued-messages-card"] span.line-clamp-2:dir(rtl),
      [dir="rtl"] [data-testid="queued-messages-card"] span.line-clamp-2 {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: isolate !important;
      }

      /* --- 8. TOOL EXECUTION BAR (Ran ...) --- */
      div.group.flex.w-full.min-w-0.items-center.min-h-8.py-1.px-2.select-none.cursor-pointer.rounded-lg {
        background: rgba(0, 0, 0, 0.02) !important;
        border: 1px solid rgba(0, 0, 0, 0.04) !important;
        border-radius: 8px !important;
        margin: 3px 0 !important;
        padding: 3px 10px !important;
        transition: all 0.15s ease !important;
      }
      div.group.flex.w-full.min-w-0.items-center.min-h-8.py-1.px-2.select-none.cursor-pointer.rounded-lg:hover {
        background: rgba(0, 0, 0, 0.05) !important;
        border-color: rgba(0, 0, 0, 0.08) !important;
      }
      

      /* --- 9. FLOATING ISLAND SIDEBAR & INNER COMPONENTS ARCHITECTURE --- */
      ${c.floatingSidebar !== false ? `
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
          unicode-bidi: normal !important;
        }

        div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) {
          position: relative !important;
          z-index: 30 !important;
        }
        div.flex:has(> div > [role="navigation"][aria-label="Sidebar"]) > div {
          position: relative !important;
        }
        /* Invisible Resizer Sash & Vertical Border Line flush with Floating Island edge */
        div.flex-shrink-0:has([data-testid="sidebar-sash"]),
        div[class*="bg-border"]:has([data-testid="sidebar-sash"]),
        div.bg-border:has([data-testid="sidebar-sash"]),
        div.relative.flex:has(> div > div > [role="navigation"][aria-label="Sidebar"]) > div.bg-border,
        [data-testid="sidebar-sash"],
        [data-testid="sidebar-sash"] * {
          background-color: transparent !important;
          background: transparent !important;
          border-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        [role="navigation"][aria-label="Sidebar"] {
          margin: 10px 0 10px 10px !important;
          height: calc(100% - 20px) !important;
          border-radius: var(--sb-radius, 16px) !important;
          background: var(--sb-bg) !important;
          border: 1px solid var(--sb-border) !important;
          box-shadow: var(--sb-shadow) !important;
          backdrop-filter: var(--sb-backdrop-blur, none) !important;
          -webkit-backdrop-filter: var(--sb-backdrop-blur, none) !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
          transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease !important;
        }
        [role="navigation"][aria-label="Sidebar"] .bg-sidebar {
          background-color: transparent !important;
        }
        [role="navigation"][aria-label="Sidebar"] a[href="/"] {
          background: var(--sb-btn-new-bg) !important;
          color: var(--sb-btn-new-color) !important;
          border: 1px solid var(--sb-btn-new-border) !important;
          border-radius: 10px !important;
          box-shadow: var(--sb-btn-new-shadow) !important;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
          font-weight: 500 !important;
        }
        [role="navigation"][aria-label="Sidebar"] a[href="/"]:hover {
          transform: translateY(-1px) !important;
          filter: brightness(1.06) !important;
        }
        [role="navigation"][aria-label="Sidebar"] a[href="/"]:active {
          transform: translateY(1px) !important;
          filter: brightness(0.96) !important;
        }
        [role="navigation"][aria-label="Sidebar"] a[href="/"] svg {
          color: var(--sb-btn-new-color) !important;
        }
        [role="navigation"][aria-label="Sidebar"] [aria-label="Create New Project"] {
          background: var(--sb-btn-new-bg) !important;
          color: var(--sb-btn-new-color) !important;
          border: 1px solid var(--sb-btn-new-border) !important;
          border-radius: 8px !important;
          box-shadow: var(--sb-btn-new-shadow) !important;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        [role="navigation"][aria-label="Sidebar"] [aria-label="Create New Project"]:hover {
          transform: translateY(-1px) !important;
          filter: brightness(1.06) !important;
        }
        /* Folder Item Titles & Solid Action Overlays */
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] {
          background: transparent !important;
          border-radius: 8px !important;
          padding-right: 12px !important;
          padding-left: 6px !important;
          position: relative !important;
          transition: background 0.15s ease !important;
        }
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] > div.flex-1 {
          min-width: 0 !important;
          overflow: hidden !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover {
          background: #eaf1fb !important;
          padding-right: 56px !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
        .dark [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"]:hover,
        .theme-dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover,
        .dark [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"]:hover {
          background: #1c273a !important;
        }
        /* Solid Harmonious Folder Action Box (No fade, no border, matching background) */
        [role="navigation"][aria-label="Sidebar"] div:has(> button[aria-label*="Project options"]),
        [role="navigation"][aria-label="Sidebar"] div:has(> a[aria-label*="New Conversation in Project"]),
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 {
          position: absolute !important;
          top: 50% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          right: 2px !important;
          height: 24px !important;
          padding: 0 4px !important;
          background: #eaf1fb !important;
          border-radius: 6px !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 2px !important;
          z-index: 10 !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] div:has(> button[aria-label*="Project options"]),
        .theme-dark [role="navigation"][aria-label="Sidebar"] div:has(> a[aria-label*="New Conversation in Project"]),
        .theme-dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1,
        .theme-dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1,
        .dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1,
        .dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 {
          background: #1c273a !important;
        }

        /* Active & Hover Chat Rows */
        [role="navigation"][aria-label="Sidebar"] .bg-sidebar-secondary {
          background: var(--sb-item-active-bg) !important;
          color: var(--sb-item-active-color) !important;
          border: 1px solid var(--sb-item-active-border) !important;
          border-radius: 10px !important;
          font-weight: 500 !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.15s ease !important;
        }
        [role="navigation"][aria-label="Sidebar"] .bg-sidebar-secondary span {
          color: var(--sb-item-active-color) !important;
        }
        [role="navigation"][aria-label="Sidebar"] div[style*="--row-bg"] {
          border-radius: 10px !important;
          transition: background 0.15s ease !important;
        }
        /* Chat Rows Styling, Left-Aligned LTR, Hover & Compact Clickable Area */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] {
          border-radius: 8px !important;
          padding-left: 8px !important;
          padding-right: 6px !important;
          transition: background-color 0.15s ease, box-shadow 0.15s ease !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"]:hover:not(.bg-sidebar-secondary) {
          background-color: #eaf1fb !important;
          --row-bg: #eaf1fb !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"]:hover:not(.bg-sidebar-secondary),
        .dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"]:hover:not(.bg-sidebar-secondary) {
          background-color: #1c273a !important;
          --row-bg: #1c273a !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
        }
        /* Strict Left-Aligned LTR Mandate for Both Persian and English Titles */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] span.truncate,
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] .truncate,
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] span.truncate,
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] .truncate,
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] span.truncate,
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] .truncate,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] span.truncate {
          direction: ltr !important;
          text-align: left !important;
          unicode-bidi: normal !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.grow,
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] a,
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] div,
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] div {
          direction: ltr !important;
          text-align: left !important;
          justify-content: flex-start !important;
        }
        /* Chat Title Space: Full width (minus 26px timestamp) when idle */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.grow {
          max-width: calc(100% - 26px) !important;
          min-width: 0 !important;
        }
        /* Only compress on hover to make room for action buttons */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"]:hover div.grow {
          max-width: calc(100% - 78px) !important;
        }
        /* Solid Harmonious Chat Action Box (Flush with right edge, covering timestamp cleanly) */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.absolute.-right-1,
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div[class*="absolute"][class*="-right-"] {
          position: absolute !important;
          top: 50% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          right: 0 !important;
          height: 26px !important;
          padding: 0 4px !important;
          background: #eaf1fb !important;
          border-radius: 6px 0 0 6px !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 1px !important;
          z-index: 10 !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.absolute.-right-1,
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div[class*="absolute"][class*="-right-"],
        .dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.absolute.-right-1 {
          background: #1c273a !important;
        }
        /* Active Chat Row Action Box */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"].bg-sidebar-secondary div.absolute.-right-1,
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"].bg-sidebar-secondary div[class*="absolute"][class*="-right-"] {
          background: var(--sb-item-active-bg, #e0ecfd) !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"].bg-sidebar-secondary div.absolute.-right-1,
        .dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"].bg-sidebar-secondary div.absolute.-right-1 {
          background: var(--sb-item-active-bg, #1e293b) !important;
        }
        /* Action Buttons inside both Chat and Folder Action Boxes */
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] button,
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 button,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 button,
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 a,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 a {
          width: 22px !important;
          height: 22px !important;
          padding: 2px !important;
          border-radius: 4px !important;
          background: transparent !important;
          border: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: inherit !important;
          transition: background-color 0.15s ease, color 0.15s ease !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] button:hover,
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 button:hover,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 button:hover,
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 a:hover,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 a:hover {
          background: rgba(59, 130, 246, 0.14) !important;
          color: #2563eb !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] button:hover,
        .dark [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] button:hover,
        .theme-dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 button:hover,
        .dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 button:hover,
        .theme-dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 button:hover,
        .dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 button:hover,
        .theme-dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 a:hover,
        .dark [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1 a:hover,
        .theme-dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 a:hover,
        .dark [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 a:hover {
          background: rgba(59, 130, 246, 0.25) !important;
          color: #60a5fa !important;
        }
        #antigravity-ui-sidebar-btn {
          border-radius: 10px !important;
          background: var(--sb-footer-bg, rgba(255, 255, 255, 0.65)) !important;
          border: 1px solid var(--sb-border) !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          transition: all 0.15s ease !important;
        }
        #antigravity-ui-sidebar-btn:hover {
          transform: translateY(-0.5px) !important;
          border-color: var(--sb-item-active-border) !important;
        }
      ` : `
        /* --- CLEAN RESET TO DEFAULT DOCKED SIDEBAR WHEN FLOATING IS DISABLED --- */
        [role="navigation"][aria-label="Sidebar"] {
          margin: 0 !important;
          height: 100% !important;
          border-radius: 0 !important;
          border: none !important;
          border-right: 1px solid var(--sidebar-border, rgba(0, 0, 0, 0.12)) !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background: var(--sidebar, #ffffff) !important;
        }
        .theme-dark [role="navigation"][aria-label="Sidebar"],
        .dark [role="navigation"][aria-label="Sidebar"] {
          background: var(--sidebar, #18181b) !important;
          border-right: 1px solid var(--sidebar-border, rgba(255, 255, 255, 0.1)) !important;
        }
        div.bg-border:has([data-testid="sidebar-sash"]),
        div[class*="bg-border"]:has([data-testid="sidebar-sash"]),
        [data-testid="sidebar-sash"] {
          background: rgba(0, 0, 0, 0.12) !important;
          border: none !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"],
        [role="navigation"][aria-label="Sidebar"] button[class*="group/headerbtn"] {
          padding-right: 64px !important;
          background: transparent !important;
        }
        [role="navigation"][aria-label="Sidebar"] div.group\/header > div.absolute.right-1,
        [role="navigation"][aria-label="Sidebar"] div[class*="group/header"] > div.absolute.right-1 {
          background: transparent !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.absolute.-right-1,
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div[class*="absolute"][class*="-right-"] {
          background: transparent !important;
          border-radius: 0 !important;
        }
        .theme-dark div.bg-border:has([data-testid="sidebar-sash"]),
        .theme-dark div[class*="bg-border"]:has([data-testid="sidebar-sash"]),
        .dark div.bg-border:has([data-testid="sidebar-sash"]),
        .dark div[class*="bg-border"]:has([data-testid="sidebar-sash"]),
        .theme-dark [data-testid="sidebar-sash"],
        .dark [data-testid="sidebar-sash"] {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        [role="navigation"][aria-label="Sidebar"] a[href="/"],
        [role="navigation"][aria-label="Sidebar"] [aria-label="Create New Project"] {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: inherit !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] {
          padding-left: 8px !important;
          border-radius: 6px !important;
          box-shadow: none !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] div.grow {
          max-width: none !important;
          direction: ltr !important;
          text-align: left !important;
          justify-content: flex-start !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] span.truncate,
        [role="navigation"][aria-label="Sidebar"] [data-testid="project-header"] span.truncate {
          direction: ltr !important;
          text-align: left !important;
          unicode-bidi: normal !important;
        }
        [role="navigation"][aria-label="Sidebar"] [data-testid="conversation-row-sidebar"] .shrink-0.pointer-events-auto {
          position: static !important;
          transform: none !important;
          max-width: none !important;
        }
        [role="navigation"][aria-label="Sidebar"] .bg-sidebar-secondary {
          border: none !important;
          box-shadow: none !important;
          border-radius: 6px !important;
        }
        #antigravity-ui-sidebar-btn {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}
.theme-dark div.group.flex.w-full.min-w-0.items-center.min-h-8.py-1.px-2.select-none.cursor-pointer.rounded-lg {
        background: rgba(255, 255, 255, 0.03) !important;
        border-color: rgba(255, 255, 255, 0.06) !important;
      }
      .theme-dark div.group.flex.w-full.min-w-0.items-center.min-h-8.py-1.px-2.select-none.cursor-pointer.rounded-lg:hover {
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
      }

    \`;

    /* Pure CSS Compact Sidebar Initialization */
    if (window.__ANTIGRAVITY_SIDEBAR_OBSERVER__) {
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__.disconnect();
      window.__ANTIGRAVITY_SIDEBAR_OBSERVER__ = null;
    }
    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]');
    const parent = sidebar ? sidebar.parentElement : null;
    const grandParent = parent ? parent.parentElement : null;
    const root = document.querySelector('[style*="--sidebar-width"]') || document.body;
    if (grandParent) grandParent.style.removeProperty('width');
    if (parent) parent.style.removeProperty('width');
    if (root) root.style.removeProperty('--sidebar-width');

    if (${c.compactSidebar === false}) {
      localStorage.removeItem('sidebarWidth');
      document.documentElement.style.removeProperty('--compact-sidebar-width');
    } else {
      const storedW = parseInt(localStorage.getItem('sidebarWidth'), 10);
      const targetW = (storedW && storedW >= 160 && storedW <= 450) ? storedW : 200;
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

    /* Harmonize Electron Window Controls Overlay with Titlebar */
    function syncTitleBarOverlay() {
      try {
        if (window.electronNative && window.electronNative.setTitleBarOverlay) {
          const isDark = document.body.classList.contains('theme-dark') || document.body.classList.contains('dark');
          const overlayColor = getComputedStyle(document.body).getPropertyValue('--titlebar-bg').trim() || (isDark ? '#12141a' : '#ffffff');
          const symbolColor = isDark ? '#94a3b8' : '#334155';
          window.electronNative.setTitleBarOverlay({
            color: overlayColor,
            symbolColor: symbolColor,
            height: 35
          });
        }
      } catch (_) {}
    }

    syncTitleBarOverlay();

    if (!window.__ANTIGRAVITY_TITLEBAR_OVERLAY_SYNC__) {
      window.__ANTIGRAVITY_TITLEBAR_OVERLAY_SYNC__ = true;
      const themeObs = new MutationObserver(() => syncTitleBarOverlay());
      themeObs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
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
  return '3.6.13';
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

                  // ONLY touch DOM/evaluate if missing required UI elements or explicitly forced
                  if (force || !val.hasStyle || !val.hasBtn || !val.hasPopup) {
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

const isDirectRun = Boolean(process.argv[1] && (process.argv[1].endsWith('main.mjs') || process.argv[1].endsWith('main.js')));

if (isDirectRun) {
  // Continuous background health check (every 3s, zero reflow, zero DOM touch unless missing)
  setInterval(() => {
    injectToLiveWindows(currentActiveConfig, false);
  }, 3000);

  // Initial forced injection
  injectToLiveWindows(currentActiveConfig, true);
}

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
    let data = null;
    try {
      const res = await fetch(`${GITHUB_RAW_BASE}/package.json?t=${Date.now()}`, {
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) data = await res.json();
    } catch (_) {}

    if (!data) {
      try {
        const cdnRes = await fetch(`https://cdn.jsdelivr.net/gh/omid-io/antigravity-ui@main/package.json?t=${Date.now()}`, {
          signal: AbortSignal.timeout(5000)
        });
        if (cdnRes.ok) data = await cdnRes.json();
      } catch (_) {}
    }

    if (data && data.version) {
      updateState.latestVersion = data.version;
      updateState.hasUpdate = compareVersions(data.version, updateState.currentVersion) > 0;
      updateState.checkedAt = Date.now();
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
      { name: 'package.json', rel: 'plugin/sidecars/studio/package.json', dest: join(HERE, 'package.json') },
      { name: 'popup-engine.js', rel: 'plugin/sidecars/studio/popup-engine.js', dest: join(HERE, 'popup-engine.js') },
      { name: 'main.mjs', rel: 'plugin/sidecars/studio/main.mjs', dest: join(HERE, 'main.mjs') },
      { name: 'index.html', rel: 'plugin/sidecars/studio/index.html', dest: join(HERE, 'index.html') },
      { name: 'app.js', rel: 'plugin/sidecars/studio/app.js', dest: join(HERE, 'app.js') },
      { name: 'styles.css', rel: 'plugin/sidecars/studio/styles.css', dest: join(HERE, 'styles.css') }
    ];

    const downloadedContents = {};

    for (const f of filesToUpdate) {
      let content = null;
      try {
        const resp = await fetch(`${GITHUB_RAW_BASE}/${f.rel}?t=${Date.now()}`, { signal: AbortSignal.timeout(8000) });
        if (resp.ok) {
          const text = await resp.text();
          if (text && text.length > 5) content = text;
        }
      } catch (_) {}

      if (!content) {
        try {
          const resp = await fetch(`https://cdn.jsdelivr.net/gh/omid-io/antigravity-ui@main/${f.rel}?t=${Date.now()}`, { signal: AbortSignal.timeout(8000) });
          if (resp.ok) {
            const text = await resp.text();
            if (text && text.length > 5) content = text;
          }
        } catch (_) {}
      }

      if (!content) {
        return { success: false, error: `Failed to download ${f.name} from mirrors` };
      }
      downloadedContents[f.name] = { dest: f.dest, content };
    }

    for (const name of Object.keys(downloadedContents)) {
      const item = downloadedContents[name];
      writeFileSync(item.dest, item.content, 'utf8');
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

// Dedicated Local HTTP Server with Auto-Port Fallback for 1-Click Zero-Downtime Live Updates
function startLocalUpdateServer(port = 58888) {
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

      const url = new URL(req.url, `http://127.0.0.1:${port}`);
      if (url.pathname === '/api/check-update') {
        const freshDiskVer = getStudioVersion();
        CURRENT_VERSION = freshDiskVer;
        updateState.currentVersion = freshDiskVer;
        const st = await checkGitHubUpdate();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          updateAvailable: st.hasUpdate,
          currentVersion: updateState.currentVersion,
          remoteVersion: st.latestVersion
        }));
        return;
      }

      if ((url.pathname === '/api/reload' || url.pathname === '/api/restart') && (req.method === 'POST' || req.method === 'GET')) {
        try {
          const freshDiskVer = getStudioVersion();
          CURRENT_VERSION = freshDiskVer;
          updateState.currentVersion = freshDiskVer;
          if (updateState.latestVersion) {
            updateState.hasUpdate = compareVersions(updateState.latestVersion, freshDiskVer) > 0;
          }

          // Force re-inject new engine to live Electron windows immediately
          try {
            injectToLiveWindows(currentActiveConfig, true);
          } catch (_) {}

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, version: freshDiskVer, reloaded: true }));

          // Gracefully restart sidecar process so supervisor loads clean memory state
          setTimeout(() => {
            try { process.exit(0); } catch (_) {}
          }, 800);
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      if (url.pathname === '/api/perform-update' && req.method === 'POST') {
        try {
          const result = await downloadAndApplyUpdate();
          res.writeHead(result.success ? 200 : 500, { 'Content-Type': 'application/json' });
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

    localHttp.listen(port, '127.0.0.1', () => {
      console.log(`[antigravity-ui] Dedicated update server listening on 127.0.0.1:${port}`);
    });
    localHttp.on('error', (err) => {
      if (err.code === 'EADDRINUSE' && port === 58888) {
        startLocalUpdateServer(58889);
      } else {
        console.warn(`[antigravity-ui] Update server port ${port} error:`, err.message);
      }
    });
  } catch (_) {}
}

startLocalUpdateServer(58888);

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
      floatingSidebar: true,
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

if (isDirectRun) {
  try { app.run(); } catch (_) {}
}

export { generateScript, injectToLiveWindows };
