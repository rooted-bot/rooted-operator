import { NextResponse } from "next/server";

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

export async function GET() {
  const agents: Agent[] = [
    {
      id: "main",
      name: "OpenClaw Agent",
      status: "online",
      model: "moonshot/kimi-k2.5",
      lastActivity: "now",
      task: "Managing 5 active projects",
      tokensUsed: 0,
      costToday: 0
    }
  ];

  return NextResponse.json({ agents, count: 1 });
}
