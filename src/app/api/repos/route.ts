import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

export async function GET() {
  try {
    const projectsPath = join(homedir(), "Desktop", "Projects");
    const entries = await readdir(projectsPath, { withFileTypes: true }).catch(() => []);
    
    const repos = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const gitPath = join(projectsPath, entry.name, ".git");
        try {
          await stat(gitPath);
          repos.push({
            name: entry.name,
            path: join(projectsPath, entry.name),
            hasGit: true,
          });
        } catch {
          // Not a git repo
        }
      }
    }
    
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json({ repos: [] }, { status: 500 });
  }
}
