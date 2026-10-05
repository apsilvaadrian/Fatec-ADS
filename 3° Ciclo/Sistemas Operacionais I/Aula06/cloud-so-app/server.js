const express = require('express');
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

let previousCpu = null;

function getCpuUsage(cpus) {
  const idle = cpus.reduce((sum, cpu) => sum + cpu.times.idle, 0);
  const total = cpus.reduce((sum, cpu) => sum + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
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
    (addresses || []).map((address) => ({
      name,
      address: address.address,
      family: address.family,
      mac: address.mac,
      internal: address.internal
    }))
  );
}

function getProcesses() {
  return new Promise((resolve) => {
    const linuxArgs = ['-eo', 'pid,comm,%cpu,%mem,rss,etime', '--sort=-%cpu'];
    if (process.platform === 'win32') {
      execFile('tasklist', ['/FO', 'CSV', '/NH'], { timeout: 5000 }, (error, stdout) => {
        if (error) return resolve([]);
        const processes = stdout.split(/\r?\n/).filter(Boolean).slice(0, 40).map((line) => {
          const columns = line.match(/"([^"]*)"/g)?.map((value) => value.slice(1, -1)) || [];
          return {
            pid: Number(columns[1]) || 0,
            name: columns[0] || 'Desconhecido',
            cpu: 0,
            memory: columns[4] ? Number(columns[4].replace(/[^0-9]/g, '')) * 1024 : 0,
            elapsed: '—'
          };
        });
        resolve(processes);
      });
      return;
    }

    execFile('ps', linuxArgs, { timeout: 5000 }, (error, stdout) => {
      if (error) return resolve([]);
      const processes = stdout.split(/\r?\n/).slice(1).filter(Boolean).map((line) => {
        const match = line.trim().match(/^(\d+)\s+(.+?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+)\s+(\S+)$/);
        if (!match) return null;
        return {
          pid: Number(match[1]),
          name: match[2],
          cpu: Number(match[3]),
          memoryPercent: Number(match[4]),
          memory: Number(match[5]) * 1024,
          elapsed: match[6]
        };
      }).filter(Boolean);
      resolve(processes.slice(0, 40));
    });
  });
}

function getRuntimeInfo() {
  const versions = process.versions || {};
  return {
    v8: versions.v8 || 'Não informado',
    uv: versions.uv || 'Não informado',
    openssl: versions.openssl || 'Não informado',
    icu: versions.icu || 'Não informado',
    argv: process.argv || []
  };
}

function getEnvironmentInfo() {
  let user = 'Não informado';
  try { user = os.userInfo().username || user; } catch {}
  return {
    user,
    home: os.homedir(),
    cwd: process.cwd(),
    tmp: os.tmpdir(),
    shell: process.env.SHELL || process.env.ComSpec || 'Não informado',
    endianness: os.endianness(),
    eol: os.EOL,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    root: path.parse(process.cwd()).root,
    nodeExec: process.execPath
  };
}

function getResourceUsage() {
  const usage = process.resourceUsage();
  return {
    userCPUTime: usage.userCPUTime,
    systemCPUTime: usage.systemCPUTime,
    maxRSS: usage.maxRSS,
    fsRead: usage.fsRead,
    fsWrite: usage.fsWrite
  };
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
      heapTotal: processMemory.heapTotal,
      external: processMemory.external,
      arrayBuffers: processMemory.arrayBuffers
    },
    runtime: getRuntimeInfo(),
    environment: getEnvironmentInfo(),
    resourceUsage: getResourceUsage(),
    capturedAt: new Date().toISOString()
  };
}

app.get('/api/system', (_request, response) => response.json(getSystemInfo()));

app.get('/api/processes', async (_request, response) => {
  response.json({ processes: await getProcesses(), capturedAt: new Date().toISOString() });
});

app.get('/healthz', (_request, response) => response.status(200).json({ status: 'ok' }));

app.get('*', (_request, response) => response.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, '0.0.0.0', () => {
  console.log(`cloud-so-app disponível em http://localhost:${port}`);
});
