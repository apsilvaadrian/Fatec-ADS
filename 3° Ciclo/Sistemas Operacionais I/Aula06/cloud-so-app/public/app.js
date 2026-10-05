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
    setText('node-version', info.nodeVersion);
    setText('process-pid', info.processPid);
    setText('process-uptime', formatDuration(info.processUptime));
    setText('rss-memory', formatBytes(info.processMemory.rss));
    setText('heap-used', formatBytes(info.processMemory.heapUsed));
    setText('heap-total', formatBytes(info.processMemory.heapTotal));

    const interfaces = info.network || [];
    setText('network-count', interfaces.length);
    const networkList = $('network-list');
    if (networkList) {
      networkList.innerHTML = interfaces.length
        ? interfaces.map((item) => `<div><span>${item.name}</span><code>${item.address}</code></div>`).join('')
        : '<div><span>Nenhuma interface externa detectada</span><code>—</code></div>';
    }

    setText('last-update', formatDate(info.capturedAt));
    setText('connection-status', 'online');
  } catch (error) {
    setText('hostname', 'Indisponível');
    setText('connection-status', 'offline');
    setText('last-update', 'erro de comunicação');
    console.error(error);
  }
}

loadSystemInfo();
setInterval(loadSystemInfo, 5000);
