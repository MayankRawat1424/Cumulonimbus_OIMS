import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/customers", (req, res) => {
  const {
    customerName,
    phone,
    email,
    address,
    age,
    gender,
  } = req.body;
  const query = `
    INSERT INTO customers (customerName,
    phone,
    email, 
    address,
    age,
    gender)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [
      customerName,
      phone,
      email,
      address,
      age,
      gender,
    ],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Shit broke", error: err.message });
      }

      return res.status(201).json({
        message: "Customer created",
        customerId: this.lastID,
      });
    }
  );
});

router.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM customers WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({
        message: "Database error while deleting customer",
        error: err.message,
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted successfully" });
  });
});

router.get("/customers", (req, res) => {
  const query = `SELECT id, customerName,
      phone,
      email,
      address,
      age,
      gender FROM customers`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Damn son you failed a select query",
        error: err.message,
      });
    }
    return res.json(rows);
  });
});

router.put("/customers/:id", (req, res) => {
  const { id } = req.params;
  const {
    customerName,
    phone,
    email,
    address,
    age,
    gender,
  } = req.body;

  const query = `
    UPDATE customers
    SET customerName = ?,
    phone = ?,
    email = ?, 
    address = ?,
    age = ?,
    gender = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [
      customerName,
      phone,
      email,
      address,
      age,
      gender,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Database error while updating customer",
          error: err.message,
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }
      return res.status(200).json({
        message: "Updated successfully biatchhh",
      });
    }
  );
});

export default router;
