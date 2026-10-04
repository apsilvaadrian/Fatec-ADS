const $ = (id) => document.getElementById(id);

const formatBytes = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
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

const formatDate = (isoDate) => new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'medium'
}).format(new Date(isoDate));

async function loadSystemInfo() {
  try {
    const response = await fetch('/api/system');
    if (!response.ok) throw new Error('Falha ao consultar a API');
    const info = await response.json();
    const freePercent = (info.freeMemory / info.totalMemory) * 100;

    $('hostname').textContent = info.hostname;
    $('platform').textContent = info.platform;
    $('platform-name').textContent = info.platformName;
    $('architecture').textContent = info.architecture;
    $('cpu-count').textContent = info.cpuCount;
    $('cpu-model').textContent = info.cpuModel;
    $('total-memory').textContent = formatBytes(info.totalMemory);
    $('free-memory').textContent = formatBytes(info.freeMemory);
    $('memory-percent').textContent = `${freePercent.toFixed(1)}% disponível agora`;
    $('uptime').textContent = formatDuration(info.uptime);
    $('uptime-bar').style.width = `${Math.min(100, Math.max(7, (info.uptime % 86400) / 864))}%`;
    $('node-version').textContent = info.nodeVersion;
    $('process-uptime').textContent = formatDuration(info.processUptime);
    $('load-average').textContent = info.loadAverage.map((value) => value.toFixed(2)).join(' / ');
    $('last-update').textContent = formatDate(info.capturedAt);
  } catch (error) {
    $('hostname').textContent = 'Indisponível';
    $('last-update').textContent = 'erro de comunicação';
    console.error(error);
  }
}

loadSystemInfo();
setInterval(loadSystemInfo, 10000);
