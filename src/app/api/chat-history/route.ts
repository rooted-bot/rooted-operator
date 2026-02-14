import { NextResponse } from "next/server";

const messages = [
  { id: "1", content: "Hey team, the new feature is ready for review!", sender: "Alice", isAgent: true, timestamp: "10:30 AM", avatar: null },
  { id: "2", content: "Great! I'll take a look at it now.", sender: "You", isAgent: false, timestamp: "10:32 AM", avatar: null },
  { id: "3", content: "Found a small issue with the auth flow. Should be a quick fix.", sender: "Alice", isAgent: true, timestamp: "10:45 AM", avatar: null },
  { id: "4", content: "Thanks for catching that. Let me know when it's updated.", sender: "You", isAgent: false, timestamp: "10:46 AM", avatar: null },
  { id: "5", content: "Fixed! The token validation was missing a check. Deployed to staging.", sender: "Alice", isAgent: true, timestamp: "11:02 AM", avatar: null },
];

export async function GET() {
  return NextResponse.json({ messages });
}
