import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    id: v.string(),
    type: v.union(v.literal("agent"), v.literal("system"), v.literal("user")),
    message: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  }).index("by_timestamp", ["timestamp"]),

  calendarEvents: defineTable({
    id: v.string(),
    title: v.string(),
    date: v.string(),
    time: v.optional(v.string()),
    type: v.union(v.literal("meeting"), v.literal("deadline"), v.literal("reminder")),
    participants: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index("by_date", ["date"]),

  tasks: defineTable({
    id: v.string(),
    title: v.string(),
    description: v.string(),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    status: v.union(v.literal("backlog"), v.literal("today"), v.literal("in-progress"), v.literal("review"), v.literal("done")),
    assignee: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    tags: v.array(v.string()),
    project: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"])
    .index("by_priority", ["priority"]),

  contacts: defineTable({
    id: v.string(),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    status: v.union(v.literal("prospect"), v.literal("contacted"), v.literal("meeting"), v.literal("proposal"), v.literal("active"), v.literal("churned")),
    value: v.number(),
    lastContact: v.string(),
    nextAction: v.string(),
    tags: v.array(v.string()),
    location: v.string(),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  contentDrafts: defineTable({
    id: v.string(),
    title: v.string(),
    type: v.union(v.literal("blog"), v.literal("social"), v.literal("email"), v.literal("doc"), v.literal("script")),
    status: v.union(v.literal("idea"), v.literal("drafting"), v.literal("review"), v.literal("approved"), v.literal("published")),
    author: v.string(),
    content: v.optional(v.string()),
    progress: v.number(),
    wordCount: v.number(),
    lastEdited: v.number(),
    dueDate: v.optional(v.string()),
    tags: v.array(v.string()),
    comments: v.number(),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_author", ["author"]),

  ecosystemProducts: defineTable({
    id: v.string(),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    status: v.union(v.literal("active"), v.literal("beta"), v.literal("deprecated"), v.literal("planned")),
    health: v.union(v.literal("healthy"), v.literal("warning"), v.literal("error")),
    users: v.number(),
    revenue: v.number(),
    version: v.string(),
    uptime: v.string(),
    requestsPerDay: v.number(),
    avgResponseTime: v.string(),
    errorRate: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"]),
});
