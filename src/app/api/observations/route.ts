import { NextResponse } from "next/server";

const observations = [
  { id: "1", message: "API response times increased by 15% in the last hour", type: "warning", source: "monitoring", timestamp: new Date().toISOString() },
  { id: "2", message: "3 new signups from enterprise tier", type: "info", source: "analytics", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "3", message: "Deployment completed successfully", type: "success", source: "deploy", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "4", message: "Database backup completed", type: "success", source: "backup", timestamp: new Date(Date.now() - 10800000).toISOString() },
  { id: "5", message: "High memory usage detected on worker-01", type: "warning", source: "monitoring", timestamp: new Date(Date.now() - 14400000).toISOString() },
];

export async function GET() {
  return NextResponse.json({ observations });
}
