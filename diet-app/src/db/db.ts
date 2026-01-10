import * as SQLite from "expo-sqlite";


export const db = SQLite.openDatabaseSync("app.db");

let initialized = false;

export function initDb() {
  if (initialized) return;

  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS foods (
      name TEXT PRIMARY KEY NOT NULL,
      uuid TEXT NOT NULL,
      calories INTEGER NOT NULL,
      protein INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS eatingHistory (
      food_uuid TEXT PRIMARY KEY NOT NULL,  
      food_name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (food_name) REFERENCES foods(name)
    );
  `);

  initialized = true;
}
