import { Request, Response } from "express";
import prisma from "../config/db";
import { Prisma } from "@prisma/client"; // ✅ Import Prisma types

// 📌 Create Order (User) & Reduce Grocery Stock
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { items } = req.body;
  const userId = (req as any).user?.id; // ✅ Ensure user ID exists

  // 🛑 Validate input
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Invalid order items" });
    return;
  }

  try {
    // 📌 Start Transaction (Atomic Operation)
    const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => { // ✅ Explicitly typed `tx`
      for (const item of items) {
        const grocery = await tx.grocery.findUnique({
          where: { id: item.groceryId },
          select: { stock: true }, // Ensure `stock` is the correct field in your Prisma schema
        });

        if (!grocery) {
          throw new Error(`Grocery item not found for ID: ${item.groceryId}`);
        }

        if (grocery.stock < item.quantity) {
          throw new Error(`Insufficient stock for groceryId: ${item.groceryId}`);
        }

        // ✅ Reduce Grocery Stock
        await tx.grocery.update({
          where: { id: item.groceryId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // ✅ Create Order
      return tx.order.create({
        data: {
          userId,
          items: {
            create: items.map((item: { groceryId: string; quantity: number }) => ({
              groceryId: item.groceryId,
              quantity: item.quantity,
            })),
          },
        },
      });
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// 📌 Get User Orders
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { grocery: true } }, // Fetch related grocery details
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to fetch orders",
    });
  }
};
