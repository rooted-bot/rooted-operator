import { NextResponse } from "next/server";

const cronJobs = [
  { id: "1", name: "Daily Backup", schedule: "0 2 * * *", lastRun: "2 hours ago", nextRun: "22 hours", status: "idle" },
  { id: "2", name: "Health Check", schedule: "*/5 * * * *", lastRun: "3 minutes ago", nextRun: "2 minutes", status: "running" },
  { id: "3", name: "Report Generation", schedule: "0 9 * * 1", lastRun: "5 days ago", nextRun: "2 days", status: "idle" },
  { id: "4", name: "Cache Cleanup", schedule: "0 */6 * * *", lastRun: "4 hours ago", nextRun: "2 hours", status: "idle" },
  { id: "5", name: "Log Rotation", schedule: "0 0 * * *", lastRun: "8 hours ago", nextRun: "16 hours", status: "idle" },
];

export async function GET() {
  const healthy = cronJobs.filter(j => j.status !== "failed").length;
  const failed = cronJobs.filter(j => j.status === "failed").length;
  
  return NextResponse.json({
    jobs: cronJobs,
    summary: {
      total: cronJobs.length,
      healthy,
      failed,
      running: cronJobs.filter(j => j.status === "running").length,
    },
  });
}
