import express from "express";
import {
	addProduct,
	addToCart,
	getAllCategories,
	getCartItems,
	getFeaturedProducts,
	getProducts,
} from "../controllers/products";
import { checkAuth } from "../middleware/auth.middleware";

export const productRouter = express.Router();

productRouter.get("/products/categories", getAllCategories);
productRouter.get("/products/featured", getFeaturedProducts);
productRouter.get("/product/cart", checkAuth, getCartItems);
productRouter.post("/products/cart", checkAuth, addToCart);
productRouter.post("/products", checkAuth, addProduct);
productRouter.get("/products/:categoryId", getProducts);
