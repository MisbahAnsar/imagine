"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByProduct = exports.getOrdersByUser = exports.getRecentOrders = exports.getOrders = exports.updateOrder = exports.createOrder = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        const product = yield db_1.default.product.findUnique({ where: { id: productId } });
        if (!product || product.stock < quantity) {
            res.status(400).json({ message: "Insufficient stock" });
            return;
        }
        const order = yield db_1.default.order.create({
            data: { userId, productId, quantity },
        });
        yield db_1.default.product.update({
            where: { id: productId },
            data: { stock: product.stock - quantity },
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const order = yield db_1.default.order.findUnique({ where: { id: Number(orderId) } });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        const product = yield db_1.default.product.findUnique({ where: { id: Number(productId) } });
        if (!product || product.stock + order.quantity < quantity) {
            res.status(400).json({ message: "Insufficient stock for this update" });
            return;
        }
        yield db_1.default.product.update({
            where: { id: productId },
            data: { stock: product.stock + order.quantity - quantity },
        });
        const updatedOrder = yield db_1.default.order.update({
            where: { id: Number(orderId) },
            data: { productId, quantity },
        });
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOrder = updateOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield db_1.default.order.findMany();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const getRecentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
        const orders = yield db_1.default.order.findMany({
            where: {
                orderDate: {
                    gte: sevenDaysAgo,
                },
            },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRecentOrders = getRecentOrders;
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield db_1.default.order.findMany({
            where: { userId: Number(userId) },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrdersByUser = getOrdersByUser;
const getUsersByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const orders = yield db_1.default.order.findMany({
            where: { productId: Number(productId) },
            include: { user: true },
        });
        const users = orders.map(order => order.user);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsersByProduct = getUsersByProduct;
