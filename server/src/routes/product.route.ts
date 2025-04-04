import express from "express";
import {
	addToCart,
	getAllCategories,
	getAllProducts,
	getCartItems,
	getFeaturedProducts,
	getOneProduct,
	getProducts,
	getProductsByCategory,
	getProductsByPrice,
} from "../controllers/products";
import { checkAuth } from "../middleware/auth.middleware";

export const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/categories", getAllCategories);
productRouter.get("/products/featured", getFeaturedProducts);
productRouter.get("/products/cart", checkAuth, getCartItems);
productRouter.post("/products/cart", checkAuth, addToCart);
productRouter.post("/products/filter/category", getProductsByCategory);
productRouter.get("/product/price", getProductsByPrice);
productRouter.get("/products/:category", getProducts);
productRouter.get("/product/:productId", getOneProduct);
