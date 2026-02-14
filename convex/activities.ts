import { query, mutation } from "./_generated/server";

export const list = query({
  handler: async (ctx: any) => {
    return [];
  },
});

export const insert = mutation({
  handler: async (ctx: any, args: any) => {
    return args.id;
  },
});
