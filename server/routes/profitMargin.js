import express from "express";
import db from "../database.js";

const router = express.Router();
router.get("/profitMargin", (req,res)=>{
    const query = `SELECT id, productName, price, costPrice FROM products`;

    db.all(query, [], (err,rows)=>{
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        const result = rows.map(product=>{
            const CP = product.costPrice;
            const SP = product.price;
            const profit = SP - CP;
            const profitPercent =  ((profit / CP) * 100).toFixed(2);
            return {
                id: product.id,
                product: product.productName,
                markedPrice: SP,
                costPrice: CP,
                profit: profit,
                profitPercent: profitPercent
            };
        });
        res.json(result);
    });
});
export default router;