import express from "express";
import {
	getAllCategories,
	getAllProducts,
	getFeaturedProducts,
	getOneProduct,
	getProducts,
	getProductsByCategory,
	getProductsByPrice,
} from "../controllers/products";

export const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/categories", getAllCategories);
productRouter.get("/products/featured", getFeaturedProducts);
productRouter.post("/products/filter/category", getProductsByCategory);
productRouter.get("/product/price", getProductsByPrice);
productRouter.get("/products/:category", getProducts);
productRouter.get("/product/:productId", getOneProduct);
