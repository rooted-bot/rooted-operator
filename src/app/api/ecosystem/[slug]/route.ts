import { NextResponse } from "next/server";

const products = [
  { id: "1", name: "AI Assistant", description: "Conversational AI for customer support", category: "AI Tools", status: "active", health: "healthy", users: 12500, revenue: 45000, version: "2.3.1", uptime: "99.98%", requestsPerDay: 245000, avgResponseTime: "245ms", errorRate: "0.02%" },
  { id: "2", name: "Data Pipeline", description: "Real-time data processing and analytics", category: "Platform", status: "active", health: "healthy", users: 8200, revenue: 32000, version: "1.8.0", uptime: "99.95%", requestsPerDay: 180000, avgResponseTime: "180ms", errorRate: "0.01%" },
  { id: "3", name: "Slack Bot", description: "Automated team notifications and commands", category: "Integrations", status: "active", health: "warning", users: 5600, revenue: 12000, version: "3.1.2", uptime: "99.50%", requestsPerDay: 95000, avgResponseTime: "320ms", errorRate: "0.05%" },
  { id: "4", name: "Code Review AI", description: "Automated code review and suggestions", category: "AI Tools", status: "beta", health: "healthy", users: 2100, revenue: 8500, version: "0.9.5", uptime: "98.50%", requestsPerDay: 45000, avgResponseTime: "890ms", errorRate: "0.10%" },
  { id: "5", name: "Analytics Dashboard", description: "Business intelligence and reporting", category: "Platform", status: "active", health: "healthy", users: 9800, revenue: 28000, version: "2.0.0", uptime: "99.90%", requestsPerDay: 120000, avgResponseTime: "150ms", errorRate: "0.01%" },
  { id: "6", name: "API Gateway", description: "Unified API management layer", category: "Services", status: "active", health: "healthy", users: 15000, revenue: 55000, version: "4.2.1", uptime: "99.99%", requestsPerDay: 450000, avgResponseTime: "45ms", errorRate: "0.005%" },
  { id: "7", name: "Document Parser", description: "AI-powered document extraction", category: "AI Tools", status: "planned", health: "healthy", users: 0, revenue: 0, version: "0.0.1", uptime: "0%", requestsPerDay: 0, avgResponseTime: "0ms", errorRate: "0%" },
  { id: "8", name: "Discord Bot", description: "Community management automation", category: "Integrations", status: "beta", health: "warning", users: 3200, revenue: 6000, version: "1.2.0", uptime: "98.00%", requestsPerDay: 67000, avgResponseTime: "420ms", errorRate: "0.08%" },
];

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const product = products.find(p => p.id === params.slug);
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  
  return NextResponse.json({ product });
}
