import type { NextFunction, Request, Response } from "express";
import { type Model, Op } from "sequelize";
import { logger } from "../logger/devLogger";
import type {
	CartItemAttributes,
	CartItemCreationAttributes,
} from "../models/cart.model";
import CartItem from "../models/cart.model";
import Product from "../models/product.model";
export const addToCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.user?.id;
		logger.debug(id as string, { file: "products.ts" });
		const { productId, quantity } = req.body;
		let addInCart: Model<
			CartItemAttributes,
			CartItemCreationAttributes
		> | null = null;
		let addInCart2: Model<
			CartItemAttributes,
			CartItemCreationAttributes
		> | null = null;
		const findProduct = await CartItem.findOne({
			where: {
				[Op.and]: [{ userId: id }, { productId }],
			},
			include: {
				model: Product,
			},
		});
		logger.debug(findProduct?.toJSON().id as string, { name: "debug id" });
		if (findProduct) {
			logger.debug(findProduct?.toJSON().id as string, {
				name: "inside findProduct",
			});

			// Increment the quantity
			await CartItem.increment(
				{ quantity: 1 },
				{
					where: {
						id: findProduct.toJSON().id,
					},
				},
			);

			addInCart2 = await CartItem.findOne({
				where: {
					id: findProduct.toJSON().id,
				},
				include: {
					model: Product,
				},
			});
		} else {
			logger.debug("inside else block");
			const createdItem = await CartItem.create(
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
			addInCart = await CartItem.findOne({
				where: {
					id: createdItem.toJSON().id,
				},
				include: Product,
			});
		}

		logger.debug(JSON.stringify(addInCart));
		logger.debug(JSON.stringify(addInCart2));

		res.status(200).json({
			message: "product added to Cart",
			data: findProduct ? addInCart2 : addInCart || {},
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
		console.log("i am inside try");
		const id = req.user?.id;
		if (!id) {
			logger.error("No user ID found in request", { file: "cart.ts" });
			res.status(401).json({ message: "Unauthorized - No user ID found" });
			return;
		}

		logger.debug("Fetching cart items for user", {
			userId: id,
			file: "cart.ts",
		});

		const getAllCartItems = await CartItem.findAll({
			where: {
				userId: id,
			},
			include: Product,
		});

		logger.debug("Successfully fetched cart items", {
			count: getAllCartItems.length,
			file: "cart.ts",
		});

		res.status(200).json({
			message: "cart items",
			data: getAllCartItems,
		});
	} catch (error) {
		console.log("i am inside catch");
		logger.error("Error fetching cart items", {
			error: error instanceof Error ? error.message : "Unknown error",
			file: "cart.ts",
		});
		if (error instanceof Error) next(error);
		else next(new Error("Unknown error occurred while fetching cart items"));
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
		const id = req.params.itemId;
		console.log(user?.id);

		await CartItem.destroy({
			where: {
				[Op.and]: [{ id }, { userId: user?.id }],
			},
		});

		res.status(200).json({
			message: "item removed",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
export const updateQuantity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { newQuantity } = req.body;
		await CartItem.update(
			{
				quantity: newQuantity,
			},
			{
				where: {
					id,
				},
			},
		);
		res.status(200).json({
			message: "quantity updated",
		});
	} catch (error) {
		if (error instanceof Error) next(Error);
	}
};
