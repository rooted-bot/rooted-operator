import { NextResponse } from "next/server";

const priorities = [
  { id: "1", title: "Fix critical security vulnerability", priority: "high", deadline: "Today", category: "Security" },
  { id: "2", title: "Prepare for product launch", priority: "high", deadline: "Tomorrow", category: "Product" },
  { id: "3", title: "Review Q1 roadmap", priority: "medium", deadline: "This week", category: "Planning" },
  { id: "4", title: "Update documentation", priority: "medium", deadline: "This week", category: "Docs" },
  { id: "5", title: "Team offsite planning", priority: "low", deadline: "Next month", category: "Team" },
];

export async function GET() {
  return NextResponse.json({ priorities });
}
