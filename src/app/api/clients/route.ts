import { NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

const workspacePath = join(homedir(), ".openclaw", "workspace");

export async function GET() {
  try {
    const clientsDir = join(workspacePath, "clients");
    const files = await readdir(clientsDir).catch(() => []);
    
    const clients = [];
    for (const file of files.filter(f => f.endsWith(".md"))) {
      try {
        const content = await readFile(join(clientsDir, file), "utf-8");
        const name = file.replace(".md", "");
        const email = content.match(/email:\s*(.+)/)?.[1] || "";
        const company = content.match(/company:\s*(.+)/)?.[1] || "";
        
        clients.push({
          id: name,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          company,
          content: content.slice(0, 500),
        });
      } catch {
        // Skip invalid files
      }
    }
    
    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json({ clients: [] }, { status: 500 });
  }
}
