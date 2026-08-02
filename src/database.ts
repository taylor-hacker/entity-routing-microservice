import { mkdirSync } from "node:fs";
import Database from "better-sqlite3";

//creates the data table if it doesn't exist
//initializes the database and the table for the MS

mkdirSync("data", { recursive: true });

const database = new Database("data/routing.db");

database.exec(`
  CREATE TABLE IF NOT EXISTS Entities (
    id TEXT PRIMARY KEY,
    app TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

export default database;