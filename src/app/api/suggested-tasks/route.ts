import { NextResponse } from "next/server";

let tasks = [
  { id: "1", title: "Review security policies", description: "Update security documentation and policies", priority: "high", status: "today", assignee: "Alice", dueDate: "Today", tags: ["security", "docs"] },
  { id: "2", title: "Optimize database queries", description: "Identify and fix slow queries in analytics module", priority: "high", status: "in-progress", assignee: "Bob", dueDate: "Tomorrow", tags: ["performance", "database"] },
  { id: "3", title: "Update dependencies", description: "Upgrade to latest package versions", priority: "medium", status: "backlog", assignee: null, dueDate: null, tags: ["maintenance"] },
  { id: "4", title: "Write integration tests", description: "Add tests for new API endpoints", priority: "medium", status: "review", assignee: "Charlie", dueDate: "Today", tags: ["testing"] },
];

export async function GET() {
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newTask = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  
  return NextResponse.json({ task: newTask }, { status: 201 });
}
