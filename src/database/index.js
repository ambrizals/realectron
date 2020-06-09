import Dexie from "dexie";

const db = new Dexie("realectron");

// Create database to indexed db
db.version(0).stores({
  todo: "title, description, created_at, updated_at",
});

export default db;
