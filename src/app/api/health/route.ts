import { NextResponse } from "next/server";

let startTime = Date.now();

export async function GET() {
  const uptime = Date.now() - startTime;
  
  // Get memory usage
  const memory = process.memoryUsage();
  
  return NextResponse.json({
    status: "healthy",
    uptime: Math.floor(uptime / 1000), // seconds
    uptimeFormatted: formatUptime(uptime),
    memory: {
      used: Math.floor(memory.heapUsed / 1024 / 1024), // MB
      total: Math.floor(memory.heapTotal / 1024 / 1024), // MB
      rss: Math.floor(memory.rss / 1024 / 1024), // MB
    },
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
}

function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}
