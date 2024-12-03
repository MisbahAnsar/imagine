"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.post("/products", productController_1.createProduct);
router.put("/products/:productId", productController_1.updateProduct);
router.get("/products/total-stock", productController_1.getTotalStock);
router.get("/products/:productId", productController_1.getProduct);
exports.default = router;
