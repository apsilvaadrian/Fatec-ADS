const express = require('express');
const os = require('node:os');
const path = require('node:path');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

function getSystemInfo() {
  const cpus = os.cpus();
  const loadAverage = os.loadavg();

  return {
    hostname: os.hostname(),
    platform: os.platform(),
    platformName: process.platform,
    architecture: os.arch(),
    cpuCount: cpus.length,
    cpuModel: cpus[0]?.model || 'Não informado',
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    loadAverage,
    nodeVersion: process.version,
    processUptime: process.uptime(),
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
