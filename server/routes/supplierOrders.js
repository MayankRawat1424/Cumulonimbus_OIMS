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

    items.forEach((item) => {
      db.get(
        `SELECT price FROM products WHERE id = ?`,
        [item.productId],
        (err, product) => {
          if (err || !product) return;

          const itemTotal = product.price * item.quantity;
          totalAmount += itemTotal;

          db.run(
            `
            INSERT INTO supplier_orderItems (orderId, productId, quantity, pricePerItem)
            VALUES (?, ?, ?, ?)
          `,
            [orderId, item.productId, item.quantity, product.price]
          );

          db.run(
            `UPDATE products SET stock = stock + ? WHERE id = ?`,
            [item.quantity, item.productId]
          );
        }
      );
    });

    setTimeout(() => {
      db.run(
        `UPDATE supplier_orders SET totalAmount = ? WHERE id = ?`,
        [totalAmount, orderId]
      );

      return res.status(201).json({
        message: "Order placed successfully",
        orderId,
        totalAmount,
      });
    }, 200);
  });
});

export default router;
