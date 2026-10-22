const $ = (id) => document.getElementById(id);

async function callApi(path, { method = 'GET', body } = {}) {
  // If window.sidecar is available, use its fetch method
  if (window.sidecar && typeof window.sidecar.fetch === 'function') {
    const res = await window.sidecar.fetch(path, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return await res.json();
  }

  // Fallback: extract token directly from iframe query params
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['X-Sidecar-Token'] = token;

  const res = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return await res.json();
}

let syncTimeout = null;
function liveSync() {
  const dot = document.querySelector('.live-dot');
  if (dot) dot.style.opacity = '1';

  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    const updated = collectConfig();
    try {
      await callApi('/api/config', { method: 'POST', body: updated });
      if (dot) {
        dot.style.transform = 'scale(1.4)';
        setTimeout(() => { if (dot) dot.style.transform = 'scale(1)'; }, 150);
      }
    } catch (err) {
      console.error('[UI Studio] liveSync error:', err);
    }
  }, 25);
}

// ---------------------------------------------------------------------------
// Tabs & Mode Switching
// ---------------------------------------------------------------------------
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-tab');
    if ($(targetId)) $(targetId).classList.add('active');
  });
});

$('btn-theme-dark').addEventListener('click', () => {
  $('btn-theme-dark').classList.add('active');
  $('btn-theme-light').classList.remove('active');
  $('group-dark').style.display = 'flex';
  $('group-light').style.display = 'none';
});

$('btn-theme-light').addEventListener('click', () => {
  $('btn-theme-light').classList.add('active');
  $('btn-theme-dark').classList.remove('active');
  $('group-dark').style.display = 'none';
  $('group-light').style.display = 'flex';
});

// ---------------------------------------------------------------------------
// Config Management
// ---------------------------------------------------------------------------
let currentConfig = {
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
  userMsgLight: { bg: '#f0f4ff', text: '#0f172a', border: '#cbd5e1', borderWidth: '1.5', shadow: 'soft' }
};

function collectConfig() {
  const darkShadow = document.querySelector('#dark-shadow-group .shadow-btn.active')?.dataset.val || 'soft';
  const lightShadow = document.querySelector('#light-shadow-group .shadow-btn.active')?.dataset.val || 'soft';

  currentConfig = {
    ...currentConfig,
    isRTL: $('cfg-isRTL').checked,
    forceRTL: $('cfg-forceRTL').checked,
    fixAtSign: $('cfg-fixAtSign').checked,
    lh: $('cfg-lh').value,
    fs: $('cfg-fs').value,
    faFont: $('cfg-faFont').value.trim(),
    enFont: $('cfg-enFont').value.trim(),
    codeFont: $('cfg-codeFont').value.trim(),
    compactSidebar: $('cfg-compactSidebar').checked,
    floatingSidebar: $('cfg-floatingSidebar').checked,
    userMsgEnabled: $('cfg-userMsgEnabled').checked,
    inputBoxEnabled: $('cfg-inputBoxEnabled').checked,
    userMsgDark: {
      ...(currentConfig.userMsgDark || {}),
      bg: $('cfg-dark-bg').value,
      text: $('cfg-dark-text').value,
      border: $('cfg-dark-border').value,
      borderWidth: $('cfg-dark-bw').value,
      shadow: darkShadow
    },
    userMsgLight: {
      ...(currentConfig.userMsgLight || {}),
      bg: $('cfg-light-bg').value,
      text: $('cfg-light-text').value,
      border: $('cfg-light-border').value,
      borderWidth: $('cfg-light-bw').value,
      shadow: lightShadow
    }
  };
  return currentConfig;
}

function updateShadowButtons(groupSelector, activeVal) {
  document.querySelectorAll(`${groupSelector} .shadow-btn`).forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === activeVal);
  });
}

async function loadConfig() {
  try {
    const cfg = await callApi('/api/config');
    currentConfig = { ...currentConfig, ...cfg };

    // Tab 1
    $('cfg-isRTL').checked = currentConfig.isRTL !== false;
    $('cfg-forceRTL').checked = Boolean(currentConfig.forceRTL);
    $('cfg-fixAtSign').checked = currentConfig.fixAtSign !== false;
    $('cfg-faFont').value = currentConfig.faFont || '';
    $('cfg-enFont').value = currentConfig.enFont || '';
    $('cfg-codeFont').value = currentConfig.codeFont || '';
    
    $('cfg-lh').value = currentConfig.lh || '1.6';
    $('val-lh').textContent = currentConfig.lh || '1.6';

    $('cfg-fs').value = currentConfig.fs || '16';
    $('val-fs').textContent = (currentConfig.fs || '16') + 'px';

    // Tab 2
    $('cfg-userMsgEnabled').checked = currentConfig.userMsgEnabled !== false;
    $('cfg-inputBoxEnabled').checked = Boolean(currentConfig.inputBoxEnabled);

    const dark = currentConfig.userMsgDark || {};
    $('cfg-dark-bg').value = dark.bg || '#1e2433';
    $('cfg-dark-bg-hex').value = dark.bg || '#1e2433';
    $('cfg-dark-text').value = dark.text || '#f1f5f9';
    $('cfg-dark-text-hex').value = dark.text || '#f1f5f9';
    $('cfg-dark-border').value = dark.border || '#384c6e';
    $('cfg-dark-border-hex').value = dark.border || '#384c6e';
    $('cfg-dark-bw').value = dark.borderWidth || '1.5';
    $('val-dark-bw').textContent = (dark.borderWidth || '1.5') + 'px';
    updateShadowButtons('#dark-shadow-group', dark.shadow || 'soft');

    const light = currentConfig.userMsgLight || {};
    $('cfg-light-bg').value = light.bg || '#f0f4ff';
    $('cfg-light-bg-hex').value = light.bg || '#f0f4ff';
    $('cfg-light-text').value = light.text || '#0f172a';
    $('cfg-light-text-hex').value = light.text || '#0f172a';
    $('cfg-light-border').value = light.border || '#cbd5e1';
    $('cfg-light-border-hex').value = light.border || '#cbd5e1';
    $('cfg-light-bw').value = light.borderWidth || '1.5';
    $('val-light-bw').textContent = (light.borderWidth || '1.5') + 'px';
    updateShadowButtons('#light-shadow-group', light.shadow || 'soft');

    // Tab 3
    $('cfg-compactSidebar').checked = currentConfig.compactSidebar !== false;
  $('cfg-floatingSidebar').checked = currentConfig.floatingSidebar !== false;
  } catch (_) {}
}

