import type { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";

import { logger } from "../logger/devLogger";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import { category } from "../utils/data";

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
		logger.debug("Fetching all products");
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

export const getProductsByCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const names: string[] = req.body.categories;
		console.log(names);
		const ids = names.map((el) => category.get(el));

		const findProductsByCategory = await Product.findAll({
			where: {
				categoryId: {
					[Op.in]: ids,
				},
			},
			include: {
				model: Category,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		if (!findProductsByCategory) {
			res.status(404).json({
				message: "product fetched",
				data: findProductsByCategory,
			});
			return;
		}
		res.status(200).json({
			message: "product fetched",
			data: findProductsByCategory,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const getProductsByPrice = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { range } = req.body;
		const findByRange = await Product.findAll({
			where: {
				price: {
					[Op.between]: [range[0], range[1]],
				},
			},
			include: {
				model: Category,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});

		res.status(200).json({
			message: "product by price",
			data: findByRange,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
