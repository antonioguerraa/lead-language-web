import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "..", "leads.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    academy_name TEXT NOT NULL DEFAULT '',
    academy_url TEXT NOT NULL DEFAULT '',
    academy_location TEXT NOT NULL DEFAULT '',
    languages TEXT NOT NULL DEFAULT '',
    funnel_data TEXT NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'nuevo',
    notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export default db;
