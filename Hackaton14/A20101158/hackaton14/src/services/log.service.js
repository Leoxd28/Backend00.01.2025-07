const logs = [];


export function logEvent({ userId, role, action, ip, status }) {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, userId, role, action, ip, status });
  console.log(`[LOG] ${timestamp} | ${action} | user:${userId} (${role}) | ${status}`);
}


export function getAllLogs() {
  return logs;
}


export function clearLogs() {
  logs.length = 0;
}
