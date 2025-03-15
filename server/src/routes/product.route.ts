import express from "express";
import {
	addProduct,
	addToCart,
	deleteProduct,
	getAllCategories,
	getAllProducts,
	getCartItems,
	getFeaturedProducts,
	getOneProduct,
	getProducts,
	getProductsByCategory,
} from "../controllers/products";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

export const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/categories", getAllCategories);
productRouter.get("/products/featured", getFeaturedProducts);
productRouter.get("/products/cart", checkAuth, getCartItems);
productRouter.post("/products/cart", checkAuth, addToCart);
productRouter.post("/products", checkAdmin, upload.single("img"), addProduct);
productRouter.post("/products/filter/category", getProductsByCategory);
productRouter.get("/products/:category", getProducts);
productRouter.post("/product/delete/:productId", checkAdmin, deleteProduct);
productRouter.get("/product/:productId", getOneProduct);
