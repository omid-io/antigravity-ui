function generatePresetComponentVars(preset, isDark) {
  const p = (preset || 'none').toLowerCase();
  
  if (p === 'clay') {
    if (!isDark) {
      return `
        --code-card-bg: #f0f4f9;
        --code-card-border: rgba(255, 255, 255, 0.95);
        --code-card-border-hover: rgba(255, 255, 255, 1);
        --code-card-radius: 18px;
        --code-card-shadow: 6px 6px 14px rgba(166, 180, 200, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.95), inset 1px 1px 2px rgba(255, 255, 255, 0.8);
        --code-header-bg: rgba(230, 238, 248, 0.7);
        --code-header-border: rgba(210, 224, 240, 0.8);
        --code-lang-color: #1e3a5f;
        --code-lang-bg: #e2ecf9;
        --code-lang-border: rgba(255, 255, 255, 0.9);
        --code-btn-color: #475569;
        --code-btn-hover-color: #0f172a;
        --code-btn-hover-bg: #ffffff;
        --review-card-bg: #f0f4f9;
        --review-card-border: rgba(255, 255, 255, 0.95);
        --review-card-border-hover: rgba(255, 255, 255, 1);
        --review-card-radius: 16px;
        --review-card-shadow: 5px 5px 12px rgba(166, 180, 200, 0.4), -5px -5px 12px rgba(255, 255, 255, 0.9);
        --review-btn-bg: #e2ecf9;
        --review-btn-color: #1e3a5f;
        --review-btn-border: rgba(255, 255, 255, 0.95);
        --review-btn-shadow: 3px 3px 6px rgba(166, 180, 200, 0.45), -2px -2px 6px rgba(255, 255, 255, 0.95), inset 1px 1px 2px rgba(255, 255, 255, 0.8);
        --review-btn-hover-bg: #ffffff;
        --review-btn-hover-color: #0284c7;
        --review-btn-hover-border: #93c5fd;
        --diff-list-bg: #f0f4f9;
        --table-bg: #f0f4f9;
        --table-border: rgba(255, 255, 255, 0.95);
        --table-radius: 16px;
        --table-shadow: 6px 6px 14px rgba(166, 180, 200, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.9);
        --table-th-bg: #e6eef8;
        --table-th-color: #1e3a5f;
        --table-th-border: rgba(210, 224, 240, 0.8);
        --table-tr-even-bg: rgba(230, 238, 248, 0.5);
        --table-tr-hover-bg: rgba(222, 235, 250, 0.8);
        --table-td-color: #0f172a;
        --table-td-border: rgba(218, 230, 245, 0.7);
        --artifact-card-bg: #f0f4f9;
        --artifact-card-border: rgba(255, 255, 255, 0.95);
        --artifact-card-border-hover: rgba(255, 255, 255, 1);
        --artifact-card-radius: 16px;
        --artifact-card-shadow: 5px 5px 12px rgba(166, 180, 200, 0.4), -5px -5px 12px rgba(255, 255, 255, 0.9);
        --artifact-title-color: #1e3a5f;
        --artifact-summary-color: #334155;
        --titlebar-bg: #eaf0f8;
        --titlebar-border: rgba(210, 224, 240, 0.8);
        --titlebar-shadow: 0 4px 10px rgba(166, 180, 200, 0.25);
        --backdrop-blur: none;
      `;
    } else {
      return `
        --code-card-bg: #182030;
        --code-card-border: rgba(255, 255, 255, 0.08);
        --code-card-border-hover: rgba(147, 197, 253, 0.2);
        --code-card-radius: 18px;
        --code-card-shadow: 6px 6px 16px rgba(0, 0, 0, 0.5), -4px -4px 12px rgba(45, 58, 85, 0.2), inset 1px 1px 2px rgba(255, 255, 255, 0.08);
        --code-header-bg: rgba(20, 28, 44, 0.7);
        --code-header-border: rgba(255, 255, 255, 0.06);
        --code-lang-color: #93c5fd;
        --code-lang-bg: #1e283d;
        --code-lang-border: rgba(255, 255, 255, 0.1);
        --code-btn-color: #94a3b8;
        --code-btn-hover-color: #93c5fd;
        --code-btn-hover-bg: #243048;
        --review-card-bg: #182030;
        --review-card-border: rgba(255, 255, 255, 0.08);
        --review-card-border-hover: rgba(147, 197, 253, 0.2);
        --review-card-radius: 16px;
        --review-card-shadow: 5px 5px 14px rgba(0, 0, 0, 0.5), -3px -3px 10px rgba(45, 58, 85, 0.2);
        --review-btn-bg: #1e283d;
        --review-btn-color: #93c5fd;
        --review-btn-border: rgba(255, 255, 255, 0.1);
        --review-btn-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4), -2px -2px 6px rgba(45, 58, 85, 0.2), inset 1px 1px 2px rgba(255, 255, 255, 0.1);
        --review-btn-hover-bg: #27344f;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: rgba(147, 197, 253, 0.4);
        --diff-list-bg: #182030;
        --table-bg: #182030;
        --table-border: rgba(255, 255, 255, 0.08);
        --table-radius: 16px;
        --table-shadow: 6px 6px 16px rgba(0, 0, 0, 0.5);
        --table-th-bg: #141b29;
        --table-th-color: #93c5fd;
        --table-th-border: rgba(255, 255, 255, 0.07);
        --table-tr-even-bg: rgba(20, 28, 44, 0.4);
        --table-tr-hover-bg: rgba(30, 40, 60, 0.6);
        --table-td-color: #e2e8f0;
        --table-td-border: rgba(255, 255, 255, 0.05);
        --artifact-card-bg: #182030;
        --artifact-card-border: rgba(255, 255, 255, 0.08);
        --artifact-card-border-hover: rgba(147, 197, 253, 0.2);
        --artifact-card-radius: 16px;
        --artifact-card-shadow: 5px 5px 14px rgba(0, 0, 0, 0.5);
        --artifact-title-color: #93c5fd;
        --artifact-summary-color: #cbd5e1;
        --titlebar-bg: #141b29;
        --titlebar-border: rgba(255, 255, 255, 0.06);
        --titlebar-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
        --backdrop-blur: none;
      `;
    }
  }

  if (p === '3d') {
    if (!isDark) {
      return `
        --code-card-bg: #ffffff;
        --code-card-border: #d1d5db;
        --code-card-border-hover: #9ca3af;
        --code-card-radius: 12px;
        --code-card-shadow: 0 8px 0 #e5e7eb, 0 10px 16px rgba(0, 0, 0, 0.06);
        --code-header-bg: #f9fafb;
        --code-header-border: #e5e7eb;
        --code-lang-color: #374151;
        --code-lang-bg: #f3f4f6;
        --code-lang-border: #d1d5db;
        --code-btn-color: #4b5563;
        --code-btn-hover-color: #111827;
        --code-btn-hover-bg: #f3f4f6;
        --review-card-bg: #ffffff;
        --review-card-border: #d1d5db;
        --review-card-border-hover: #9ca3af;
        --review-card-radius: 12px;
        --review-card-shadow: 0 4px 0 #e5e7eb, 0 6px 12px rgba(0, 0, 0, 0.05);
        --review-btn-bg: #2563eb;
        --review-btn-color: #ffffff;
        --review-btn-border: #1d4ed8;
        --review-btn-shadow: 0 2px 0 #1d4ed8;
        --review-btn-hover-bg: #1d4ed8;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #1e40af;
        --diff-list-bg: #ffffff;
        --table-bg: #ffffff;
        --table-border: #d1d5db;
        --table-radius: 10px;
        --table-shadow: 0 6px 0 #e5e7eb, 0 8px 14px rgba(0, 0, 0, 0.05);
        --table-th-bg: #f9fafb;
        --table-th-color: #374151;
        --table-th-border: #e5e7eb;
        --table-tr-even-bg: #f9fafb;
        --table-tr-hover-bg: #f3f4f6;
        --table-td-color: #111827;
        --table-td-border: #e5e7eb;
        --artifact-card-bg: #ffffff;
        --artifact-card-border: #d1d5db;
        --artifact-card-border-hover: #9ca3af;
        --artifact-card-radius: 12px;
        --artifact-card-shadow: 0 4px 0 #e5e7eb, 0 6px 12px rgba(0, 0, 0, 0.05);
        --artifact-title-color: #111827;
        --artifact-summary-color: #4b5563;
        --titlebar-bg: #f9fafb;
        --titlebar-border: #e5e7eb;
        --titlebar-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        --backdrop-blur: none;
      `;
    } else {
      return `
        --code-card-bg: #111827;
        --code-card-border: rgba(255, 255, 255, 0.12);
        --code-card-border-hover: rgba(255, 255, 255, 0.2);
        --code-card-radius: 12px;
        --code-card-shadow: 0 8px 0 #030712, 0 12px 24px rgba(0, 0, 0, 0.6);
        --code-header-bg: #0f172a;
        --code-header-border: rgba(255, 255, 255, 0.08);
        --code-lang-color: #e5e7eb;
        --code-lang-bg: #1f2937;
        --code-lang-border: rgba(255, 255, 255, 0.14);
        --code-btn-color: #9ca3af;
        --code-btn-hover-color: #f3f4f6;
        --code-btn-hover-bg: #1f2937;
        --review-card-bg: #111827;
        --review-card-border: rgba(255, 255, 255, 0.12);
        --review-card-border-hover: rgba(255, 255, 255, 0.2);
        --review-card-radius: 12px;
        --review-card-shadow: 0 4px 0 #030712, 0 6px 14px rgba(0, 0, 0, 0.5);
        --review-btn-bg: #3b82f6;
        --review-btn-color: #ffffff;
        --review-btn-border: #2563eb;
        --review-btn-shadow: 0 2px 0 #1d4ed8;
        --review-btn-hover-bg: #2563eb;
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: #1d4ed8;
        --diff-list-bg: #111827;
        --table-bg: #111827;
        --table-border: rgba(255, 255, 255, 0.1);
        --table-radius: 10px;
        --table-shadow: 0 6px 0 #030712, 0 8px 18px rgba(0, 0, 0, 0.5);
        --table-th-bg: #0f172a;
        --table-th-color: #e5e7eb;
        --table-th-border: rgba(255, 255, 255, 0.1);
        --table-tr-even-bg: rgba(255, 255, 255, 0.02);
        --table-tr-hover-bg: rgba(255, 255, 255, 0.06);
        --table-td-color: #e5e7eb;
        --table-td-border: rgba(255, 255, 255, 0.06);
        --artifact-card-bg: #111827;
        --artifact-card-border: rgba(255, 255, 255, 0.12);
        --artifact-card-border-hover: rgba(255, 255, 255, 0.2);
        --artifact-card-radius: 12px;
        --artifact-card-shadow: 0 4px 0 #030712, 0 6px 14px rgba(0, 0, 0, 0.5);
        --artifact-title-color: #f3f4f6;
        --artifact-summary-color: #9ca3af;
        --titlebar-bg: #0f172a;
        --titlebar-border: rgba(255, 255, 255, 0.08);
        --titlebar-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        --backdrop-blur: none;
      `;
    }
  }

  if (p === 'glow') {
    if (!isDark) {
      return `
        --code-card-bg: #ffffff;
        --code-card-border: rgba(56, 189, 248, 0.6);
        --code-card-border-hover: rgba(14, 165, 233, 0.9);
        --code-card-radius: 14px;
        --code-card-shadow: 0 0 16px rgba(14, 165, 233, 0.2), 0 4px 12px rgba(0, 0, 0, 0.04);
        --code-header-bg: linear-gradient(90deg, rgba(224, 242, 254, 0.8) 0%, rgba(243, 232, 255, 0.8) 100%);
        --code-header-border: rgba(56, 189, 248, 0.4);
        --code-lang-color: #0284c7;
        --code-lang-bg: #ffffff;
        --code-lang-border: rgba(56, 189, 248, 0.5);
        --code-btn-color: #0284c7;
        --code-btn-hover-color: #7c3aed;
        --code-btn-hover-bg: #f0f9ff;
        --review-card-bg: #ffffff;
        --review-card-border: rgba(56, 189, 248, 0.6);
        --review-card-border-hover: rgba(14, 165, 233, 0.9);
        --review-card-radius: 14px;
        --review-card-shadow: 0 0 14px rgba(14, 165, 233, 0.18);
        --review-btn-bg: linear-gradient(135deg, #0284c7 0%, #7c3aed 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: transparent;
        --review-btn-shadow: 0 0 12px rgba(14, 165, 233, 0.4);
        --review-btn-hover-bg: linear-gradient(135deg, #0369a1 0%, #6d28d9 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: transparent;
        --diff-list-bg: #ffffff;
        --table-bg: #ffffff;
        --table-border: rgba(56, 189, 248, 0.5);
        --table-radius: 12px;
        --table-shadow: 0 0 16px rgba(14, 165, 233, 0.15);
        --table-th-bg: linear-gradient(90deg, #f0f9ff 0%, #faf5ff 100%);
        --table-th-color: #0369a1;
        --table-th-border: rgba(56, 189, 248, 0.4);
        --table-tr-even-bg: rgba(240, 249, 255, 0.4);
        --table-tr-hover-bg: rgba(224, 242, 254, 0.6);
        --table-td-color: #0f172a;
        --table-td-border: rgba(56, 189, 248, 0.15);
        --artifact-card-bg: #ffffff;
        --artifact-card-border: rgba(56, 189, 248, 0.5);
        --artifact-card-border-hover: rgba(14, 165, 233, 0.8);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 0 14px rgba(14, 165, 233, 0.18);
        --artifact-title-color: #0284c7;
        --artifact-summary-color: #334155;
        --titlebar-bg: rgba(255, 255, 255, 0.95);
        --titlebar-border: rgba(56, 189, 248, 0.4);
        --titlebar-shadow: 0 2px 10px rgba(14, 165, 233, 0.12);
        --backdrop-blur: none;
      `;
    } else {
      return `
        --code-card-bg: rgba(10, 15, 26, 0.92);
        --code-card-border: rgba(56, 189, 248, 0.4);
        --code-card-border-hover: rgba(56, 189, 248, 0.7);
        --code-card-radius: 14px;
        --code-card-shadow: 0 0 24px rgba(56, 189, 248, 0.22), inset 0 1px 0 rgba(56, 189, 248, 0.2);
        --code-header-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%);
        --code-header-border: rgba(56, 189, 248, 0.25);
        --code-lang-color: #38bdf8;
        --code-lang-bg: rgba(56, 189, 248, 0.12);
        --code-lang-border: rgba(56, 189, 248, 0.3);
        --code-btn-color: #38bdf8;
        --code-btn-hover-color: #a78bfa;
        --code-btn-hover-bg: rgba(56, 189, 248, 0.15);
        --review-card-bg: rgba(10, 15, 26, 0.92);
        --review-card-border: rgba(56, 189, 248, 0.4);
        --review-card-border-hover: rgba(56, 189, 248, 0.7);
        --review-card-radius: 14px;
        --review-card-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        --review-btn-bg: linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%);
        --review-btn-color: #ffffff;
        --review-btn-border: transparent;
        --review-btn-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
        --review-btn-hover-bg: linear-gradient(135deg, #0369a1 0%, #7c3aed 100%);
        --review-btn-hover-color: #ffffff;
        --review-btn-hover-border: transparent;
        --diff-list-bg: rgba(10, 15, 26, 0.92);
        --table-bg: rgba(10, 15, 26, 0.92);
        --table-border: rgba(56, 189, 248, 0.35);
        --table-radius: 12px;
        --table-shadow: 0 0 22px rgba(56, 189, 248, 0.18);
        --table-th-bg: linear-gradient(90deg, rgba(14, 165, 233, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
        --table-th-color: #38bdf8;
        --table-th-border: rgba(56, 189, 248, 0.25);
        --table-tr-even-bg: rgba(56, 189, 248, 0.03);
        --table-tr-hover-bg: rgba(56, 189, 248, 0.08);
        --table-td-color: #e2e8f0;
        --table-td-border: rgba(56, 189, 248, 0.15);
        --artifact-card-bg: rgba(10, 15, 26, 0.92);
        --artifact-card-border: rgba(56, 189, 248, 0.35);
        --artifact-card-border-hover: rgba(56, 189, 248, 0.6);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 0 20px rgba(56, 189, 248, 0.18);
        --artifact-title-color: #38bdf8;
        --artifact-summary-color: #cbd5e1;
        --titlebar-bg: rgba(8, 12, 20, 0.95);
        --titlebar-border: rgba(56, 189, 248, 0.3);
        --titlebar-shadow: 0 4px 16px rgba(56, 189, 248, 0.15);
        --backdrop-blur: none;
      `;
    }
  }

  if (p === 'soft') {
    if (!isDark) {
      return `
        --code-card-bg: rgba(255, 255, 255, 0.88);
        --code-card-border: rgba(226, 232, 240, 0.95);
        --code-card-border-hover: rgba(186, 215, 248, 1);
        --code-card-radius: 16px;
        --code-card-shadow: 0 10px 28px -4px rgba(67, 105, 169, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --code-header-bg: linear-gradient(180deg, rgba(248, 250, 252, 0.85) 0%, rgba(241, 245, 249, 0.85) 100%);
        --code-header-border: rgba(226, 232, 240, 0.9);
        --code-lang-color: #334155;
        --code-lang-bg: rgba(255, 255, 255, 0.9);
        --code-lang-border: rgba(203, 213, 225, 0.8);
        --code-btn-color: #64748b;
        --code-btn-hover-color: #0284c7;
        --code-btn-hover-bg: rgba(255, 255, 255, 0.95);
        --review-card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.92) 100%);
        --review-card-border: rgba(226, 232, 240, 0.95);
        --review-card-border-hover: rgba(186, 215, 248, 1);
        --review-card-radius: 14px;
        --review-card-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --review-btn-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        --review-btn-color: #0f172a;
        --review-btn-border: rgba(203, 213, 225, 0.9);
        --review-btn-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), inset 0 1px 0 #fff;
        --review-btn-hover-bg: #ffffff;
        --review-btn-hover-color: #0284c7;
        --review-btn-hover-border: #38bdf8;
        --diff-list-bg: rgba(255, 255, 255, 0.88);
        --table-bg: rgba(255, 255, 255, 0.92);
        --table-border: rgba(226, 232, 240, 0.95);
        --table-radius: 14px;
        --table-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08);
        --table-th-bg: linear-gradient(180deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%);
        --table-th-color: #475569;
        --table-th-border: rgba(226, 232, 240, 1);
        --table-tr-even-bg: rgba(248, 250, 252, 0.65);
        --table-tr-hover-bg: rgba(238, 244, 255, 0.8);
        --table-td-color: #1e293b;
        --table-td-border: rgba(241, 245, 249, 1);
        --artifact-card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.92) 100%);
        --artifact-card-border: rgba(226, 232, 240, 0.95);
        --artifact-card-border-hover: rgba(186, 215, 248, 1);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 8px 24px -4px rgba(67, 105, 169, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        --artifact-title-color: #0f172a;
        --artifact-summary-color: #475569;
        --titlebar-bg: rgba(255, 255, 255, 0.85);
        --titlebar-border: rgba(226, 232, 240, 0.85);
        --titlebar-shadow: 0 4px 16px -2px rgba(67, 105, 169, 0.06);
        --backdrop-blur: blur(12px);
      `;
    } else {
      return `
        --code-card-bg: rgba(18, 24, 38, 0.85);
        --code-card-border: rgba(255, 255, 255, 0.1);
        --code-card-border-hover: rgba(147, 197, 253, 0.3);
        --code-card-radius: 16px;
        --code-card-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --code-header-bg: rgba(255, 255, 255, 0.03);
        --code-header-border: rgba(255, 255, 255, 0.06);
        --code-lang-color: #cbd5e1;
        --code-lang-bg: rgba(255, 255, 255, 0.07);
        --code-lang-border: rgba(255, 255, 255, 0.12);
        --code-btn-color: #94a3b8;
        --code-btn-hover-color: #38bdf8;
        --code-btn-hover-bg: rgba(255, 255, 255, 0.1);
        --review-card-bg: linear-gradient(135deg, rgba(22, 28, 44, 0.92) 0%, rgba(16, 22, 34, 0.88) 100%);
        --review-card-border: rgba(255, 255, 255, 0.1);
        --review-card-border-hover: rgba(147, 197, 253, 0.3);
        --review-card-radius: 14px;
        --review-card-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --review-btn-bg: linear-gradient(180deg, #252e42 0%, #1a2233 100%);
        --review-btn-color: #f1f5f9;
        --review-btn-border: rgba(255, 255, 255, 0.14);
        --review-btn-shadow: 0 2px 6px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        --review-btn-hover-bg: #2b354d;
        --review-btn-hover-color: #38bdf8;
        --review-btn-hover-border: rgba(56, 189, 248, 0.5);
        --diff-list-bg: rgba(18, 24, 38, 0.88);
        --table-bg: rgba(18, 24, 38, 0.85);
        --table-border: rgba(255, 255, 255, 0.1);
        --table-radius: 14px;
        --table-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5);
        --table-th-bg: linear-gradient(180deg, rgba(28, 36, 56, 0.9) 0%, rgba(22, 29, 45, 0.9) 100%);
        --table-th-color: #cbd5e1;
        --table-th-border: rgba(255, 255, 255, 0.1);
        --table-tr-even-bg: rgba(255, 255, 255, 0.025);
        --table-tr-hover-bg: rgba(255, 255, 255, 0.06);
        --table-td-color: #e2e8f0;
        --table-td-border: rgba(255, 255, 255, 0.06);
        --artifact-card-bg: linear-gradient(135deg, rgba(22, 28, 44, 0.92) 0%, rgba(16, 22, 34, 0.88) 100%);
        --artifact-card-border: rgba(255, 255, 255, 0.1);
        --artifact-card-border-hover: rgba(147, 197, 253, 0.3);
        --artifact-card-radius: 14px;
        --artifact-card-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        --artifact-title-color: #f1f5f9;
        --artifact-summary-color: #94a3b8;
        --titlebar-bg: rgba(15, 20, 30, 0.85);
        --titlebar-border: rgba(255, 255, 255, 0.08);
        --titlebar-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.45);
        --backdrop-blur: blur(14px);
      `;
    }
  }

  // Default 'none' (Sleek Linear Minimal)
  if (!isDark) {
    return `
      --code-card-bg: #f8fafc;
      --code-card-border: #e2e8f0;
      --code-card-border-hover: #cbd5e1;
      --code-card-radius: 12px;
      --code-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --code-header-bg: #f1f5f9;
      --code-header-border: #e2e8f0;
      --code-lang-color: #475569;
      --code-lang-bg: #ffffff;
      --code-lang-border: #e2e8f0;
      --code-btn-color: #64748b;
      --code-btn-hover-color: #0f172a;
      --code-btn-hover-bg: #ffffff;
      --review-card-bg: #f8fafc;
      --review-card-border: #e2e8f0;
      --review-card-border-hover: #cbd5e1;
      --review-card-radius: 10px;
      --review-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --review-btn-bg: #ffffff;
      --review-btn-color: #0f172a;
      --review-btn-border: #cbd5e1;
      --review-btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
      --review-btn-hover-bg: #f8fafc;
      --review-btn-hover-color: #0284c7;
      --review-btn-hover-border: #94a3b8;
      --diff-list-bg: #f8fafc;
      --table-bg: #ffffff;
      --table-border: #e2e8f0;
      --table-radius: 8px;
      --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      --table-th-bg: #f8fafc;
      --table-th-color: #475569;
      --table-th-border: #e2e8f0;
      --table-tr-even-bg: #f8fafc;
      --table-tr-hover-bg: #f1f5f9;
      --table-td-color: #1e293b;
      --table-td-border: #f1f5f9;
      --artifact-card-bg: #f8fafc;
      --artifact-card-border: #e2e8f0;
      --artifact-card-border-hover: #cbd5e1;
      --artifact-card-radius: 10px;
      --artifact-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      --artifact-title-color: #0f172a;
      --artifact-summary-color: #475569;
      --titlebar-bg: #ffffff;
      --titlebar-border: #e2e8f0;
      --titlebar-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
      --backdrop-blur: none;
    `;
  } else {
    return `
      --code-card-bg: #0e1117;
      --code-card-border: rgba(255, 255, 255, 0.1);
      --code-card-border-hover: rgba(255, 255, 255, 0.18);
      --code-card-radius: 12px;
      --code-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --code-header-bg: rgba(255, 255, 255, 0.03);
      --code-header-border: rgba(255, 255, 255, 0.06);
      --code-lang-color: #cbd5e1;
      --code-lang-bg: rgba(255, 255, 255, 0.06);
      --code-lang-border: rgba(255, 255, 255, 0.1);
      --code-btn-color: #94a3b8;
      --code-btn-hover-color: #ffffff;
      --code-btn-hover-bg: rgba(255, 255, 255, 0.1);
      --review-card-bg: #12161f;
      --review-card-border: rgba(255, 255, 255, 0.1);
      --review-card-border-hover: rgba(255, 255, 255, 0.18);
      --review-card-radius: 10px;
      --review-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --review-btn-bg: #1f2430;
      --review-btn-color: #f1f5f9;
      --review-btn-border: rgba(255, 255, 255, 0.12);
      --review-btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      --review-btn-hover-bg: #272c3a;
      --review-btn-hover-color: #38bdf8;
      --review-btn-hover-border: rgba(56, 189, 248, 0.4);
      --diff-list-bg: #12161f;
      --table-bg: #0e1117;
      --table-border: rgba(255, 255, 255, 0.08);
      --table-radius: 8px;
      --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --table-th-bg: rgba(255, 255, 255, 0.03);
      --table-th-color: #cbd5e1;
      --table-th-border: rgba(255, 255, 255, 0.08);
      --table-tr-even-bg: rgba(255, 255, 255, 0.015);
      --table-tr-hover-bg: rgba(255, 255, 255, 0.04);
      --table-td-color: #e2e8f0;
      --table-td-border: rgba(255, 255, 255, 0.05);
      --artifact-card-bg: #12161f;
      --artifact-card-border: rgba(255, 255, 255, 0.1);
      --artifact-card-border-hover: rgba(255, 255, 255, 0.18);
      --artifact-card-radius: 10px;
      --artifact-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --artifact-title-color: #f1f5f9;
      --artifact-summary-color: #94a3b8;
      --titlebar-bg: #0e1117;
      --titlebar-border: rgba(255, 255, 255, 0.08);
      --titlebar-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      --backdrop-blur: none;
    `;
  }
}


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
      case 'soft':
        return '0 -2px 8px rgba(67, 105, 169, 0.045), 0 12px 30px rgba(67, 105, 169, 0.11), 0 3px 8px rgba(64, 101, 163, 0.05), inset 0 1.5px 0 rgba(255,255,255,0.99), inset 0 -1px 0 rgba(117,158,222,0.12), inset 1px 0 0 rgba(255,255,255,0.58), inset -1px 0 0 rgba(109,151,219,0.08)';
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
      case 'soft':
        return '0 -2px 8px rgba(0, 0, 0, 0.18), 0 12px 30px rgba(0, 0, 0, 0.42), 0 3px 8px rgba(0, 0, 0, 0.22), inset 0 1.5px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.5)';
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

  const lightPresetName = (userMsgLight.preset || userMsgLight.shadow || 'none').toLowerCase();
  const darkPresetName = (userMsgDark.preset || userMsgDark.shadow || 'none').toLowerCase();
  const lightComponentVars = generatePresetComponentVars(lightPresetName, false);
  const darkComponentVars = generatePresetComponentVars(darkPresetName, true);
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

  const lightInputBg = isLightClay ? 'linear-gradient(145deg, #f0f6ff 0%, #e2ecfa 100%)' : (isLightSoft ? 'rgba(255, 255, 255, 0.92)' : 'transparent');
  const darkInputBg = isDarkClay ? 'linear-gradient(145deg, #1e2638 0%, #141b29 100%)' : (isDarkSoft ? 'rgba(24, 32, 47, 0.88)' : 'transparent');
  const lightInputBorder = isLightClay ? 'rgba(255, 255, 255, 0.95)' : (isLightSoft ? 'rgba(255, 255, 255, 0.96)' : lightBorder);
  const darkInputBorder = isDarkClay ? 'rgba(147, 197, 253, 0.24)' : (isDarkSoft ? 'rgba(255, 255, 255, 0.14)' : darkBorder);
  const lightInputShadow = isLightClay ? lightShadow : (isLightSoft ? '0 10px 28px rgba(67, 105, 169, 0.10), 0 2px 6px rgba(64, 101, 163, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)' : (userMsgLight.shadow === 'none' ? 'none' : lightShadow));
  const darkInputShadow = isDarkClay ? darkShadow : (isDarkSoft ? '0 10px 28px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)' : (userMsgDark.shadow === 'none' ? 'none' : darkShadow));

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
    }
    [id="antigravity.agentSidePanelInputBox"] .bg-card, 
    [id*="agentSidePanelInputBox"] .bg-card {
      background: transparent !important;
    }
    [id="antigravity.agentSidePanelInputBox"]:hover, 
    [id*="agentSidePanelInputBox"]:hover {
      filter: brightness(1.02);
      transform: translateY(-1.5px);
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
        z-index: 40 !important;
        background: var(--titlebar-bg) !important;
        backdrop-filter: var(--backdrop-blur, none) !important;
        -webkit-backdrop-filter: var(--backdrop-blur, none) !important;
        border-bottom: 1px solid var(--titlebar-border) !important;
        box-shadow: var(--titlebar-shadow) !important;
        transition: all 0.2s ease !important;
      }
      [data-testid="title-menu-bar"] button {
        border-radius: 6px !important;
        font-size: 12px !important;
        padding: 3px 8px !important;
        transition: all 0.15s ease !important;
      }
      [data-testid="title-menu-bar"] button:hover {
        background: rgba(0, 0, 0, 0.05) !important;
      }
      .theme-dark [data-testid="title-menu-bar"] button:hover {
        background: rgba(255, 255, 255, 0.08) !important;
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
