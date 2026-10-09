const sidecar = window.sidecar;
const $ = (id) => document.getElementById(id);

async function callApi(path, { method = 'GET', body } = {}) {
  if (!sidecar) throw new Error('Sidecar bridge unavailable');
  const res = await sidecar.fetch(path, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return await res.json();
}

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => { t.hidden = true; }, 3000);
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
  $('group-dark').hidden = false;
  $('group-light').hidden = true;
});

$('btn-theme-light').addEventListener('click', () => {
  $('btn-theme-light').classList.add('active');
  $('btn-theme-dark').classList.remove('active');
  $('group-dark').hidden = true;
  $('group-light').hidden = false;
});

// ---------------------------------------------------------------------------
// Status & Config
// ---------------------------------------------------------------------------
async function loadStatus() {
  try {
    const s = await callApi('/api/status');
    $('diag-node').textContent = s.nodeVersion || '–';
    $('diag-cdp').textContent = s.cdpConnected ? `متصل به پنجره چت (پورت ${s.cdpPort})` : `در انتظار اتصال (پورت ${s.cdpPort || '–'})`;
    $('diag-asar').textContent = s.asarPatched ? 'پچ قدیمی در Asar فعال است' : 'نسخه رسمی خام (تزریق مستقیم از اکستنشن)';
  } catch (err) {
    $('diag-node').textContent = 'خطا در ارتباط';
  }
}

let currentConfig = {};

async function loadConfig() {
  try {
    const cfg = await callApi('/api/config');
    currentConfig = cfg;

    $('cfg-isRTL').checked = cfg.isRTL !== false;
    $('cfg-forceRTL').checked = Boolean(cfg.forceRTL);
    $('cfg-fixAtSign').checked = cfg.fixAtSign !== false;
    
    $('cfg-lh').value = cfg.lh || '1.6';
    $('val-lh').textContent = cfg.lh || '1.6';

    $('cfg-fs').value = cfg.fs || '16';
    $('val-fs').textContent = (cfg.fs || '16') + 'px';

    $('cfg-faFont').value = cfg.faFont || '';
    $('cfg-compactSidebar').checked = cfg.compactSidebar !== false;
    $('cfg-userMsgEnabled').checked = cfg.userMsgEnabled !== false;

    // Dark
    const darkBg = cfg.userMsgDark?.bg || '#1e2433';
    $('cfg-dark-bg').value = darkBg;
    $('cfg-dark-bg-hex').value = darkBg;

    const darkBorder = cfg.userMsgDark?.border || '#384c6e';
    $('cfg-dark-border').value = darkBorder;
    $('cfg-dark-border-hex').value = darkBorder;

    // Light
    const lightBg = cfg.userMsgLight?.bg || '#f0f4ff';
    $('cfg-light-bg').value = lightBg;
    $('cfg-light-bg-hex').value = lightBg;

    const lightBorder = cfg.userMsgLight?.border || '#cbd5e1';
    $('cfg-light-border').value = lightBorder;
    $('cfg-light-border-hex').value = lightBorder;

  } catch (err) {
    showToast('خطا در بارگذاری کانفیگ');
  }
}

async function saveConfig() {
  const updated = {
    ...currentConfig,
    isRTL: $('cfg-isRTL').checked,
    forceRTL: $('cfg-forceRTL').checked,
    fixAtSign: $('cfg-fixAtSign').checked,
    lh: $('cfg-lh').value,
    fs: $('cfg-fs').value,
    faFont: $('cfg-faFont').value.trim(),
    compactSidebar: $('cfg-compactSidebar').checked,
    userMsgEnabled: $('cfg-userMsgEnabled').checked,
    userMsgDark: {
      ...(currentConfig.userMsgDark || {}),
      bg: $('cfg-dark-bg').value,
      border: $('cfg-dark-border').value,
      text: '#f1f5f9',
      borderWidth: '1.5',
      shadow: 'soft'
    },
    userMsgLight: {
      ...(currentConfig.userMsgLight || {}),
      bg: $('cfg-light-bg').value,
      border: $('cfg-light-border').value,
      text: '#0f172a',
      borderWidth: '1.5',
      shadow: 'soft'
    }
  };

  try {
    await callApi('/api/config', { method: 'POST', body: updated });
    currentConfig = updated;
    showToast('تنظیمات با موفقیت ذخیره و زنده اعمال شد!');
    loadStatus();
  } catch (err) {
    showToast('خطا در ذخیره تنظیمات: ' + err.message);
  }
}

// Live bindings
$('cfg-lh').addEventListener('input', (e) => {
  $('val-lh').textContent = e.target.value;
});

$('cfg-fs').addEventListener('input', (e) => {
  $('val-fs').textContent = e.target.value + 'px';
});

// Color Pickers sync
function bindColorSync(colorId, hexId) {
  $(colorId).addEventListener('input', (e) => {
    $(hexId).value = e.target.value;
  });
  $(hexId).addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      $(colorId).value = e.target.value;
    }
  });
}

bindColorSync('cfg-dark-bg', 'cfg-dark-bg-hex');
bindColorSync('cfg-dark-border', 'cfg-dark-border-hex');
bindColorSync('cfg-light-bg', 'cfg-light-bg-hex');
bindColorSync('cfg-light-border', 'cfg-light-border-hex');

$('btn-save').addEventListener('click', saveConfig);
$('btn-reload').addEventListener('click', () => {
  loadConfig();
  loadStatus();
  showToast('کانفیگ مجدداً بارگذاری شد');
});

loadStatus();
loadConfig();
setInterval(loadStatus, 5000);
