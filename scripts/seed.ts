import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import data from "../public/assets/db.json";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function main() {
  try {
    await client.mutation(api.seed.seedProducts, { products: data.data });
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

main();
