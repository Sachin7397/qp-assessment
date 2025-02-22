import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Access denied." });
    return; // ✅ Explicitly return to avoid issues
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string; role: string };
    req.user = decoded;
    next(); // ✅ No return needed here
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
    return; // ✅ Ensure function always ends properly
  }
};


export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Access denied" });
    return
  }
  next();
};
