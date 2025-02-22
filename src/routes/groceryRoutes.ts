import express from "express";
import { addGrocery, getAllGroceries, updateGrocery, deleteGrocery } from "../controllers/groceryController";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, addGrocery);
router.get("/", authenticate, getAllGroceries);
router.put("/:id", authenticate, authorizeAdmin, updateGrocery);
router.delete("/:id", authenticate, authorizeAdmin, deleteGrocery);

export default router;
