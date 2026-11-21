import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { portfolio } from "../data/portfolio.ts";

const directory = new URL("../.portfolio/", import.meta.url);
mkdirSync(directory, { recursive: true });
const db = new DatabaseSync(fileURLToPath(new URL("portfolio.sqlite", directory)));
try {
  db.exec(`
    PRAGMA busy_timeout = 5000;
    BEGIN IMMEDIATE;
    CREATE TABLE IF NOT EXISTS portfolio_sections (
      name TEXT PRIMARY KEY,
      content TEXT NOT NULL CHECK(json_valid(content))
    ) STRICT;
    DELETE FROM portfolio_sections;
  `);
  const save = db.prepare("INSERT INTO portfolio_sections(name, content) VALUES (?, ?)");
  for (const [name, content] of Object.entries(portfolio)) {
    save.run(name, JSON.stringify(content));
  }
  db.exec("COMMIT");
} finally {
  db.close();
}
console.log("Portfolio content synced to .portfolio/portfolio.sqlite");
