import express from "express";
import db from "../database.js";

const router = express.Router();

router.get("/products/test", (req, res) => {
  console.log("CATEGORY SUMMARY ROUTE HIT");

  const query = `
    SELECT 
      COALESCE(NULLIF(subCategory, ''), 'Uncategorized') as category,
      SUM(price * stock) as totalValue
    FROM products
    GROUP BY subCategory
  `;

  db.all(query, [], (err, rows) => {
    console.log("DB CALLBACK TRIGGERED");

    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Category summary failed",
        error: err.message,
      });
    }

    console.log(rows);

    res.json(rows);
  });
});

router.post("/products", (req, res) => {
  const {
    productName,
    productDescription,
    color,
    subCategory,
    model,
    price,
    quantity,
    unit,
    stock,
  } = req.body;
  const query = `
    INSERT INTO products (productName,
    productDescription,
    color, 
    subCategory,
    model,
    price,
    quantity,
    unit,
    stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [
      productName,
      productDescription,
      color,
      subCategory,
      model,
      price,
      quantity,
      unit,
      stock,
    ],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Shit broke", error: err.message });
      }

      return res.status(201).json({
        message: "Product created",
        productId: this.lastID,
      });
    },
  );
});

router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM products WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({
        message: "Database error while deleting product",
        error: err.message,
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  });
});

// For find product detail
router.get("/products/:id", (req, res) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  const { id } = req.params;
  db.get(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Damn son you failed a select query",
        error: err.message,
      });
    }
    return res.json(rows);
  });
});

router.get("/products", (req, res) => {
  const dataQuery = `SELECT id, productName,
      subCategory,
      price,
      quantity,
      unit,
      stock FROM products LIMIT ? OFFSET ?`;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) as total FROM products`;

  db.get(countQuery, [], (err, countRow) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.json({
        data: rows,
        total: countRow.total,
        page,
        totalPages: Math.ceil(countRow.total / limit),
      });
    });
  });
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    color,
    subCategory,
    model,
    price,
    quantity,
    unit,
    stock,
  } = req.body;

  const query = `
    UPDATE products
    SET productName = ?,
    productDescription = ?,
    color = ?, 
    subCategory = ?,
    model = ?,
    price = ?,
    quantity = ?,
    unit = ?,
    stock = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [
      productName,
      productDescription,
      color,
      subCategory,
      model,
      price,
      quantity,
      unit,
      stock,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Database error while updating product",
          error: err.message,
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(200).json({
        message: "Updated successfully",
      });
    },
  );
});

export default router;
