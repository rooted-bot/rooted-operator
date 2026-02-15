import { execSync } from 'child_process';
import { NextResponse } from "next/server";
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

interface Activity {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: "agent" | "system" | "git" | "deploy" | "file";
  message: string;
  timestamp: string;
  timeMs: number;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getRecentGitCommits(): Activity[] {
  const activities: Activity[] = [];
  const workspace = "/Users/travisassitant/.openclaw/workspace";
  
  try {
    const projects = ['flip-analyzer', 'bitcoinloans', 'rooted-lending-v2', 'rooted-wealth', 'rooted-operator'];
    
    for (const project of projects) {
      try {
        const projectPath = join(workspace, project);
        const log = execSync(
          `cd "${projectPath}" && git log --oneline -3 --format="%h|%s|%ct" 2>/dev/null || echo ""`,
          { encoding: 'utf-8', timeout: 5000 }
        );
        
        if (log.trim()) {
          const lines = log.trim().split('\n').filter(Boolean);
          for (const line of lines) {
            const [hash, msg, timestamp] = line.split('|');
            if (hash && msg) {
              const date = new Date(parseInt(timestamp) * 1000);
              activities.push({
                id: `git-${project}-${hash}`,
                type: "info",
                category: "git",
                message: `${project}: ${msg.substring(0, 60)}${msg.length > 60 ? '...' : ''}`,
                timestamp: timeAgo(date),
                timeMs: date.getTime()
              });
            }
          }
        }
      } catch {
        // Skip projects without git
      }
    }
  } catch (e) {
    console.error('Git fetch error:', e);
  }
  
  return activities;
}

function getRecentFileActivity(): Activity[] {
  const activities: Activity[] = [];
  const workspace = "/Users/travisassitant/.openclaw/workspace";
  
  try {
    const memoryPath = join(workspace, 'memory');
    const files = readdirSync(memoryPath).filter(f => f.endsWith('.md'));
    
    for (const file of files.slice(-3)) {
      try {
        const stats = statSync(join(memoryPath, file));
        activities.push({
          id: `file-${file}`,
          type: "success",
          category: "file",
          message: `Memory updated: ${file}`,
          timestamp: timeAgo(stats.mtime),
          timeMs: stats.mtime.getTime()
        });
      } catch {}
    }
  } catch {}
  
  return activities;
}

function getSystemActivity(): Activity[] {
  const activities: Activity[] = [];
  
  // Add current session activity
  activities.push({
    id: 'sys-1',
    type: "success",
    category: "system",
    message: "Operator dashboard session active",
    timestamp: "now",
    timeMs: Date.now()
  });
  
  // Check for recent deployments
  try {
    const vercelOutput = execSync(
      'export PATH="$HOME/.npm-global/bin:$PATH" && vercel list --limit=3 2>/dev/null | grep -E "(flip-analyzer|bitcoinloans|rooted)" | head -5',
      { encoding: 'utf-8', timeout: 10000 }
    );
    
    if (vercelOutput.trim()) {
      activities.push({
        id: 'deploy-recent',
        type: "success",
        category: "deploy",
        message: "Recent deployments detected on Vercel",
        timestamp: "recent",
        timeMs: Date.now() - 60000
      });
    }
  } catch {}
  
  return activities;
}

export async function GET() {
  const activities: Activity[] = [
    ...getRecentGitCommits(),
    ...getRecentFileActivity(),
    ...getSystemActivity()
  ];
  
  // Sort by time (newest first) and limit to 15
  activities.sort((a, b) => b.timeMs - a.timeMs);
  const limited = activities.slice(0, 15);
  
  return NextResponse.json({ activities: limited });
}
