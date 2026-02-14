import { NextResponse } from "next/server";

const drafts = [
  { id: "1", title: "AI Trends 2025: What to Expect", type: "blog", status: "idea", author: "Alice", progress: 0, wordCount: 0, lastEdited: new Date().toISOString(), dueDate: "2025-03-01", tags: ["AI", "Trends"], comments: 0 },
  { id: "2", title: "Product Launch Announcement", type: "social", status: "drafting", author: "Bob", progress: 65, wordCount: 280, lastEdited: new Date(Date.now() - 86400000).toISOString(), dueDate: "2025-02-20", tags: ["Launch", "Marketing"], comments: 3 },
  { id: "3", title: "Weekly Newsletter #42", type: "email", status: "review", author: "Charlie", progress: 90, wordCount: 1250, lastEdited: new Date(Date.now() - 172800000).toISOString(), dueDate: "2025-02-15", tags: ["Newsletter"], comments: 5 },
  { id: "4", title: "API Documentation v2", type: "doc", status: "approved", author: "Diana", progress: 100, wordCount: 4500, lastEdited: new Date(Date.now() - 259200000).toISOString(), dueDate: "2025-02-10", tags: ["Docs", "API"], comments: 2 },
  { id: "5", title: "Tutorial: Getting Started", type: "script", status: "published", author: "Eve", progress: 100, wordCount: 2100, lastEdited: new Date(Date.now() - 345600000).toISOString(), dueDate: "2025-02-05", tags: ["Tutorial", "Video"], comments: 8 },
  { id: "6", title: "Case Study: Enterprise Migration", type: "blog", status: "drafting", author: "Frank", progress: 45, wordCount: 890, lastEdited: new Date(Date.now() - 432000000).toISOString(), dueDate: "2025-02-28", tags: ["Case Study"], comments: 1 },
  { id: "7", title: "Developer Onboarding Guide", type: "doc", status: "review", author: "Grace", progress: 80, wordCount: 3200, lastEdited: new Date(Date.now() - 518400000).toISOString(), dueDate: "2025-02-18", tags: ["Onboarding"], comments: 4 },
  { id: "8", title: "Social Media Campaign Q1", type: "social", status: "idea", author: "Henry", progress: 10, wordCount: 150, lastEdited: new Date(Date.now() - 604800000).toISOString(), dueDate: "2025-03-15", tags: ["Social", "Campaign"], comments: 0 },
];

export async function GET() {
  return NextResponse.json({ drafts });
}
