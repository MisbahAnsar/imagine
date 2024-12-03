import { Request, Response } from "express";
import prisma from "../utils/db";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, phone } });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email, phone },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
