import express from 'express';
import { createProduct, updateProduct, getProduct, getTotalStock } from '../controllers/productController';
const router = express.Router();

router.post("/products", createProduct);
router.put("/products/:productId", updateProduct);
router.get("/products/total-stock", getTotalStock);
router.get("/products/:productId", getProduct);

export default router;