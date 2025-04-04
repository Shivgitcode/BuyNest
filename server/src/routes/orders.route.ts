import express from "express";
import { createOrder, verifyPayment } from "../controllers/orders";
import { checkAuth } from "../middleware/auth.middleware";

export const orderRouter = express.Router();

orderRouter.post("/payment", checkAuth, createOrder);
orderRouter.post("/verify", checkAuth, verifyPayment);
