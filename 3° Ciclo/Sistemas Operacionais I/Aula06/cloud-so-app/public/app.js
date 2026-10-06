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
    pushRealtimeSample(info);
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
themeToggle?.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; localStorage.setItem('cloud-so-theme', next); updateThemeButton(); refreshChartTheme(); refreshSensorChartTheme(); });

const sectionLinks = [...document.querySelectorAll('.sidebar .nav-link[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let navAutoScrolling = false;
let navAutoScrollTimer;

function setActiveNav(id) {
  if (!id) return;
  sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
}

function scrollToSection(id) {
  if (id === 'overview') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  navAutoScrolling = true;
  clearTimeout(navAutoScrollTimer);
  setActiveNav(id);
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  navAutoScrollTimer = setTimeout(() => {
    navAutoScrolling = false;
    setActiveNav(id);
  }, 1200);
}

function updateActiveNavigation() {
  if (navAutoScrolling) return;

  const marker = window.scrollY + 130;
  let current = sections[0];

  sections.forEach(section => {
    if (section.offsetTop <= marker) current = section;
  });

  setActiveNav(current?.id);
}

sectionLinks.forEach(link => link.addEventListener('click', (event) => {
  event.preventDefault();
  const id = link.getAttribute('href').slice(1);
  scrollToSection(id);
  $('sidebar')?.classList.remove('open');
}));

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
window.addEventListener('resize', updateActiveNavigation);
updateActiveNavigation();


/* Monitoramento em tempo real */
const chartHistory = { labels: [], cpu: [], ram: [], disk: [] };
const maxChartPoints = 12;
let cpuChart, ramChart, diskChart;

function getChartTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  return {
    text: dark ? '#94a3b8' : '#64748b',
    grid: dark ? 'rgba(148,163,184,.10)' : 'rgba(100,116,139,.10)',
    tooltip: dark ? '#0f172a' : '#ffffff'
  };
}

function buildChart(canvasId, label, dataKey, fill) {
  const canvas = $(canvasId);
  if (!canvas || !window.Chart) return null;
  const theme = getChartTheme();
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: chartHistory.labels,
      datasets: [{
        label,
        data: chartHistory[dataKey],
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#2563eb',
        backgroundColor: fill,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: .38,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 350 },
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          backgroundColor: theme.tooltip,
          titleColor: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
          bodyColor: theme.text,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--line').trim(),
          borderWidth: 1,
          padding: 10,
          callbacks: { label: (ctx) => label + ': ' + Number(ctx.parsed.y).toFixed(1) + '%' }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: theme.text, maxTicksLimit: 6, font: { size: 10 } }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: theme.grid },
          ticks: { color: theme.text, callback: (value) => value + '%', font: { size: 10 }, maxTicksLimit: 5 }
        }
      }
    }
  });
}

function initRealtimeCharts() {
  if (!window.Chart) return;
  cpuChart = buildChart('cpu-chart', 'CPU', 'cpu', 'rgba(37,99,235,.10)');
  ramChart = buildChart('ram-chart', 'RAM', 'ram', 'rgba(124,58,237,.10)');
  diskChart = buildChart('disk-chart', 'Disco', 'disk', 'rgba(8,145,178,.10)');
}

function refreshChartTheme() {
  [cpuChart, ramChart, diskChart].forEach((chart) => {
    if (!chart) return;
    const theme = getChartTheme();
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;
    chart.options.scales.x.grid.color = theme.grid;
    chart.options.scales.y.grid.color = theme.grid;
    chart.options.plugins.tooltip.backgroundColor = theme.tooltip;
    chart.options.plugins.tooltip.titleColor = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
    chart.options.plugins.tooltip.bodyColor = theme.text;
    chart.options.plugins.tooltip.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--line').trim();
    chart.update('none');
  });
}

