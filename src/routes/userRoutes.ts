import express from 'express';
import { createUser, updateUser, getUser } from "../controllers/userController";

const router = express.Router();

router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.get("/users/:userId", getUser);

export default router;
