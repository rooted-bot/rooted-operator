import { NextResponse } from "next/server";

const repositories = [
  { id: "1", name: "api-gateway", description: "Main API gateway service", language: "TypeScript", stars: 245, forks: 32, lastCommit: "2 hours ago", branch: "main", status: "passing", coverage: 87, openPRs: 4, openIssues: 12, isPrivate: false },
  { id: "2", name: "ai-agent-core", description: "Core AI agent framework", language: "Python", stars: 892, forks: 156, lastCommit: "30 minutes ago", branch: "main", status: "passing", coverage: 92, openPRs: 8, openIssues: 24, isPrivate: false },
  { id: "3", name: "dashboard-ui", description: "React dashboard frontend", language: "TypeScript", stars: 128, forks: 18, lastCommit: "5 hours ago", branch: "develop", status: "pending", coverage: 78, openPRs: 2, openIssues: 8, isPrivate: false },
  { id: "4", name: "data-pipeline", description: "Data processing pipeline", language: "Go", stars: 67, forks: 12, lastCommit: "1 day ago", branch: "main", status: "passing", coverage: 85, openPRs: 1, openIssues: 5, isPrivate: true },
  { id: "5", name: "ml-models", description: "Machine learning models", language: "Python", stars: 334, forks: 45, lastCommit: "3 days ago", branch: "main", status: "failing", coverage: 65, openPRs: 6, openIssues: 18, isPrivate: false },
  { id: "6", name: "auth-service", description: "Authentication microservice", language: "Rust", stars: 189, forks: 23, lastCommit: "12 hours ago", branch: "main", status: "passing", coverage: 94, openPRs: 0, openIssues: 3, isPrivate: false },
];

const commits = [
  { id: "1", message: "Fix: Resolve memory leak in agent pool", author: "Alice", timestamp: "30 min ago", sha: "a1b2c3d" },
  { id: "2", message: "Feat: Add streaming response support", author: "Bob", timestamp: "2 hours ago", sha: "e4f5g6h" },
  { id: "3", message: "Refactor: Improve error handling", author: "Charlie", timestamp: "5 hours ago", sha: "i7j8k9l" },
  { id: "4", message: "Docs: Update API documentation", author: "Diana", timestamp: "1 day ago", sha: "m0n1o2p" },
  { id: "5", message: "Chore: Update dependencies", author: "Eve", timestamp: "2 days ago", sha: "q3r4s5t" },
];

export async function GET() {
  return NextResponse.json({ repositories, commits });
}
