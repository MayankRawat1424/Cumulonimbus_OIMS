import express from "express"
import db from "../database.js"

const router = express.Router();

router.post("/addSupplier", (req, res) => {
    const { Supplier_name, company_name, email, phone, address, city, state, gst_number} = req.body;
    const query = `
    INSERT INTO suppliers (Supplier_name, company_name, email, phone, address, city, state, gst_number)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
        query,
        [Supplier_name, company_name, email, phone, address, city, state, gst_number],
        function(err){
            if(err)
            {
                return res.status(500).json({ 
                    message: "Shit broke", error: err.message 
                });
            }

            return res.status(201).json({ 
                message: "Supplier added successfully", supplier_id: this.lastID 
            });
        }
    );
});

export default router;