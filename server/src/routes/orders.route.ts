import express from "express";
import { createOrder } from "../controllers/orders";
import { checkAuth } from "../middleware/auth.middleware";

export const orderRouter = express.Router();

orderRouter.post("/payment", checkAuth, createOrder);
