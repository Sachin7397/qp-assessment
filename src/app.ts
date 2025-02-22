import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import groceryRoutes from "./routes/groceryRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/grocery", groceryRoutes);
app.use("/orders", orderRoutes);

export default app;
