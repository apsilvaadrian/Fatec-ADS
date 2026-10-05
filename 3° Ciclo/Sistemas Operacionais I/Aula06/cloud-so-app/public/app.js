const $ = (id) => document.getElementById(id);

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1; }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
};

const formatDuration = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours || days) parts.push(`${hours}h`);
  if (minutes || hours || days) parts.push(`${minutes}min`);
  parts.push(`${secs}s`);
  return parts.join(' ');
};

const formatDate = (isoDate) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(isoDate));
const setText = (id, value) => { const element = $(id); if (element) element.textContent = value; };
const setBar = (id, percent) => { const element = $(id); if (element) element.style.width = `${Math.min(100, Math.max(0, percent || 0))}%`; };

function renderExtraPcInfo(info) {
  setText('ram-total-extra', formatBytes(info.memoryInfo?.total));
  setText('ram-used-extra', formatBytes(info.memoryInfo?.used));
  setText('ram-free-extra', formatBytes(info.memoryInfo?.free));
  setText('ram-percent-extra', info.memoryUsagePercent != null ? info.memoryUsagePercent.toFixed(1) + '%' : '—');
  setText('extra-hostname', info.osInfo?.hostname || '—');
  setText('extra-os-type', info.osInfo?.type || '—');
  setText('extra-platform', info.osInfo?.platform || '—');
  setText('extra-arch', info.osInfo?.arch || '—');
  setText('extra-release', info.osInfo?.release || '—');
  const cpuList = $('cpu-list');
  if (cpuList) cpuList.innerHTML = (info.cpuInfo || []).map(cpu => '<div class="info-row"><strong>CPU ' + cpu.id + '</strong><span>' + escapeHtml(cpu.model) + '</span><code>' + (cpu.speed || 0) + ' MHz</code></div>').join('');
  const diskList = $('disk-list-extra');
  if (diskList) diskList.innerHTML = (info.disks || []).map(d => '<div class="info-row"><strong>' + escapeHtml(d.drive) + '</strong><span>' + formatBytes(d.used) + ' usados</span><code>' + formatBytes(d.total) + '</code></div>').join('') || '<p class="empty-state">Não disponível</p>';
}

