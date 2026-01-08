import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/createProduct", (req, res) => {
  const { productName, productDescription, price, quantity } = req.body;
  const query = `
    INSERT INTO products (productName, productDescription, price, quantity)
    VALUES (?, ?, ?, ?)
  `;
  db.run(
    query,
    [productName, productDescription, price, quantity],
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
    }
  );
});

export default router;
