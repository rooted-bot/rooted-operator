import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    type: v.string(),
    category: v.string(),
    message: v.string(),
    metadata: v.optional(v.any()),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_category", ["category"]),

  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    allDay: v.optional(v.boolean()),
    type: v.string(),
    project: v.optional(v.string()),
    color: v.optional(v.string()),
  })
    .index("by_startTime", ["startTime"]),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(),
    priority: v.string(),
    assignee: v.optional(v.string()),
    project: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"])
    .index("by_dueDate", ["dueDate"]),

  contacts: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    status: v.string(),
    value: v.optional(v.number()),
    lastContact: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_company", ["company"]),

  contentDrafts: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    platform: v.string(),
    status: v.string(),
    author: v.string(),
    scheduledFor: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_platform", ["platform"])
    .index("by_scheduledFor", ["scheduledFor"]),

  ecosystemProducts: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    status: v.string(),
    category: v.string(),
    metrics: v.object({
      users: v.number(),
      revenue: v.number(),
      uptime: v.number(),
    }),
    lastDeploy: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),
});
