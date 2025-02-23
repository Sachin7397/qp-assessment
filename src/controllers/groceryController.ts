import { Request, Response } from "express";
import prisma from "../config/db";


export const addGrocery = async (req: Request, res: Response): Promise<void> => {
  const { name, price, stock } = req.body;

  if (!name || !price || stock === undefined) {
    res.status(400).json({ error: "Name, price, and stock are required" });
    return
  }

  try {
    const grocery = await prisma.grocery.create({ data: { name, price, stock } });
    res.status(201).json({ message: "Grocery added", grocery });
  } catch {
    res.status(500).json({ error: "Failed to add grocery" });
  }
};


export const getAllGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await prisma.grocery.findMany();
    res.status(200).json(groceries);
  } catch {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
};


export const updateGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const grocery = await prisma.grocery.update({
      where: { id },
      data: { name, price, stock },
    });
    res.status(200).json({ message: "Grocery updated", grocery });
  } catch {
    res.status(500).json({ error: "Failed to update grocery" });
  }
};


export const deleteGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.grocery.delete({ where: { id } });
    res.status(200).json({ message: "Grocery deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete grocery" });
  }
};