async function loadSystemInfo() {
  try {
    const response = await fetch('/api/system', { cache: 'no-store' });
    if (!response.ok) throw new Error('Falha ao consultar a API');
    const info = await response.json();

    setText('hostname', info.hostname);
    setText('platform', info.platform);
    setText('platform-name', info.platformName);
    setText('architecture', info.architecture);
    setText('os-release', info.release);
    setText('os-version', info.version || 'Não informado');
    setText('platform-detail', `${info.platform} (${info.platformName})`);

    setText('cpu-count', info.cpuCount);
    setText('cpu-model', info.cpuModel);
    setText('cpu-model-detail', info.cpuModel);
    setText('cpu-speed', info.cpuSpeed ? `${info.cpuSpeed} MHz` : 'Não informado');
    setText('cpu-usage', `${info.cpuUsage.toFixed(1)}%`);
    setText('nav-cpu', `${info.cpuUsage.toFixed(0)}%`);
    setBar('cpu-bar', info.cpuUsage);

    setText('total-memory', formatBytes(info.totalMemory));
    setText('free-memory', formatBytes(info.freeMemory));
    setText('used-memory', formatBytes(info.usedMemory));
    setText('used-memory-detail', formatBytes(info.usedMemory));
    setText('memory-percent', `${info.memoryUsagePercent.toFixed(1)}% em uso`);
    setBar('memory-bar', info.memoryUsagePercent);
    setText('nav-ram', `${info.memoryUsagePercent.toFixed(0)}%`);

    setText('disk-total', formatBytes(info.disk.total));
    setText('disk-used', formatBytes(info.disk.used));
    setText('disk-used-detail', formatBytes(info.disk.used));
    setText('disk-free', formatBytes(info.disk.free));
    const diskPercent = info.disk.total ? (info.disk.used / info.disk.total) * 100 : 0;
    setText('disk-percent', info.disk.total ? `${diskPercent.toFixed(1)}% ocupado` : 'Não disponível');
    setBar('disk-bar', diskPercent);

    setText('uptime', formatDuration(info.uptime));
    setText('load-average', (info.loadAverage || []).map((value) => Number(value).toFixed(2)).join(' · ') || 'Não disponível');
    setText('node-version', info.nodeVersion);
    setText('process-pid', info.processPid);
    setText('process-uptime', formatDuration(info.processUptime));
    setText('rss-memory', formatBytes(info.processMemory.rss));
    setText('heap-used', formatBytes(info.processMemory.heapUsed));
    setText('heap-total', formatBytes(info.processMemory.heapTotal));

    setText('system-user', info.environment?.user || 'Não informado');
    setText('home-dir', info.environment?.home || 'Não informado');
    setText('cwd', info.environment?.cwd || 'Não informado');
    setText('tmp-dir', info.environment?.tmp || 'Não informado');
    setText('shell', info.environment?.shell || 'Não informado');
    setText('cpu-endianness', info.environment?.endianness || 'Não informado');
    setText('eol', info.environment?.eol === '\r\n' ? 'CRLF (Windows)' : 'LF (Unix/Linux/macOS)');
    setText('timezone', info.environment?.timezone || 'UTC');
    setText('root-dir', info.environment?.root || 'Não informado');
    setText('node-exec', info.environment?.nodeExec || 'Não informado');
    setText('v8-version', info.runtime?.v8 || 'Não informado');
    setText('uv-version', info.runtime?.uv || 'Não informado');
    setText('openssl-version', info.runtime?.openssl || 'Não informado');
    setText('icu-version', info.runtime?.icu || 'Não informado');
    setText('exec-argv', (info.runtime?.argv || []).join(' ') || 'Não informado');
    setText('user-cpu-time', info.resourceUsage ? `${(info.resourceUsage.userCPUTime / 1000).toFixed(1)} ms` : '—');
    setText('system-cpu-time', info.resourceUsage ? `${(info.resourceUsage.systemCPUTime / 1000).toFixed(1)} ms` : '—');
    setText('max-rss', info.resourceUsage ? formatBytes(info.resourceUsage.maxRSS * 1024) : '—');
    setText('fs-read', info.resourceUsage?.fsRead ?? '—');
    setText('fs-write', info.resourceUsage?.fsWrite ?? '—');

    const interfaces = info.network || [];
    setText('network-count', interfaces.length);
    setText('nav-net', interfaces.length);
    renderNetworkManager(interfaces);
    const networkList = $('network-list');
    if (networkList) {
      networkList.innerHTML = interfaces.length
        ? interfaces.map((item) => `<div><span>${item.name}</span><code>${item.address}</code></div>`).join('')
        : '<div><span>Nenhuma interface externa detectada</span><code>—</code></div>';
    }

    setText('last-update', formatDate(info.capturedAt));
    setText('connection-status', 'online');
    setText('sidebar-status', 'Online');
    renderExtraPcInfo(info);
    window.latestSystemInfo = info;
  } catch (error) {
    setText('hostname', 'Indisponível');
    setText('connection-status', 'offline');
    setText('sidebar-status', 'Offline');
    setText('last-update', 'erro de comunicação');
    console.error(error);
  }
}

loadSystemInfo();
setInterval(loadSystemInfo, 5000);

function renderNetworkManager(interfaces) {
  const container = $('network-manager-list');
  if (!container) return;
  container.innerHTML = interfaces.length ? interfaces.map((item) =>
    '<div class="network-manager-item"><div><strong>' + escapeHtml(item.name) + '</strong><span>' + escapeHtml(item.family) + '</span></div><code>' + escapeHtml(item.address) + '</code><small>' + escapeHtml(item.mac || 'MAC não informado') + (item.internal ? ' · interna' : ' · externa') + '</small></div>'
  ).join('') : '<p class="empty-state">Nenhuma interface encontrada.</p>';
}

const processState = { items: [] };
const formatProcessMemory = (bytes) => formatBytes(bytes);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

async function loadProcesses() {
  try {
    const response = await fetch('/api/processes', { cache: 'no-store' });
    if (!response.ok) throw new Error('Falha ao consultar processos');
    const data = await response.json();
    processState.items = data.processes || [];
    renderProcesses();
  } catch (error) {
    const body = $('process-table-body');
    if (body) body.innerHTML = '<tr><td colspan="5" class="empty-state">Não foi possível consultar os processos deste ambiente.</td></tr>';
    console.error(error);
  }
}

