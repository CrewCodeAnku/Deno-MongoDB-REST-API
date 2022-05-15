import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.29.4/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  await client.connect("mongodb://localhost:27017");
  console.log("Database connected");
  db = client.database("notes");
}

export function getDb() {
  return db;
}
