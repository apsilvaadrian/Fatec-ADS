const express = require('express');
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const si = require('systeminformation');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

let previousCpu = null;
const projectStatsCache = { capturedAt: 0, value: null };

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

function getDiskList() {
  const root = path.parse(process.cwd()).root;
  try {
    const stats = fs.statfsSync(root);
    const total = stats.blocks * stats.bsize;
    const free = stats.bfree * stats.bsize;
    return [{ drive: root, total, free, used: Math.max(0, total - free) }];
  } catch { return []; }
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

function getPrimaryIp(network) {
  return network.find((item) => !item.internal && item.family === 'IPv4')?.address
    || network.find((item) => item.family === 'IPv4')?.address
    || null;
}

function getProjectStats() {
  const now = Date.now();
  if (projectStatsCache.value && now - projectStatsCache.capturedAt < 30000) return projectStatsCache.value;

  const ignoredDirectories = new Set(['.git', 'node_modules']);
  let fileCount = 0;
  let directoryCount = 0;

  function visit(directory) {
    let entries = [];
    try { entries = fs.readdirSync(directory, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (ignoredDirectories.has(entry.name)) continue;
        directoryCount += 1;
        visit(path.join(directory, entry.name));
      } else if (entry.isFile()) {
        fileCount += 1;
      }
    }
  }

  visit(__dirname);
  projectStatsCache.value = { fileCount, directoryCount, root: __dirname };
  projectStatsCache.capturedAt = now;
  return projectStatsCache.value;
}

function getDeploymentInfo() {
  const isRender = Boolean(process.env.RENDER || process.env.RENDER_SERVICE_ID);
  const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT_NAME || process.env.RAILWAY_PROJECT_ID);
  const isVercel = Boolean(process.env.VERCEL);
  const provider = isRender ? 'Render' : isRailway ? 'Railway' : isVercel ? 'Vercel' : 'Execução local';
  const cloud = isRender || isRailway || isVercel;

  return {
    mode: cloud ? 'cloud' : 'local',
    provider,
    port,
    portSource: process.env.PORT ? 'Variável PORT' : 'Padrão local (3000)',
    nodeEnvironment: process.env.NODE_ENV || 'development',
    variables: {
      PORT: String(port),
      NODE_ENV: process.env.NODE_ENV || 'development',
      RENDER: isRender ? 'detectado' : 'não definido',
      RAILWAY: isRailway ? 'detectado' : 'não definido'
    }
  };
}

