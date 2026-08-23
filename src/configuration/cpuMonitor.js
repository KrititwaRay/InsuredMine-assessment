import os from 'node:os';


function getCpuSnapshot() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  return { idle, total };
}

/* Calculates average CPU usage percentage over a given interval (ms) */
function getCpuUsage(intervalMs = 1000) {
  return new Promise((resolve) => {
    const start = getCpuSnapshot();

    setTimeout(() => {
      const end = getCpuSnapshot();
      const idleDelta = end.idle - start.idle;
      const totalDelta = end.total - start.total;

      const usagePercentage = 100 - Math.floor((100 * idleDelta) / totalDelta);
      resolve(usagePercentage);
    }, intervalMs);
  });
}


export function startCpuMonitor({ threshold = 70, checkInterval = 5000 } = {}) {
  console.log(`[CPU Monitor] Started. Monitoring every ${checkInterval / 1000}s for threshold >= ${threshold}%.`);

  setInterval(async () => {
    try {
      const cpuUsage = await getCpuUsage(1000);
      console.log(`[CPU Monitor] Current CPU Usage: ${cpuUsage}%`);

      if (cpuUsage >= threshold) {
        console.warn(`[CPU Monitor] WARNING: CPU usage exceeded ${threshold}% limit (Current: ${cpuUsage}%). Initiating server restart...`);
        
        // Brief pause to allow console logs to flush before exiting
        setTimeout(() => {
          process.exit(1); // Exits process; PM2 / Nodemon will catch this and restart
        }, 500);
      }
    } catch (error) {
      console.error('[CPU Monitor] Error measuring CPU usage:', error);
    }
  }, checkInterval);
}

export default startCpuMonitor;