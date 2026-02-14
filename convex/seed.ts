import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

// Seed script for initial data
export const seed = internalAction({
  handler: async (ctx) => {
    const now = Date.now();

    // Seed activities
    const activities = [
      { id: "1", type: "agent" as const, message: "Alice completed code review for PR #234", timestamp: now - 300000 },
      { id: "2", type: "system" as const, message: "Deployment v2.3.1 completed successfully", timestamp: now - 600000 },
      { id: "3", type: "user" as const, message: "New team member added: Frank", timestamp: now - 900000 },
      { id: "4", type: "agent" as const, message: "Bob generated Q1 roadmap draft", timestamp: now - 1200000 },
      { id: "5", type: "system" as const, message: "Daily backup completed", timestamp: now - 1800000 },
    ];

    for (const activity of activities) {
      await ctx.runMutation(internal.activities.insert, activity);
    }

    // Seed calendar events
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    
    const events = [
      { id: "1", title: "Team Standup", date: today, time: "09:00", type: "meeting" as const, participants: ["Alice", "Bob", "Charlie"], createdAt: now },
      { id: "2", title: "Product Launch", date: tomorrow, time: "14:00", type: "deadline" as const, createdAt: now },
      { id: "3", title: "Client Call - TechCorp", date: today, time: "15:30", type: "meeting" as const, participants: ["Sales Team"], createdAt: now },
      { id: "4", title: "Review Analytics", date: tomorrow, time: "11:00", type: "reminder" as const, createdAt: now },
    ];

    for (const event of events) {
      await ctx.runMutation(internal.calendarEvents.insert, event);
    }

    // Seed tasks
    const tasks = [
      { id: "1", title: "Design new API endpoints", description: "Create OpenAPI spec for user management", priority: "high" as const, status: "backlog" as const, assignee: "Alice", tags: ["api", "design"], project: "API", createdAt: now, updatedAt: now },
      { id: "2", title: "Fix login bug", description: "Users unable to login with SSO", priority: "high" as const, status: "today" as const, assignee: "Bob", dueDate: today, tags: ["bug", "urgent"], project: "Frontend", createdAt: now, updatedAt: now },
      { id: "3", title: "Write blog post", description: "AI trends in 2025", priority: "medium" as const, status: "today" as const, assignee: "Charlie", dueDate: today, tags: ["content"], project: "Content", createdAt: now, updatedAt: now },
      { id: "4", title: "Implement caching layer", description: "Redis setup for session storage", priority: "high" as const, status: "in-progress" as const, assignee: "Diana", tags: ["backend", "performance"], project: "API", createdAt: now, updatedAt: now },
      { id: "5", title: "Setup CI/CD pipeline", description: "GitHub Actions for automated testing", priority: "medium" as const, status: "in-progress" as const, assignee: "Eve", tags: ["devops"], project: "DevOps", createdAt: now, updatedAt: now },
      { id: "6", title: "Review PR #234", description: "Authentication module refactor", priority: "medium" as const, status: "review" as const, assignee: "Frank", tags: ["code-review"], project: "API", createdAt: now, updatedAt: now },
      { id: "7", title: "Database migration", description: "Add user preferences table", priority: "high" as const, status: "done" as const, assignee: "Grace", tags: ["database"], project: "API", createdAt: now, updatedAt: now },
    ];

    for (const task of tasks) {
      await ctx.runMutation(internal.tasks.insert, task);
    }

    // Seed contacts
    const contacts = [
      { id: "1", name: "Sarah Johnson", company: "TechCorp Inc.", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567", status: "prospect" as const, value: 25000, lastContact: "2 days ago", nextAction: "Follow-up email", tags: ["Enterprise", "SaaS"], location: "San Francisco, CA", createdAt: now },
      { id: "2", name: "Michael Chen", company: "DataFlow Systems", email: "michael@dataflow.io", phone: "+1 (555) 234-5678", status: "contacted" as const, value: 45000, lastContact: "1 day ago", nextAction: "Schedule demo", tags: ["Mid-Market", "Analytics"], location: "New York, NY", createdAt: now },
      { id: "3", name: "Emily Davis", company: "CloudNine Solutions", email: "emily@cloudnine.com", phone: "+1 (555) 345-6789", status: "meeting" as const, value: 120000, lastContact: "3 hours ago", nextAction: "Prepare proposal", tags: ["Enterprise", "Cloud"], location: "Austin, TX", createdAt: now },
      { id: "4", name: "James Wilson", company: "StartupXYZ", email: "james@startupxyz.com", phone: "+1 (555) 456-7890", status: "proposal" as const, value: 15000, lastContact: "5 hours ago", nextAction: "Send contract", tags: ["Startup", "AI"], location: "Denver, CO", createdAt: now },
      { id: "5", name: "Lisa Anderson", company: "GlobalTech", email: "lisa@globaltech.com", phone: "+1 (555) 567-8901", status: "active" as const, value: 85000, lastContact: "1 week ago", nextAction: "Quarterly review", tags: ["Enterprise", "Global"], location: "Chicago, IL", createdAt: now },
    ];

    for (const contact of contacts) {
      await ctx.runMutation(internal.contacts.insert, contact);
    }

    // Seed content drafts
    const drafts = [
      { id: "1", title: "AI Trends 2025: What to Expect", type: "blog" as const, status: "idea" as const, author: "Alice", progress: 0, wordCount: 0, lastEdited: now, dueDate: "2025-03-01", tags: ["AI", "Trends"], comments: 0, createdAt: now },
      { id: "2", title: "Product Launch Announcement", type: "social" as const, status: "drafting" as const, author: "Bob", progress: 65, wordCount: 280, lastEdited: now - 86400000, dueDate: "2025-02-20", tags: ["Launch", "Marketing"], comments: 3, createdAt: now },
      { id: "3", title: "Weekly Newsletter #42", type: "email" as const, status: "review" as const, author: "Charlie", progress: 90, wordCount: 1250, lastEdited: now - 172800000, dueDate: "2025-02-15", tags: ["Newsletter"], comments: 5, createdAt: now },
      { id: "4", title: "API Documentation v2", type: "doc" as const, status: "approved" as const, author: "Diana", progress: 100, wordCount: 4500, lastEdited: now - 259200000, dueDate: "2025-02-10", tags: ["Docs", "API"], comments: 2, createdAt: now },
    ];

    for (const draft of drafts) {
      await ctx.runMutation(internal.contentDrafts.insert, draft);
    }

    // Seed ecosystem products
    const products = [
      { id: "1", name: "AI Assistant", description: "Conversational AI for customer support", category: "AI Tools", status: "active" as const, health: "healthy" as const, users: 12500, revenue: 45000, version: "2.3.1", uptime: "99.98%", requestsPerDay: 245000, avgResponseTime: "245ms", errorRate: "0.02%", createdAt: now, updatedAt: now },
      { id: "2", name: "Data Pipeline", description: "Real-time data processing and analytics", category: "Platform", status: "active" as const, health: "healthy" as const, users: 8200, revenue: 32000, version: "1.8.0", uptime: "99.95%", requestsPerDay: 180000, avgResponseTime: "180ms", errorRate: "0.01%", createdAt: now, updatedAt: now },
      { id: "3", name: "Slack Bot", description: "Automated team notifications and commands", category: "Integrations", status: "active" as const, health: "warning" as const, users: 5600, revenue: 12000, version: "3.1.2", uptime: "99.50%", requestsPerDay: 95000, avgResponseTime: "320ms", errorRate: "0.05%", createdAt: now, updatedAt: now },
      { id: "4", name: "API Gateway", description: "Unified API management layer", category: "Services", status: "active" as const, health: "healthy" as const, users: 15000, revenue: 55000, version: "4.2.1", uptime: "99.99%", requestsPerDay: 450000, avgResponseTime: "45ms", errorRate: "0.005%", createdAt: now, updatedAt: now },
    ];

    for (const product of products) {
      await ctx.runMutation(internal.ecosystemProducts.insert, product);
    }

    return { success: true, message: "Database seeded successfully" };
  },
});
