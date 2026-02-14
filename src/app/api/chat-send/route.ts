import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

const workspacePath = join(homedir(), ".openclaw", "workspace");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const message = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    };
    
    // Ensure queue directory exists
    const queueDir = join(workspacePath, "queue");
    await mkdir(queueDir, { recursive: true }).catch(() => {});
    
    // Append to chat queue
    await appendFile(
      join(queueDir, "messages.jsonl"),
      JSON.stringify(message) + "\n"
    );
    
    return NextResponse.json({ success: true, message });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
