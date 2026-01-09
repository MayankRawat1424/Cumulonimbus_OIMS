import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/product", (req, res) => {
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

router.delete("/product/:id", (req, res) => {
  const{id} = req.params;
  const query = `DELETE FROM products WHERE id = ?`;

  db.run(
    query,
    [id],
    function(err){
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

export default router;
