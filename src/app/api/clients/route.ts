import { NextResponse } from "next/server";

const clients = [
  { id: "1", name: "Sarah Johnson", company: "TechCorp Inc.", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567", status: "prospect", value: 25000, lastContact: "2 days ago", nextAction: "Follow-up email", tags: ["Enterprise", "SaaS"], location: "San Francisco, CA" },
  { id: "2", name: "Michael Chen", company: "DataFlow Systems", email: "michael@dataflow.io", phone: "+1 (555) 234-5678", status: "contacted", value: 45000, lastContact: "1 day ago", nextAction: "Schedule demo", tags: ["Mid-Market", "Analytics"], location: "New York, NY" },
  { id: "3", name: "Emily Davis", company: "CloudNine Solutions", email: "emily@cloudnine.com", phone: "+1 (555) 345-6789", status: "meeting", value: 120000, lastContact: "3 hours ago", nextAction: "Prepare proposal", tags: ["Enterprise", "Cloud"], location: "Austin, TX" },
  { id: "4", name: "James Wilson", company: "StartupXYZ", email: "james@startupxyz.com", phone: "+1 (555) 456-7890", status: "proposal", value: 15000, lastContact: "5 hours ago", nextAction: "Send contract", tags: ["Startup", "AI"], location: "Denver, CO" },
  { id: "5", name: "Lisa Anderson", company: "GlobalTech", email: "lisa@globaltech.com", phone: "+1 (555) 567-8901", status: "active", value: 85000, lastContact: "1 week ago", nextAction: "Quarterly review", tags: ["Enterprise", "Global"], location: "Chicago, IL" },
  { id: "6", name: "Robert Taylor", company: "InnovateLabs", email: "robert@innovatelabs.com", phone: "+1 (555) 678-9012", status: "active", value: 60000, lastContact: "3 days ago", nextAction: "Upsell opportunity", tags: ["Mid-Market", "Research"], location: "Boston, MA" },
  { id: "7", name: "Amanda Martinez", company: "NextGen Retail", email: "amanda@nextgen.com", phone: "+1 (555) 789-0123", status: "contacted", value: 35000, lastContact: "4 days ago", nextAction: "Product demo", tags: ["Retail", "E-commerce"], location: "Miami, FL" },
  { id: "8", name: "David Brown", company: "SecureNet", email: "david@securenet.com", phone: "+1 (555) 890-1234", status: "prospect", value: 75000, lastContact: "1 week ago", nextAction: "Initial outreach", tags: ["Security", "Enterprise"], location: "Seattle, WA" },
];

export async function GET() {
  return NextResponse.json({ clients });
}
