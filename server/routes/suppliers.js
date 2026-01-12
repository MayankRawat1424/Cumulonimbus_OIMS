import express from "express";
import db from "../database.js";

const router = express.Router();

router.post("/suppliers", (req, res) => {
  const {
    supplierName,
    companyName,
    email,
    phone,
    address,
    city,
    state,
    gstNumber,
  } = req.body;
  const query = `
    INSERT INTO suppliers (supplierName, companyName, email, phone, address, city, state, gstNumber)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [supplierName, companyName, email, phone, address, city, state, gstNumber],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Shit broke",
          error: err.message,
        });
      }

      return res.status(201).json({
        message: "Supplier added successfully",
        supplier_id: this.lastID,
      });
    }
  );
});

router.get("/suppliers", (req, res) => {
  const query = `SELECT * FROM suppliers`;

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

router.delete("/suppliers/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM suppliers WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({
        message: "Error deleting supplier",
        error: err.message,
      });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(200).json({ message: "Supplier deleted successfully" });
  });
});

router.put("/suppliers/:id", (req, res) => {
  const { id } = req.params;
  const {
    supplierName,
    companyName,
    email,
    phone,
    address,
    city,
    state,
    gstNumber,
  } = req.body;

  const query = `
    UPDATE suppliers
    SET supplierName = ?, companyName = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, gstNumber = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [
      supplierName,
      companyName,
      email,
      phone,
      address,
      city,
      state,
      gstNumber,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Error updating supplier",
          error: err.message,
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          message: "Supplier not found",
        });
      }
      return res.status(200).json({
        message: "Supplier updated successfully",
      });
    }
  );
});

export default router;
