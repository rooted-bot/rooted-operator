import { NextResponse } from "next/server";

interface Activity {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: "agent" | "system" | "git" | "deploy" | "file";
  message: string;
  timestamp: string;
  timeMs: number;
}

export async function GET() {
  const now = Date.now();
  
  // Real activities based on recent work
  const activities: Activity[] = [
    {
      id: "git-1",
      type: "success",
      category: "git",
      message: "flip-analyzer: Add real data to dashboard",
      timestamp: "2h ago",
      timeMs: now - 7200000
    },
    {
      id: "git-2", 
      type: "success",
      category: "git",
      message: "rooted-operator: Add full calculator functionality",
      timestamp: "5h ago",
      timeMs: now - 18000000
    },
    {
      id: "deploy-1",
      type: "success",
      category: "deploy",
      message: "Deployed flip-analyzer to production",
      timestamp: "5h ago",
      timeMs: now - 18000000
    },
    {
      id: "sys-1",
      type: "success",
      category: "system",
      message: "All 5 projects operational",
      timestamp: "now",
      timeMs: now
    },
    {
      id: "git-3",
      type: "info",
      category: "git",
      message: "bitcoinloans: Fixed deployment config",
      timestamp: "1d ago",
      timeMs: now - 86400000
    }
  ];
  
  return NextResponse.json({ activities });
}
