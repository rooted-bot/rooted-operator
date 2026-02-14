import { NextResponse } from "next/server";

const agents = [
  { id: "1", name: "Alice", status: "active", currentTask: "Code review for PR #234", lastOutput: "Found 3 potential issues in authentication.ts", model: "claude-3-opus", costToday: 12.45, tokensUsed: 125000, specialty: ["Code Review", "Architecture"] },
  { id: "2", name: "Bob", status: "idle", currentTask: null, lastOutput: "Task completed: Documentation updated", model: "gpt-4", costToday: 8.20, tokensUsed: 89000, specialty: ["Writing", "Analysis"] },
  { id: "3", name: "Charlie", status: "active", currentTask: "Customer support ticket #4521", lastOutput: "Drafting response with technical details...", model: "claude-3-sonnet", costToday: 5.80, tokensUsed: 67000, specialty: ["Support", "Communication"] },
  { id: "4", name: "Diana", status: "offline", currentTask: null, lastOutput: "Agent shutdown: Maintenance mode", model: "gpt-4-turbo", costToday: 0, tokensUsed: 0, specialty: ["Research", "Data Analysis"] },
  { id: "5", name: "Eve", status: "active", currentTask: "Content generation for newsletter", lastOutput: "Generated 3 blog post ideas", model: "claude-3-haiku", costToday: 2.30, tokensUsed: 34000, specialty: ["Content", "Creative"] },
];

export async function GET() {
  return NextResponse.json({ agents });
}
