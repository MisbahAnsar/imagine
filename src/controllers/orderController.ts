import { Request, Response } from "express";
import prisma from "../utils/db";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      res.status(400).json({ message: "Insufficient stock" });
      return
    }
    const order = await prisma.order.create({
      data: { userId, productId, quantity },
    });
    await prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: Number(orderId) } });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return
    }

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product || product.stock + order.quantity < quantity) {
      res.status(400).json({ message: "Insufficient stock for this update" });
      return
    }

    await prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock + order.quantity - quantity },
    });

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { productId, quantity },
    });

    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecentOrders = async (req: Request, res: Response) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderDate: {
          gte: sevenDaysAgo,
        },
      },
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersByProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: { productId: Number(productId) },
      include: { user: true },
    });
    const users = orders.map(order => order.user);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
