import { NextResponse } from "next/server";
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Agent {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
  model: string;
  lastActivity: string;
  task: string;
  tokensUsed: number;
  costToday: number;
}

function getRecentActivity(): { task: string; time: string } {
  try {
    // Check recent memory files for activity
    const memoryPath = "/Users/travisassitant/.openclaw/workspace/memory";
    const today = new Date().toISOString().split('T')[0];
    const memoryFile = join(memoryPath, `${today}.md`);
    
    try {
      const content = readFileSync(memoryFile, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
      const lastActivity = lines.slice(-3)[0] || "Managing projects";
      return { task: lastActivity.substring(0, 50), time: "now" };
    } catch {
      return { task: "Monitoring systems", time: "now" };
    }
  } catch {
    return { task: "Active", time: "now" };
  }
}

function getActiveSessions(): number {
  try {
    // This would ideally check actual agent sessions
    return 1; // Just main agent for now
  } catch {
    return 1;
  }
}

export async function GET() {
  const activity = getRecentActivity();
  const sessionCount = getActiveSessions();
  
  const agents: Agent[] = [
    {
      id: "main",
      name: "OpenClaw Agent",
      status: "online",
      model: "moonshot/kimi-k2.5",
      lastActivity: activity.time,
      task: activity.task,
      tokensUsed: 0,
      costToday: 0
    }
  ];

  return NextResponse.json({ agents, count: sessionCount });
}