function getSystemStatus(cpuUsage, memoryUsagePercent, diskPercent) {
  const values = [cpuUsage, memoryUsagePercent, diskPercent].filter((value) => Number.isFinite(value));
  const highest = values.length ? Math.max(...values) : 0;
  if (highest >= 90) {
    return { state: 'attention', label: 'Atenção', message: `Recurso acima de 90% (${highest.toFixed(1)}%)` };
  }
  if (highest >= 75) {
    return { state: 'warning', label: 'Monitorar', message: `Maior recurso em ${highest.toFixed(1)}%` };
  }
  return { state: 'ok', label: 'Normal', message: 'Recursos dentro dos limites observados' };
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

function runPowerShellJson(script, timeout = 5000) {
  if (process.platform !== 'win32') return Promise.resolve(null);

  return new Promise((resolve) => {
    execFile(
      'powershell.exe',
      ['-NoLogo', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { timeout, maxBuffer: 1024 * 1024 },
      (error, stdout) => {
        if (error || !stdout?.trim()) return resolve(null);
        try {
          resolve(JSON.parse(stdout.trim()));
        } catch {
          resolve(null);
        }
      }
    );
  });
}

function asArray(value) {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function validSensorValue(value, min = 0, max = 150) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

function parseMonitorNumber(value) {
  if (typeof value === 'number') return value;
  const match = String(value ?? '').replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function flattenHardwareMonitorTree(node, parents = [], result = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => flattenHardwareMonitorTree(child, parents, result));
    return result;
  }
  if (!node || typeof node !== 'object') return result;

  const name = node.Text || node.Name || node.name || '';
  const sensorType = node.Type || node.SensorType || node.sensorType || '';
  const value = parseMonitorNumber(node.Value ?? node.value);
  if (sensorType && value !== null) {
    result.push({
      provider: 'LibreHardwareMonitor HTTP',
      name: String(name),
      sensorType: String(sensorType),
      value,
      identifier: node.SensorId || node.Identifier || node.identifier || '',
      parent: parents.join(' '),
      hardwareType: node.HardwareType || ''
    });
  }

  if (Array.isArray(node.Children)) {
    flattenHardwareMonitorTree(node.Children, name ? [...parents, name] : parents, result);
  }
  return result;
}

async function getLibreHardwareMonitorHttpSensors() {
  if (typeof fetch !== 'function') return [];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetch('http://127.0.0.1:8085/data.json', {
      signal: controller.signal,
      headers: { accept: 'application/json' }
    });
    if (!response.ok) return [];
    return flattenHardwareMonitorTree(await response.json());
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

async function getWindowsMonitorSensors() {
  if (process.platform !== 'win32') return { provider: null, sensors: [] };

  // LibreHardwareMonitor e OpenHardwareMonitor são os únicos provedores
  // conhecidos que expõem, de forma consistente, temperatura de CPU/GPU no Windows.
  const script = [
    '$ErrorActionPreference = "SilentlyContinue"',
    '$items = @()',
    'foreach ($namespace in @("root/LibreHardwareMonitor", "root/OpenHardwareMonitor")) {',
    '  try {',
    '    $provider = ($namespace -split "/")[-1]',
    '    foreach ($sensor in (Get-CimInstance -Namespace $namespace -ClassName Sensor -ErrorAction Stop)) {',
    '      $items += [pscustomobject]@{ provider = $provider; name = [string]$sensor.Name; sensorType = [string]$sensor.SensorType; value = [double]$sensor.Value; identifier = [string]$sensor.Identifier; parent = [string]$sensor.Parent; hardwareType = [string]$sensor.HardwareType }',
    '    }',
    '  } catch {}',
    '}',
    '$items | ConvertTo-Json -Compress -Depth 4'
  ].join(';');

  const [wmiResult, httpResult] = await Promise.all([
    runPowerShellJson(script),
    getLibreHardwareMonitorHttpSensors()
  ]);
  const httpSensors = asArray(httpResult);
  const wmiSensors = asArray(wmiResult);
  const sensors = httpSensors.length ? httpSensors : wmiSensors;
  const provider = sensors[0]?.provider || null;
  return { provider, sensors };
}

async function getWindowsGpuUsage() {
  if (process.platform !== 'win32') return null;

  // O contador nativo funciona mesmo quando o driver não fornece temperatura.
  // O maior valor representa o engine mais ocupado da GPU naquele instante.
  const script = [
    '$ErrorActionPreference = "SilentlyContinue"',
    '$samples = (Get-Counter "\\GPU Engine(*)\\Utilization Percentage" -ErrorAction SilentlyContinue).CounterSamples',
    '$max = ($samples | Where-Object { $_.CookedValue -ge 0 } | Measure-Object -Property CookedValue -Maximum).Maximum',
    'if ($null -ne $max) { [pscustomobject]@{ value = [double]$max } | ConvertTo-Json -Compress }'
  ].join(';');

  const result = await runPowerShellJson(script, 9000);
  const value = validSensorValue(result?.value, 0, 1000);
  return value === null ? null : Math.min(100, value);
}

const gpuUsageCache = { capturedAt: 0, value: null, pending: null };

async function getCachedWindowsGpuUsage() {
  const now = Date.now();
  if (gpuUsageCache.capturedAt && now - gpuUsageCache.capturedAt < 8000) return gpuUsageCache.value;
  if (gpuUsageCache.pending) return gpuUsageCache.pending;

  gpuUsageCache.pending = getWindowsGpuUsage()
    .then((value) => {
      gpuUsageCache.value = value;
      gpuUsageCache.capturedAt = Date.now();
      return value;
    })
    .finally(() => {
      gpuUsageCache.pending = null;
    });
  return gpuUsageCache.pending;
}

function sensorIdentity(sensor) {
  return [sensor.name, sensor.parent, sensor.identifier, sensor.hardwareType]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function findMonitorTemperature(sensors, kind) {
  const candidates = sensors.filter((sensor) => {
    const type = String(sensor.sensorType || '').toLowerCase();
    const identity = sensorIdentity(sensor);
    const isTemperature = type === 'temperature' || type === 'temperature sensor';
    const isGpu = /gpu|graphics|radeon|geforce|nvidia|arc|display/.test(identity);
    const isCpu = /cpu|processor|package|tdie|tctl|core|ryzen|zen|apu/.test(identity);
    return isTemperature && (kind === 'gpu' ? isGpu : isCpu) && validSensorValue(sensor.value, 1, 150) !== null;
  });

  if (!candidates.length) return { value: null, cores: [] };
  const preferred = kind === 'gpu'
    ? candidates.find((sensor) => /core|edge|junction|hot spot/i.test(String(sensor.name)))
    : candidates.find((sensor) => /package|tdie|tctl|cpu/i.test(String(sensor.name)));
  const selected = preferred || candidates[0];
  return {
    value: validSensorValue(selected.value, 1, 150),
    cores: kind === 'cpu' ? candidates.map((sensor) => validSensorValue(sensor.value, 1, 150)).filter((value) => value !== null) : []
  };
}

function findMonitorGpuUsage(sensors) {
  const values = sensors
    .filter((sensor) => {
      const type = String(sensor.sensorType || '').toLowerCase();
      const identity = sensorIdentity(sensor);
      return (type === 'load' || type === 'utilization') && /gpu|graphics|radeon|geforce|nvidia|arc|display/.test(identity);
    })
    .map((sensor) => validSensorValue(sensor.value, 0, 100))
    .filter((value) => value !== null);

  return values.length ? Math.min(100, Math.max(...values)) : null;
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
  const network = getNetworkInfo();
  const cpuUsage = getCpuUsage(cpus);
  const memoryUsagePercent = totalMemory ? ((totalMemory - freeMemory) / totalMemory) * 100 : 0;
  const diskUsagePercent = disk.total ? (disk.used / disk.total) * 100 : 0;
  const project = getProjectStats();
  const deployment = getDeploymentInfo();

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
    cpuUsage,
    totalMemory,
    freeMemory,
    usedMemory: Math.max(0, totalMemory - freeMemory),
    memoryUsagePercent,
    diskUsagePercent,
    primaryIp: getPrimaryIp(network),
    project,
    deployment,
    systemStatus: getSystemStatus(cpuUsage, memoryUsagePercent, diskUsagePercent),
    disk,
    disks: getDiskList(),
    cpuInfo: cpus.map((cpu, index) => ({
      id: index + 1,
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times
    })),
    memoryInfo: {
      total: totalMemory,
      free: freeMemory,
      used: Math.max(0, totalMemory - freeMemory)
    },
    osInfo: {
      hostname: os.hostname(),
      type: os.type(),
      release: os.release(),
      version: os.version(),
      platform: os.platform(),
      arch: os.arch(),
      machine: process.arch,
      endianness: os.endianness()
    },
    uptime: os.uptime(),
    loadAverage: os.loadavg(),
    network,
    networkStats: { interfaceCount: Object.keys(os.networkInterfaces()).length },
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


app.get('/api/hardware', async (_request, response) => {
  const capturedAt = new Date().toISOString();
  const unavailable = { gpu: null, cpuTemperature: null, sensorStatus: { available: false }, capturedAt };
  try {
    const [graphicsResult, cpuTempResult, monitorResult, gpuUsageResult] = await Promise.allSettled([
      si.graphics(),
      si.cpuTemperature(),
      getWindowsMonitorSensors(),
      getCachedWindowsGpuUsage()
    ]);
    const controllers = graphicsResult.status === 'fulfilled' ? (graphicsResult.value.controllers || []) : [];
    const monitor = monitorResult.status === 'fulfilled' ? monitorResult.value : { provider: null, sensors: [] };
    const monitorCpuTemperature = findMonitorTemperature(monitor.sensors, 'cpu');
    const monitorGpuTemperature = findMonitorTemperature(monitor.sensors, 'gpu');
    const monitorGpuUsage = findMonitorGpuUsage(monitor.sensors);
    const nativeGpuUsage = gpuUsageResult.status === 'fulfilled' ? gpuUsageResult.value : null;
    const windowsGpuUsage = monitorGpuUsage ?? nativeGpuUsage;
    const isVirtualController = (controller) => {
      const identity = [
        controller.model,
        controller.vendor,
        controller.subVendor,
        controller.driverVersion,
        controller.driver
      ].filter(Boolean).join(' ').toLowerCase();

      return /parsec|virtual|microsoft basic display|microsoft remote display|remote display|indirect display|rdp|vmware|virtualbox|hyper-v/.test(identity);
    };

    // O Windows pode listar adaptadores virtuais (ex.: Parsec) junto da GPU real.
    // Priorizamos controladores físicos para não apresentar um adaptador de acesso remoto como GPU.
    const physicalControllers = controllers.filter((controller) => !isVirtualController(controller));
    const selectedControllers = physicalControllers.length ? physicalControllers : controllers.filter((controller) => !/parsec/i.test(String(controller.model || '')));
    const gpu = selectedControllers.map((controller) => ({
      model: controller.model || 'GPU não identificada',
      vendor: controller.vendor || 'Não informado',
      vram: Number(controller.vram) || 0,
      memoryTotal: Number(controller.memoryTotal) || 0,
      memoryUsed: Number(controller.memoryUsed) || 0,
      utilization: Number.isFinite(Number(controller.utilizationGpu)) && controller.utilizationGpu !== null && Number(controller.utilizationGpu) >= 0 ? Number(controller.utilizationGpu) : windowsGpuUsage,
      temperature: Number.isFinite(Number(controller.temperatureGpu)) && controller.temperatureGpu !== null && Number(controller.temperatureGpu) > 0 ? Number(controller.temperatureGpu) : monitorGpuTemperature.value,
      clockCore: Number.isFinite(Number(controller.clockCore)) && controller.clockCore !== null ? Number(controller.clockCore) : null,
      clockMemory: Number.isFinite(Number(controller.clockMemory)) && controller.clockMemory !== null ? Number(controller.clockMemory) : null,
      driver: controller.driverVersion || controller.driver || 'Não informado'
    }));
    const temp = cpuTempResult.status === 'fulfilled' ? cpuTempResult.value : {};
    const systemInformationCpuTemperature = validSensorValue(temp.main, 1, 150) ?? validSensorValue(temp.max, 1, 150);
    const cpuMainTemperature = systemInformationCpuTemperature ?? monitorCpuTemperature.value;
    const cpuCores = Array.isArray(temp.cores) && temp.cores.length
      ? temp.cores.filter((value) => validSensorValue(value, 1, 150) !== null)
      : monitorCpuTemperature.cores;
    const cpuTemperature = {
      main: cpuMainTemperature,
      max: validSensorValue(temp.max, 1, 150) ?? (cpuCores.length ? Math.max(...cpuCores) : cpuMainTemperature),
      cores: cpuCores
    };
    const selectedGpu = gpu[0] || null;
    const systemInformationGpuUsage = selectedGpu?.utilization !== null && selectedGpu?.utilization !== undefined
      ? selectedGpu.utilization
      : null;
    const gpuTemperatureAvailable = selectedGpu?.temperature !== null && selectedGpu?.temperature !== undefined;
    const cpuTemperatureAvailable = cpuTemperature.main !== null;
    const gpuUsageAvailable = systemInformationGpuUsage !== null || windowsGpuUsage !== null;
    const sensorStatus = {
      available: gpuUsageAvailable || cpuTemperatureAvailable || gpuTemperatureAvailable,
      provider: monitor.provider || 'Windows nativo',
      sources: {
        gpuUsage: systemInformationGpuUsage !== null && systemInformationGpuUsage !== windowsGpuUsage
          ? 'systeminformation/driver'
          : windowsGpuUsage !== null ? 'contador GPU do Windows' : null,
        cpuTemperature: systemInformationCpuTemperature !== null ? 'ACPI/systeminformation' : monitorCpuTemperature.value !== null ? monitor.provider : null,
        gpuTemperature: selectedGpu?.temperature !== null && selectedGpu?.temperature !== undefined
          ? monitorGpuTemperature.value !== null ? monitor.provider : 'systeminformation/driver'
          : null
      },
      message: !gpuUsageAvailable && !cpuTemperatureAvailable && !gpuTemperatureAvailable
        ? 'Nenhum sensor adicional foi exposto pelo Windows.'
        : !cpuTemperatureAvailable && !gpuTemperatureAvailable
          ? 'Uso da GPU disponível; temperaturas exigem um provedor de sensores no Windows.'
          : 'Sensores consultados',
      help: !cpuTemperatureAvailable || !gpuTemperatureAvailable
        ? 'Para temperaturas, execute o LibreHardwareMonitor como administrador e mantenha-o aberto.'
        : null
    };
    response.json({
      gpu: selectedGpu,
      gpus: gpu,
      ignoredVirtualGpus: controllers.filter(isVirtualController).map((controller) => controller.model || 'Adaptador virtual'),
      cpuTemperature,
      sensorStatus,
      capturedAt
    });
  } catch (error) {
    response.json({ ...unavailable, error: 'Não foi possível consultar os sensores deste ambiente.' });
  }
});

app.get('/api/processes', async (_request, response) => {
  response.json({ processes: await getProcesses(), capturedAt: new Date().toISOString() });
});

app.get('/healthz', (_request, response) => response.status(200).json({ status: 'ok' }));

app.get('*', (_request, response) => response.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, '0.0.0.0', () => {
  console.log(`cloud-so-app disponível em http://localhost:${port}`);
});
