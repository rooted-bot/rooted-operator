import { api } from "./_generated/api";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";

export const seed = action({
  args: {},
  handler: async (ctx) => {
    // Seed activities
    const activities = [
      { type: "info", category: "system", message: "System initialized", timestamp: Date.now() },
      { type: "success", category: "agent", message: "Agent Alice is now online", timestamp: Date.now() - 3600000 },
      { type: "success", category: "deployment", message: "API v2.3.0 deployed successfully", timestamp: Date.now() - 7200000 },
    ];

    for (const activity of activities) {
      await ctx.runMutation(internal.activities.insert, activity);
    }

    // Seed tasks
    const tasks = [
      { title: "Review PR #234", status: "in-progress", priority: "high", assignee: "Alice", createdAt: Date.now(), updatedAt: Date.now() },
      { title: "Update documentation", status: "todo", priority: "medium", assignee: "Bob", createdAt: Date.now(), updatedAt: Date.now() },
      { title: "Fix navigation bug", status: "done", priority: "high", assignee: "Charlie", createdAt: Date.now(), updatedAt: Date.now() },
    ];

    for (const task of tasks) {
      await ctx.runMutation(internal.tasks.insert, task);
    }

    // Seed calendar events
    const now = new Date();
    const events = [
      { title: "Team Standup", startTime: now.setHours(9, 0, 0, 0), type: "meeting", color: "blue" },
      { title: "Sprint Planning", startTime: now.setDate(now.getDate() + 1), type: "meeting", color: "violet" },
      { title: "Deploy to Prod", startTime: now.setDate(now.getDate() + 2), type: "deadline", color: "rose" },
    ];

    for (const event of events) {
      await ctx.runMutation(internal.calendarEvents.insert, event);
    }

    return { success: true, message: "Database seeded successfully" };
  },
});
