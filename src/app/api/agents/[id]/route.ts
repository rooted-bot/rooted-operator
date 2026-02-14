import { NextResponse } from "next/server";

const agents = [
  { id: "1", name: "Alice", status: "active", currentTask: "Code review for PR #234", lastOutput: "Found 3 potential issues in authentication.ts", model: "claude-3-opus", costToday: 12.45, tokensUsed: 125000, specialty: ["Code Review", "Architecture"], config: { temperature: 0.7, maxTokens: 4000 } },
  { id: "2", name: "Bob", status: "idle", currentTask: null, lastOutput: "Task completed: Documentation updated", model: "gpt-4", costToday: 8.20, tokensUsed: 89000, specialty: ["Writing", "Analysis"], config: { temperature: 0.5, maxTokens: 2000 } },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const agent = agents.find(a => a.id === params.id);
  
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
  
  return NextResponse.json({ agent });
}
