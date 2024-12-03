"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/users", userController_1.createUser);
router.put("/users/:userId", userController_1.updateUser);
router.get("/users/:userId", userController_1.getUser);
exports.default = router;
