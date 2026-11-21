import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { Portfolio } from "./portfolio";

// SQLite is used exclusively while rendering on the server or exporting pages.
export function getPortfolio(): Portfolio {
  const db = new DatabaseSync(join(process.cwd(), ".portfolio", "portfolio.sqlite"), {
    readOnly: true,
  });
  try {
    const getSection = db.prepare("SELECT content FROM portfolio_sections WHERE name = ?");
    function read<K extends keyof Portfolio>(key: K): Portfolio[K] {
      const value = getSection.get(key)?.content;
      if (typeof value !== "string") {
        throw new Error(`Missing portfolio section "${key}". Run npm run db:sync.`);
      }
      return JSON.parse(value) as Portfolio[K];
    }
    return {
      profile: read("profile"),
      links: read("links"),
      journal: read("journal"),
      gallery: read("gallery"),
    };
  } finally {
    db.close();
  }
}