function pushRealtimeSample(info) {
  const diskPercent = info.disk?.total ? (info.disk.used / info.disk.total) * 100 : 0;
  const time = new Date(info.capturedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  chartHistory.labels.push(time);
  chartHistory.cpu.push(Number(info.cpuUsage || 0));
  chartHistory.ram.push(Number(info.memoryUsagePercent || 0));
  chartHistory.disk.push(Number(diskPercent || 0));
  while (chartHistory.labels.length > maxChartPoints) {
    chartHistory.labels.shift(); chartHistory.cpu.shift(); chartHistory.ram.shift(); chartHistory.disk.shift();
  }
  setText('chart-cpu-current', Number(info.cpuUsage || 0).toFixed(1) + '%');
  setText('chart-ram-current', Number(info.memoryUsagePercent || 0).toFixed(1) + '%');
  setText('chart-disk-current', Number(diskPercent || 0).toFixed(1) + '%');
  [cpuChart, ramChart, diskChart].forEach((chart) => chart?.update('none'));
}

setTimeout(initRealtimeCharts, 0);


/* Sensores de GPU e temperatura */
const sensorHistory = { labels: [], gpu: [], cpuTemp: [], gpuTemp: [], vram: [] };
const sensorCharts = {};
const sensorMaxPoints = 12;
const validNumber = (value) => typeof value === 'number' && Number.isFinite(value);
const displayTemp = (value) => validNumber(value) ? value.toFixed(1) + ' °C' : 'Não disponível';
const displayPercent = (value) => validNumber(value) ? value.toFixed(1) + '%' : 'Não disponível';

function setTemperatureIndicator(barId, noteId, value) {
  const bar = $(barId);
  const note = $(noteId);
  if (bar) {
    bar.style.width = validNumber(value) ? Math.min(100, Math.max(0, value / 110 * 100)) + '%' : '0%';
    bar.classList.toggle('temp-warning', validNumber(value) && value >= 70 && value < 85);
    bar.classList.toggle('temp-high', validNumber(value) && value >= 85);
    bar.classList.toggle('temp-unavailable', !validNumber(value));
  }
  if (note) {
    note.textContent = !validNumber(value) ? 'Sensor não disponível' : value >= 85 ? 'Temperatura elevada · verifique a refrigeração' : value >= 70 ? 'Temperatura alta · acompanhe a evolução' : 'Leitura recebida do sensor';
  }
}

async function loadHardwareSensors() {
  try {
    const response = await fetch('/api/hardware', { cache: 'no-store' });
    if (!response.ok) throw new Error('Falha ao consultar sensores');
    const data = await response.json();
    const gpu = data.gpu || null;
    const cpuTemp = validNumber(data.cpuTemperature?.main) ? data.cpuTemperature.main
      : validNumber(data.cpuTemperature?.max) ? data.cpuTemperature.max : null;
    const gpuTemp = validNumber(gpu?.temperature) ? gpu.temperature : null;
    const gpuUsage = validNumber(gpu?.utilization) ? gpu.utilization : null;
    const vramTotal = validNumber(gpu?.memoryTotal) && gpu.memoryTotal > 0 ? gpu.memoryTotal
      : validNumber(gpu?.vram) && gpu.vram > 0 ? gpu.vram * 1024 * 1024 : 0;
    const vramUsed = validNumber(gpu?.memoryUsed) && gpu.memoryUsed > 0 ? gpu.memoryUsed : null;
    const vramPercent = vramTotal > 0 && vramUsed !== null ? Math.min(100, vramUsed / vramTotal * 100) : null;

    setText('gpu-model', gpu?.model || (data.gpus?.length ? 'GPU detectada' : 'GPU não identificada'));
    setText('gpu-vendor', 'Fabricante: ' + (gpu?.vendor || 'Não informado'));
    setText('gpu-vram', vramTotal > 0 ? formatBytes(vramTotal) : (validNumber(gpu?.vram) && gpu.vram > 0 ? gpu.vram + ' MB' : 'Não disponível'));
    setText('gpu-driver', gpu?.driver || 'Não informado');
    setText('gpu-clock', validNumber(gpu?.clockCore) ? gpu.clockCore + ' MHz' : 'Não disponível');
    setText('gpu-memory-clock', validNumber(gpu?.clockMemory) ? gpu.clockMemory + ' MHz' : 'Não disponível');
    setText('cpu-temp-current', displayTemp(cpuTemp));
    setText('gpu-temp-current', displayTemp(gpuTemp));
    setTemperatureIndicator('cpu-temp-bar', 'cpu-temp-note', cpuTemp);
    setTemperatureIndicator('gpu-temp-bar', 'gpu-temp-note', gpuTemp);
    setText('gpu-usage-current', displayPercent(gpuUsage));
    setText('cpu-temp-chart-current', displayTemp(cpuTemp));
    setText('gpu-temp-chart-current', displayTemp(gpuTemp));
    setText('vram-usage-current', displayPercent(vramPercent));
    setText('nav-gpu', gpuUsage !== null ? Math.round(gpuUsage) + '%' : '—');
    setText('sensor-status', 'sensores consultados');

    const time = new Date(data.capturedAt || Date.now()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    sensorHistory.labels.push(time);
    sensorHistory.gpu.push(gpuUsage);
    sensorHistory.cpuTemp.push(cpuTemp);
    sensorHistory.gpuTemp.push(gpuTemp);
    sensorHistory.vram.push(vramPercent);
    while (sensorHistory.labels.length > sensorMaxPoints) {
      for (const key of Object.keys(sensorHistory)) sensorHistory[key].shift();
    }
    Object.values(sensorCharts).forEach((chart) => chart?.update('none'));
  } catch (error) {
    setText('sensor-status', 'sensores indisponíveis');
    console.error(error);
  }
}

function buildSensorChart(canvasId, label, dataKey, color, unit, maxValue) {
  const canvas = $(canvasId);
  if (!canvas || !window.Chart) return null;
  const theme = getChartTheme();
  return new Chart(canvas, {
    type: 'line',
    data: { labels: sensorHistory.labels, datasets: [{
      label, data: sensorHistory[dataKey], borderColor: color,
      backgroundColor: color + '18', borderWidth: 2, pointRadius: 0,
      pointHoverRadius: 4, tension: .35, fill: true, spanGaps: false
    }] },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 300 },
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false, backgroundColor: theme.tooltip,
          titleColor: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
          bodyColor: theme.text, borderColor: getComputedStyle(document.documentElement).getPropertyValue('--line').trim(),
          borderWidth: 1, callbacks: { label: (ctx) => ctx.parsed.y == null ? label + ': Não disponível' : label + ': ' + Number(ctx.parsed.y).toFixed(1) + unit }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: theme.text, maxTicksLimit: 6, font: { size: 10 } } },
        y: { beginAtZero: true, ...(maxValue ? { max: maxValue } : {}), grid: { color: theme.grid }, ticks: { color: theme.text, callback: (value) => value + unit, maxTicksLimit: 5, font: { size: 10 } } }
      }
    }
  });
}

