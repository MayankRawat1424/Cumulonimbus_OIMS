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

db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        address TEXT,
        age INTEGER,
        gender TEXT
      )
  `);

db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL,
    deliveryCharge TEXT CHECK (deliveryCharge IN ('Y', 'N')),
    totalAmount REAL NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customerId)
      REFERENCES customers(id)
      ON DELETE CASCADE
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS orderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    pricePerItem REAL NOT NULL,

    FOREIGN KEY (orderId)
      REFERENCES orders(id)
      ON DELETE CASCADE,

    FOREIGN KEY (productId)
      REFERENCES products(id)
      ON DELETE CASCADE
  )
`);

export default db;
