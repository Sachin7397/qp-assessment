"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Access denied." });
        return; // ✅ Explicitly return to avoid issues
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next(); // ✅ No return needed here
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token." });
        return; // ✅ Ensure function always ends properly
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ error: "Access denied" });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