function renderProcesses() {
  const body = $('process-table-body');
  if (!body) return;
  const query = ($('process-search')?.value || '').toLowerCase().trim();
  const sort = $('process-sort')?.value || 'cpu';
  const items = processState.items.filter((item) => !query || String(item.name).toLowerCase().includes(query) || String(item.pid).includes(query))
    .sort((a, b) => sort === 'memory' ? (b.memory || 0) - (a.memory || 0) : (b.cpu || 0) - (a.cpu || 0));
  setText('process-count', processState.items.length);
  body.innerHTML = items.length ? items.map((item) => '<tr><td><strong>' + escapeHtml(item.name) + '</strong></td><td><code>' + item.pid + '</code></td><td><span class="usage-value">' + Number(item.cpu || 0).toFixed(1) + '%</span></td><td>' + formatProcessMemory(item.memory || 0) + '<small>' + (item.memoryPercent ? ' · ' + Number(item.memoryPercent).toFixed(1) + '%' : '') + '</small></td><td>' + escapeHtml(item.elapsed || '—') + '</td></tr>').join('') : '<tr><td colspan="5" class="empty-state">Nenhum processo encontrado.</td></tr>';
}

loadProcesses();
setInterval(loadProcesses, 5000);
$('process-search')?.addEventListener('input', renderProcesses);
$('process-sort')?.addEventListener('change', renderProcesses);
function downloadFile(filename, content, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url); }
function buildExportData() { return { exportedAt: new Date().toISOString(), system: window.latestSystemInfo || null, processes: processState.items || [] }; }
$('export-json')?.addEventListener('click', () => downloadFile('cloud-so-system-report.json', JSON.stringify(buildExportData(), null, 2), 'application/json;charset=utf-8'));
$('export-csv')?.addEventListener('click', () => { const rows = [['Processo','PID','CPU (%)','Memória (bytes)','Memória (%)','Tempo']]; (processState.items || []).forEach((item) => rows.push([item.name,item.pid,item.cpu ?? 0,item.memory ?? 0,item.memoryPercent ?? '',item.elapsed ?? ''])); const csv = rows.map(row => row.map(value => '"' + String(value).replace(/"/g,'""') + '"').join(';')).join('\n'); downloadFile('cloud-so-processes.csv','\ufeff'+csv,'text/csv;charset=utf-8'); });
$('refresh-now')?.addEventListener('click', () => { loadSystemInfo(); loadProcesses(); });
$('mobile-menu')?.addEventListener('click', () => $('sidebar')?.classList.toggle('open'));
document.querySelectorAll('.nav-link[href]').forEach(link => link.addEventListener('click', () => $('sidebar')?.classList.remove('open')));


const themeToggle = $('theme-toggle');
const savedTheme = localStorage.getItem('cloud-so-theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
function updateThemeButton() { if (themeToggle) themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀ Claro' : '☾ Escuro'; }
updateThemeButton();
themeToggle?.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; localStorage.setItem('cloud-so-theme', next); updateThemeButton(); });

const sectionLinks = [...document.querySelectorAll('.sidebar .nav-link[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionById = new Map(sections.map(s => [s.id, s]));
let manualActive = null;
let navObserver;

function setActiveNav(id) {
  if (!id) return;
  manualActive = id;
  sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
}

function setupActiveNavigation() {
  if (navObserver) navObserver.disconnect();
  navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) {
      const best = visible.reduce((a,b) => Math.abs(a.boundingClientRect.top-150) < Math.abs(b.boundingClientRect.top-150) ? a : b);
      setActiveNav(best.target.id);
    }
  }, { root:null, rootMargin:'-105px 0px -55% 0px', threshold:[0,0.1,0.25] });
  sections.forEach(section => navObserver.observe(section));
}
sectionLinks.forEach(link => link.addEventListener('click', () => {
  const id = link.getAttribute('href').slice(1);
  setActiveNav(id);
  setTimeout(() => { manualActive = null; }, 700);
}));
setupActiveNavigation();
