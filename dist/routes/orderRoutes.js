"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post("/orders", orderController_1.createOrder);
router.get("/orders", orderController_1.getOrders);
router.get("/orders/last-7-days", orderController_1.getRecentOrders);
router.get("/users/:userId/orders", orderController_1.getOrdersByUser);
router.get("/products/:productId/users", orderController_1.getUsersByProduct);
router.put("/orders/:orderId", orderController_1.updateOrder);
exports.default = router;
