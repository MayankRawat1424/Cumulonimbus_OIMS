import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
