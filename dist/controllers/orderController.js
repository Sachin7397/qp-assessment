"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../config/db"));
// 📌 Create Order (User)
const createOrder = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;
    if (!items || !Array.isArray(items)) {
        res.status(400).json({ error: "Invalid order items" });
        return;
    }
    try {
        const order = await db_1.default.order.create({
            data: {
                userId,
                items: { create: items.map(item => ({ groceryId: item.groceryId, quantity: item.quantity })) },
            },
        });
        res.status(201).json({ message: "Order placed", order });
    }
    catch {
        res.status(500).json({ error: "Failed to create order" });
    }
};
exports.createOrder = createOrder;
// 📌 Get User Orders
const getUserOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await db_1.default.order.findMany({ where: { userId }, include: { items: true } });
        res.status(200).json(orders);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
exports.getUserOrders = getUserOrders;
