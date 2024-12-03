import express from 'express';
import { createOrder,updateOrder, getOrders, getRecentOrders, getOrdersByUser, getUsersByProduct } from '../controllers/orderController';
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/last-7-days", getRecentOrders);
router.get("/users/:userId/orders", getOrdersByUser);
router.get("/products/:productId/users", getUsersByProduct);
router.put("/orders/:orderId", updateOrder);

export default router;