// ---------------------------------------------------------------------------
// Zero-Button Live Interactive Event Listeners
// ---------------------------------------------------------------------------
// Typography Sliders
$('cfg-lh').addEventListener('input', (e) => {
  $('val-lh').textContent = e.target.value;
  liveSync();
});

$('cfg-fs').addEventListener('input', (e) => {
  $('val-fs').textContent = e.target.value + 'px';
  liveSync();
});

$('btn-reset-lh').addEventListener('click', () => {
  $('cfg-lh').value = '1.6';
  $('val-lh').textContent = '1.6';
  liveSync();
});

$('btn-reset-fs').addEventListener('click', () => {
  $('cfg-fs').value = '16';
  $('val-fs').textContent = '16px';
  liveSync();
});

// Text inputs
$('cfg-faFont').addEventListener('input', liveSync);
$('cfg-enFont').addEventListener('input', liveSync);
$('cfg-codeFont').addEventListener('input', liveSync);

// Switches
$('cfg-isRTL').addEventListener('change', liveSync);
$('cfg-forceRTL').addEventListener('change', liveSync);
$('cfg-fixAtSign').addEventListener('change', liveSync);
$('cfg-userMsgEnabled').addEventListener('change', liveSync);
$('cfg-inputBoxEnabled').addEventListener('change', liveSync);
$('cfg-compactSidebar').addEventListener('change', liveSync);
  $('cfg-floatingSidebar').addEventListener('change', liveSync);

// Border widths
$('cfg-dark-bw').addEventListener('input', (e) => {
  $('val-dark-bw').textContent = e.target.value + 'px';
  liveSync();
});

$('cfg-light-bw').addEventListener('input', (e) => {
  $('val-light-bw').textContent = e.target.value + 'px';
  liveSync();
});

// Color Pickers sync
function bindColorSync(colorId, hexId) {
  $(colorId).addEventListener('input', (e) => {
    $(hexId).value = e.target.value;
    liveSync();
  });
  $(hexId).addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      $(colorId).value = e.target.value;
      liveSync();
    }
  });
}

bindColorSync('cfg-dark-bg', 'cfg-dark-bg-hex');
bindColorSync('cfg-dark-text', 'cfg-dark-text-hex');
bindColorSync('cfg-dark-border', 'cfg-dark-border-hex');

bindColorSync('cfg-light-bg', 'cfg-light-bg-hex');
bindColorSync('cfg-light-text', 'cfg-light-text-hex');
bindColorSync('cfg-light-border', 'cfg-light-border-hex');

// Shadow button selectors
document.querySelectorAll('.shadow-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    parent.querySelectorAll('.shadow-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    liveSync();
  });
});

// Reset buttons
$('btn-reset-usermsg').addEventListener('click', () => {
  // Reset dark
  $('cfg-dark-bg').value = '#1e2433';
  $('cfg-dark-bg-hex').value = '#1e2433';
  $('cfg-dark-text').value = '#f1f5f9';
  $('cfg-dark-text-hex').value = '#f1f5f9';
  $('cfg-dark-border').value = '#384c6e';
  $('cfg-dark-border-hex').value = '#384c6e';
  $('cfg-dark-bw').value = '1.5';
  $('val-dark-bw').textContent = '1.5px';
  updateShadowButtons('#dark-shadow-group', 'soft');

  // Reset light
  $('cfg-light-bg').value = '#f0f4ff';
  $('cfg-light-bg-hex').value = '#f0f4ff';
  $('cfg-light-text').value = '#0f172a';
  $('cfg-light-text-hex').value = '#0f172a';
  $('cfg-light-border').value = '#cbd5e1';
  $('cfg-light-border-hex').value = '#cbd5e1';
  $('cfg-light-bw').value = '1.5';
  $('val-light-bw').textContent = '1.5px';
  updateShadowButtons('#light-shadow-group', 'soft');

  liveSync();
});

$('btn-reset-sidebar-w').addEventListener('click', () => {
  currentConfig.sidebarWidth = 256;
  liveSync();
});

loadConfig();
