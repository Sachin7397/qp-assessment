"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groceryController_1 = require("../controllers/groceryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, groceryController_1.addGrocery);
router.get("/", authMiddleware_1.authenticate, groceryController_1.getAllGroceries);
router.put("/:id", authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, groceryController_1.updateGrocery);
router.delete("/:id", authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, groceryController_1.deleteGrocery);
exports.default = router;
