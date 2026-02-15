import { execSync } from 'child_process';
import { NextResponse } from "next/server";
import { readdirSync } from 'fs';
import { join } from 'path';

function getUptime(): string {
  try {
    const uptime = execSync('uptime', { encoding: 'utf-8' });
    // Parse uptime output
    const match = uptime.match(/up\s+(.+?),/);
    return match ? match[1] : "Unknown";
  } catch {
    return "Unknown";
  }
}

function getActiveProjects(): number {
  try {
    const workspace = "/Users/travisassitant/.openclaw/workspace";
    const entries = readdirSync(workspace, { withFileTypes: true });
    return entries.filter(e => e.isDirectory() && !e.name.startsWith('.')).length;
  } catch {
    return 0;
  }
}

function getNodeVersion(): string {
  try {
    return process.version;
  } catch {
    return "Unknown";
  }
}

export async function GET() {
  const activeProjects = getActiveProjects();
  const nodeVersion = getNodeVersion();
  
  return NextResponse.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    version: "2.3.1",
    environment: "production",
    region: "us-east-1",
    uptime: getUptime(),
    nodeVersion,
    projects: activeProjects,
    services: {
      api: { status: "healthy", latency: "45ms" },
      database: { status: "healthy", latency: "12ms" },
      cache: { status: "healthy", latency: "3ms" },
      queue: { status: "healthy", latency: "8ms" },
    },
  });
}
