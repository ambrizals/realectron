import Dexie from "dexie";

const db = new Dexie("realectron");

db.version(1).stores({
  todos: "uid, title, description, created_at, updated_at",
});

export default db;