function initSensorCharts() {
  if (!window.Chart) return;
  sensorCharts.gpu = buildSensorChart('gpu-usage-chart', 'Uso da GPU', 'gpu', '#8b5cf6', '%', 100);
  sensorCharts.cpuTemp = buildSensorChart('cpu-temp-chart', 'Temperatura CPU', 'cpuTemp', '#ea580c', ' °C', 110);
  sensorCharts.gpuTemp = buildSensorChart('gpu-temp-chart', 'Temperatura GPU', 'gpuTemp', '#dc2626', ' °C', 110);
  sensorCharts.vram = buildSensorChart('vram-usage-chart', 'Uso da VRAM', 'vram', '#0891b2', '%', 100);
  refreshSensorChartTheme();
}

function refreshSensorChartTheme() {
  Object.values(sensorCharts).forEach((chart) => {
    if (!chart) return;
    const theme = getChartTheme();
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;
    chart.options.scales.x.grid.color = theme.grid;
    chart.options.scales.y.grid.color = theme.grid;
    chart.options.plugins.tooltip.backgroundColor = theme.tooltip;
    chart.options.plugins.tooltip.titleColor = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
    chart.options.plugins.tooltip.bodyColor = theme.text;
    chart.options.plugins.tooltip.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--line').trim();
    chart.update('none');
  });
}

setTimeout(initSensorCharts, 0);
loadHardwareSensors();
setInterval(loadHardwareSensors, 5000);
