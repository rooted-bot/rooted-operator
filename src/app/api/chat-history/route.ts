import { NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

const workspacePath = join(homedir(), ".openclaw", "workspace");

export async function GET() {
  try {
    // Read all .jsonl files from transcripts directory
    const transcriptsDir = join(workspacePath, "transcripts");
    const files = await readdir(transcriptsDir).catch(() => []);
    
    const transcripts = [];
    for (const file of files.filter(f => f.endsWith(".jsonl"))) {
      try {
        const content = await readFile(join(transcriptsDir, file), "utf-8");
        const lines = content.split("\n").filter(Boolean);
        transcripts.push(...lines.map(line => JSON.parse(line)));
      } catch {
        // Skip invalid files
      }
    }
    
    return NextResponse.json({ transcripts });
  } catch (error) {
    return NextResponse.json({ transcripts: [] }, { status: 500 });
  }
}
