import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      { id: "1", name: "AI Assistant", category: "AI Tools", status: "active", users: 12500 },
      { id: "2", name: "Data Pipeline", category: "Platform", status: "active", users: 8200 },
    ]
  });
}
