import express from "express";
import {
	addProduct,
	addToCart,
	getCartItems,
	getProducts,
} from "../controllers/products";
import { checkAuth } from "../middleware/auth.middleware";

export const productRouter = express.Router();

productRouter.get("/products/:categoryId", getProducts);
productRouter.post("/products/cart", checkAuth, addToCart);
productRouter.post("/products", checkAuth, addProduct);
productRouter.get("/product/cart", checkAuth, getCartItems);
