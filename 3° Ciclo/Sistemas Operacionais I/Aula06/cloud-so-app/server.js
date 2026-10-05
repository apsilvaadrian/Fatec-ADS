const express = require('express');
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

let previousCpu = null;

function getCpuUsage(cpus) {
  const idle = cpus.reduce((sum, cpu) => sum + cpu.times.idle, 0);
  const total = cpus.reduce(
    (sum, cpu) => sum + Object.values(cpu.times).reduce((a, b) => a + b, 0),
    0
  );

  if (!previousCpu) {
    previousCpu = { idle, total };
    return 0;
  }

  const idleDelta = idle - previousCpu.idle;
  const totalDelta = total - previousCpu.total;
  previousCpu = { idle, total };

  return totalDelta > 0 ? Math.max(0, Math.min(100, (1 - idleDelta / totalDelta) * 100)) : 0;
}

function getDiskInfo() {
  try {
    const stats = fs.statfsSync(path.parse(process.cwd()).root);
    const total = stats.blocks * stats.bsize;
    const free = stats.bfree * stats.bsize;
    return { total, free, used: Math.max(0, total - free) };
  } catch {
    return { total: 0, free: 0, used: 0 };
  }
}

function getNetworkInfo() {
  const interfaces = os.networkInterfaces();
  return Object.entries(interfaces).flatMap(([name, addresses]) =>
    (addresses || [])
      .filter((address) => !address.internal)
      .map((address) => ({
        name,
        address: address.address,
        family: address.family
      }))
  );
}

function getSystemInfo() {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const disk = getDiskInfo();
  const processMemory = process.memoryUsage();

  return {
    hostname: os.hostname(),
    platform: os.platform(),
    platformName: process.platform,
    release: os.release(),
    version: os.version(),
    architecture: os.arch(),
    cpuCount: cpus.length,
    cpuModel: cpus[0]?.model || 'Não informado',
    cpuSpeed: cpus[0]?.speed || 0,
    cpuUsage: getCpuUsage(cpus),
    totalMemory,
    freeMemory,
    usedMemory: Math.max(0, totalMemory - freeMemory),
    memoryUsagePercent: totalMemory ? ((totalMemory - freeMemory) / totalMemory) * 100 : 0,
    disk,
    uptime: os.uptime(),
    loadAverage: os.loadavg(),
    network: getNetworkInfo(),
    nodeVersion: process.version,
    processPid: process.pid,
    processUptime: process.uptime(),
    processMemory: {
      rss: processMemory.rss,
      heapUsed: processMemory.heapUsed,
      heapTotal: processMemory.heapTotal
    },
    capturedAt: new Date().toISOString()
  };
}

app.get('/api/system', (_request, response) => {
  response.json(getSystemInfo());
});

app.get('/healthz', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`cloud-so-app disponível em http://localhost:${port}`);
});
