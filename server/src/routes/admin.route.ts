import express from "express";
import {
	addProduct,
	deleteProduct,
	updateProducts,
} from "../controllers/admin";
import { checkAdmin } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

export const adminRouter = express.Router();

adminRouter.post("/product", checkAdmin, upload.single("img"), addProduct);
adminRouter.patch(
	"/product/update/:productId",
	checkAdmin,
	upload.single("img"),
	updateProducts,
);
adminRouter.delete("/product/delete/:productId", checkAdmin, deleteProduct);
