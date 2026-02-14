import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const response = {
    id: Date.now().toString(),
    content: `Received: "${body.message}". Processing your request...`,
    sender: "System",
    isAgent: true,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  
  return NextResponse.json({ message: response }, { status: 201 });
}
