import { NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

const workspacePath = join(homedir(), ".openclaw", "workspace");

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Read memory files for this product
    const memoryDir = join(workspacePath, "memory", "ecosystem", params.slug);
    const files = await readdir(memoryDir).catch(() => []);
    
    const memories = [];
    for (const file of files.filter(f => f.endsWith(".md"))) {
      try {
        const content = await readFile(join(memoryDir, file), "utf-8");
        memories.push({
          file,
          content,
          type: file.replace(".md", ""),
        });
      } catch {
        // Skip invalid files
      }
    }
    
    return NextResponse.json({
      slug: params.slug,
      memories,
    });
  } catch (error) {
    return NextResponse.json({ slug: params.slug, memories: [] }, { status: 500 });
  }
}
