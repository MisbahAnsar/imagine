import { Request, Response } from "express";
import prisma from "../utils/db";

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, stock } = req.body;
  try {
    const product = await prisma.product.create({ data: { name, category, price, stock } });
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, category, price, stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(productId) },
      data: { name, category, price, stock },
    });
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> =>  {
  const { productId } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTotalStock = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    const totalStock = products.reduce((total, product) => total + product.stock, 0);
    res.status(200).json({ totalStock });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
