import type { NextFunction, Request, Response } from "express";
import { type Model, Op, QueryTypes } from "sequelize";
import { logger } from "../logger/devLogger";
import CartItem, {
	type CartItemAttributes,
	type CartItemCreationAttributes,
} from "../models/cart.model";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import { sequelize } from "../sequalize/db";
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

export const addToCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.user?.id;
		logger.debug(id as string, { file: "products.ts" });
		const { productId, quantity } = req.body;
		let addInCart: Model<CartItemAttributes, CartItemCreationAttributes>;
		let addInCart2: [
			affectedRows: Model<CartItemAttributes, CartItemCreationAttributes>[],
			affectedCount?: number | undefined,
		];
		const findProduct = await CartItem.findOne({
			where: {
				userId: id,
				productId,
			},
		});
		logger.debug(findProduct?.toJSON().id as string, { name: "debug id" });
		if (findProduct) {
			logger.debug(findProduct?.toJSON().id as string, {
				name: "inside findProduct",
			});

			addInCart2 = await CartItem.increment(
				{ quantity: 1 },
				{
					where: {
						id: findProduct.toJSON().id,
					},
				},
			);
		} else {
			addInCart = await CartItem.create(
				{
					productId,
					userId: id as string,
					quantity: quantity as number,
				},
				{
					include: {
						model: Product,
					},
					returning: true,
				},
			);
		}

		res.status(200).json({
			message: "product added to Cart",
			data: findProduct ? addInCart2[0][0][0] : addInCart,
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

		const getAllCartItems = await CartItem.findAll({
			where: {
				userId: id,
			},
			include: Product,
		});

		res.status(200).json({
			message: "cart items",
			data: getAllCartItems,
		});
	} catch (error) {
		console.error("Error fetching cart items:", error);
		if (error instanceof Error) next(error);
		else next(new Error("Unknown error occurred"));
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
		const query = req.query.range;
		const range = JSON.parse(query as string);
		const findByRange = await sequelize.query(
			`SELECT * FROM "Products" where price BETWEEN :range1 and :range2`,
			{
				replacements: {
					range1: Number.parseInt(range[0]),
					range2: Number.parseInt(range[1]),
				},
				type: QueryTypes.SELECT,
			},
		);
		res.status(200).json({
			message: "product by price",
			data: findByRange,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const removeFromCartOne = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const id = req.params.productId;
		const findProduct = await CartItem.findOne({
			where: {
				id,
				userId: user?.id,
			},
		});
		const quantity = findProduct?.toJSON().quantity as number;
		if (quantity > 0) {
			await CartItem.decrement(
				{ quantity: 1 },
				{
					where: {
						productId: id,
					},
				},
			);
		} else {
			await CartItem.destroy({
				where: {
					productId: id,
				},
			});
		}

		res.status(200).json({
			message: "item removed",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
export const removeFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const id = req.params.productId;
		const findProduct = await CartItem.findOne({
			where: {
				id,
				userId: user?.id,
			},
		});
		const quantity = findProduct?.toJSON().quantity as number;
		if (quantity > 0) {
			await CartItem.decrement(
				{ quantity: 1 },
				{
					where: {
						productId: id,
					},
				},
			);
		} else {
			await CartItem.destroy({
				where: {
					productId: id,
				},
			});
		}

		res.status(200).json({
			message: "item removed",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
