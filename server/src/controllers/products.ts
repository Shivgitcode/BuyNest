import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ErrorHandler from "../ErrorHandler/error";
import { logger } from "../logger/devLogger";
import CartItem from "../models/cart.model";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import { putImage, signedUrl } from "../utils/aws";
import { category } from "../utils/data";
import { ProductSchema } from "../utils/types";

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.categoryId;

		const getProducts = await Category.findOne({
			where: { id },
			include: Product,
		});

		res.status(200).json({
			message: "all products",
			data: getProducts?.toJSON(),
		});
	} catch (error) {
		if (error instanceof Error) next(error.message);
	}
};

export const addProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parseBody = ProductSchema.safeParse(req.body);
		const imgFile = req.file;
		if (!parseBody.success) {
			const validationError = parseBody.error.errors.map((err) => {
				err.message;
			});
			return next(new ErrorHandler(`${validationError.join(", ")}`, 400));
		}
		if (!imgFile) {
			return next(new ErrorHandler("please give a img", 400));
		}
		const id = uuidv4();
		const key = `${id}-${imgFile.originalname}`;
		await putImage(imgFile.buffer, key);
		const url = await signedUrl(key);
		const createProduct = await Product.create({
			...parseBody.data,
			image: url,
			categoryId: category.get(parseBody.data.category),
		});
		res.status(201).json({
			message: "product added",
			data: createProduct.toJSON(),
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const addToCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.user?.id);
		const id = req.user?.id;
		console.log(id);
		logger.debug(id as string, { file: "products.ts" });
		const { productId, quantity } = req.body;
		const addInCart = await CartItem.create({
			productId,
			userId: id,
			quantity,
		});
		res.status(200).json({
			message: "product added to Cart",
			data: addInCart,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const getCartItems = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.user?.id;
		console.log(id);
		const getProducts = await CartItem.findAll({
			where: { userId: id },
			include: Product,
		});
		res.status(200).json({
			message: "cart items",
			data: getProducts,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
