import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getUserOrders);

export default router;
