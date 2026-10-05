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
    setBar('cpu-bar', info.cpuUsage);

    setText('total-memory', formatBytes(info.totalMemory));
    setText('free-memory', formatBytes(info.freeMemory));
    setText('used-memory', formatBytes(info.usedMemory));
    setText('used-memory-detail', formatBytes(info.usedMemory));
    setText('memory-percent', `${info.memoryUsagePercent.toFixed(1)}% em uso`);
    setBar('memory-bar', info.memoryUsagePercent);

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
    setText('heap-total', formatBytes(info.processMemory.heapTotal));

    const interfaces = info.network || [];
    setText('network-count', interfaces.length);
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
