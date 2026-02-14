import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    mrr: 154320,
    arr: 1851840,
    growth: 12.5,
    revenueByProduct: [
      { name: "AI Assistant", revenue: 45000, growth: 15 },
      { name: "API Gateway", revenue: 55000, growth: 8 },
      { name: "Analytics", revenue: 28000, growth: 22 },
      { name: "Data Pipeline", revenue: 32000, growth: 5 },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 120000 },
      { month: "Feb", revenue: 132000 },
      { month: "Mar", revenue: 141000 },
      { month: "Apr", revenue: 148000 },
      { month: "May", revenue: 154320 },
    ],
    metrics: {
      customers: 245,
      churn: 2.1,
      arpu: 630,
      ltv: 8500,
    },
  };
  
  return NextResponse.json(data);
}
