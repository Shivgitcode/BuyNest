import express from "express";
import {
	allOrders,
	createOrder,
	getAllOrders,
	getOrderItems,
	verifyPayment,
} from "../controllers/orders";
import { checkAuth } from "../middleware/auth.middleware";

export const orderRouter = express.Router();

orderRouter.post("/payment", checkAuth, createOrder);
orderRouter.post("/verify", checkAuth, verifyPayment);
orderRouter.get("/orders", checkAuth, allOrders);
orderRouter.get("/orders/:orderId", checkAuth, getOrderItems);
orderRouter.get("/admin/orders", checkAuth, getAllOrders);
