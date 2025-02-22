"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGrocery = exports.updateGrocery = exports.getAllGroceries = exports.addGrocery = void 0;
const db_1 = __importDefault(require("../config/db"));
// 📌 Add Grocery (Admin Only)
const addGrocery = async (req, res) => {
    const { name, price, stock } = req.body;
    if (!name || !price || stock === undefined) {
        res.status(400).json({ error: "Name, price, and stock are required" });
        return;
    }
    try {
        const grocery = await db_1.default.grocery.create({ data: { name, price, stock } });
        res.status(201).json({ message: "Grocery added", grocery });
    }
    catch {
        res.status(500).json({ error: "Failed to add grocery" });
    }
};
exports.addGrocery = addGrocery;
// 📌 Get All Groceries (Both Admin & User)
const getAllGroceries = async (req, res) => {
    try {
        const groceries = await db_1.default.grocery.findMany();
        res.status(200).json(groceries);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch groceries" });
    }
};
exports.getAllGroceries = getAllGroceries;
// 📌 Update Grocery (Admin Only)
const updateGrocery = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        const grocery = await db_1.default.grocery.update({
            where: { id },
            data: { name, price, stock },
        });
        res.status(200).json({ message: "Grocery updated", grocery });
    }
    catch {
        res.status(500).json({ error: "Failed to update grocery" });
    }
};
exports.updateGrocery = updateGrocery;
// 📌 Delete Grocery (Admin Only)
const deleteGrocery = async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.default.grocery.delete({ where: { id } });
        res.status(200).json({ message: "Grocery deleted" });
    }
    catch {
        res.status(500).json({ error: "Failed to delete grocery" });
    }
};
exports.deleteGrocery = deleteGrocery;
