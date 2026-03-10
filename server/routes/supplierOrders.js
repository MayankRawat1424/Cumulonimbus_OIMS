import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/supplierOrders", (req, res) => {
  const { supplierId, items } = req.body;

  if (!supplierId || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid supplier order data" });
  }

  let totalAmount = 0;

  const insertOrderQuery = `
    INSERT INTO supplier_orders (supplierId, totalAmount)
    VALUES (?, ?)
  `;

  db.run(insertOrderQuery, [supplierId, 0], function (err) {
    if (err) {
      return res.status(500).json({
        message: "Error creating order",
        error: err.message,
      });
    }

    const orderId = this.lastID;

    db.run(
      `INSERT INTO supplier_order_status (orderId, status)
   VALUES (?, ?)`,
      [orderId, 0],
      (err) => {
        if (err) {
          console.error("Failed to insert order status:", err.message);
        }
      },
    );

    items.forEach((item) => {
      db.get(
        `SELECT costPrice FROM products WHERE id = ?`,
        [item.productId],
        (err, product) => {
          if (err || !product) return;

          const itemTotal = product.costPrice * item.quantity;
          totalAmount += itemTotal;

          db.run(
            `INSERT INTO supplier_orderItems 
            (orderId, productId, quantity, pricePerItem)
            VALUES (?, ?, ?, ?)`,
            [orderId, item.productId, item.quantity, product.costPrice],
          );
        },
      );
    });

    setTimeout(() => {
      db.run(`UPDATE supplier_orders SET totalAmount = ? WHERE id = ?`, [
        totalAmount,
        orderId,
      ]);

      return res.status(201).json({
        message: "Order placed successfully",
        orderId,
        totalAmount,
      });
    }, 200);
  });
});

router.get("/supplierOrders", (req, res) => {
  const query = `
    SELECT 
      so.id as orderId,
      s.supplierName,
      so.totalAmount,
      sos.status
    FROM supplier_orders so
    JOIN suppliers s ON so.supplierId = s.id
    JOIN supplier_order_status sos ON sos.orderId = so.id
    ORDER BY so.id DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch orders",
        error: err.message,
      });
    }

    res.json(rows);
  });
});

export default router;
