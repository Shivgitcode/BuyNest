import express from "express";
import {
	addToCart,
	getCartItems,
	removeFromCart,
	updateQuantity,
} from "../controllers/cart";
import { checkAuth } from "../middleware/auth.middleware";

export const cartRouter = express.Router();

cartRouter.get("/cart", checkAuth, getCartItems);
cartRouter.post("/cart", checkAuth, addToCart);
cartRouter.patch("/cart/:id", checkAuth, updateQuantity);
cartRouter.delete("/cart/:itemId", checkAuth, removeFromCart);
