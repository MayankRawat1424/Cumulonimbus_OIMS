import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/inventory.db", (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productDescription TEXT,
    color TEXT, 
    subCategory TEXT,
    model TEXT,
    price INTEGER,
    quantity INTEGER,
    unit TEXT,
    stock INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplierName TEXT NOT NULL,
    companyName TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    gstNumber TEXT
  )
`);

export default db;
