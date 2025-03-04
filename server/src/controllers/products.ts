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
		const categoryName = req.params.categoryId;
		const id = category.get(categoryName);

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

export const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const allProducts = await Product.findAll({
			include: {
				model: Category,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
			attributes: {
				exclude: ["desc", "createdAt", "updatedAt", "categoryId", "CategoryId"],
			},
		});

		res.status(200).json({
			message: "all products",
			data: allProducts,
		});
	} catch (error) {
		next(error);
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
		const addInCart = await CartItem.create(
			{
				productId,
				userId: id as string,
				quantity,
			},
			{
				include: {
					model: Product,
				},
			},
		);
		const cartItemWithProduct = await CartItem.findOne({
			where: { id: addInCart.id },
			include: {
				model: Product,
			},
		});
		res.status(200).json({
			message: "product added to Cart",
			data: cartItemWithProduct,
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

export async function getAllCategories(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const allCategories = await Category.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});

		res.status(200).json({
			message: "all categories",
			categories: allCategories,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
}

export async function getFeaturedProducts(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const featuredProducts = await Product.findAll({
			limit: 10,
			attributes: {
				exclude: ["desc", "createdAt", "updatedAt", "categoryId", "CategoryId"],
			},
		});

		res.status(200).json({
			message: "featured products",
			featuredProducts,
		});
	} catch (error) {
		next(error);
	}
}

export const getOneProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.productId;
		const findProduct = await Product.findOne({
			where: { id },
		});
		res.status(200).json({
			message: "all products",
			data: findProduct,
		});
	} catch (error) {
		next(error);
	}
};
