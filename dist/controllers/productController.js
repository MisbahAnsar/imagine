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
exports.getTotalStock = exports.getProduct = exports.updateProduct = exports.createProduct = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, stock } = req.body;
    try {
        const product = yield db_1.default.product.create({ data: { name, category, price, stock } });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { name, category, price, stock } = req.body;
    try {
        const product = yield db_1.default.product.update({
            where: { id: Number(productId) },
            data: { name, category, price, stock },
        });
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield db_1.default.product.findUnique({
            where: { id: Number(productId) },
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProduct = getProduct;
const getTotalStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.default.product.findMany();
        const totalStock = products.reduce((total, product) => total + product.stock, 0);
        res.status(200).json({ totalStock });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTotalStock = getTotalStock;
