import type { NextFunction, Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import { logger } from "../logger/devLogger";
import CartItem from "../models/cart.model";
import Category from "../models/categories.model";
import Product from "../models/product.model";
import { sequelize } from "../sequalize/db";
import { category } from "../utils/data";
import type { RawQueryResult } from "../utils/types";

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
		const addInCart = await CartItem.create(
			{
				productId,
				userId: id as string,
				quantity: quantity as number,
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

		const query = `
      SELECT 
        "Carts"."productId",
        SUM("Carts"."quantity") as "totalQuantity",
        "Products"."id" as "product_id",
        "Products"."product" as "product_name",
        "Products"."price" as "product_price",
        "Products"."image" as "product_image"
      FROM "Carts"
      JOIN "Products" ON "Carts"."productId" = "Products"."id"
      WHERE "Carts"."userId" = :userId
      GROUP BY "Carts"."productId", "Products"."id", "Products"."product", "Products"."price", "Products"."image"
      ORDER BY MAX("Carts"."createdAt") DESC
    `;

		const results = await sequelize.query<RawQueryResult>(query, {
			replacements: { userId: id },
			type: QueryTypes.SELECT,
		});

		const formattedResults = results.map((item) => ({
			productId: item.productId,
			totalQuantity: Number.parseInt(item.totalQuantity),
			Product: {
				id: item.product_id,
				product: item.product_name,
				price: item.product_price,
				image: item.product_image,
			},
		}));

		res.status(200).json({
			message: "cart items",
			data: formattedResults,
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
