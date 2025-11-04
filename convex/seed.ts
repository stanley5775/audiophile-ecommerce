import { mutation } from "./_generated/server";
import { v } from "convex/values";

// This mutation seeds your products data into Convex
export const seedProducts = mutation({
  args: { products: v.array(v.any()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("products").collect();

    if (existing.length > 0) {
      console.log("Products already exist in database.");
      return;
    }

    for (const product of args.products) {
      await ctx.db.insert("products", product);
    }

    console.log("Products seeded successfully!");
  },
});
