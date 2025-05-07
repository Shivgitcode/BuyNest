import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ErrorHandler from "../ErrorHandler/error";
import { logger } from "../logger/devLogger";
import Product from "../models/product.model";
import { putImage } from "../utils/aws";
import { category } from "../utils/data";
import { ProductSchema } from "../utils/types";
import { UpdateSchema } from "../utils/types";
export const addProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.body);
		const parseBody = ProductSchema.safeParse(req.body);
		const imgFile = req.file;
		console.log(imgFile);
		if (!parseBody.success) {
			logger.debug("inside parseif");
			const validationError = parseBody.error.errors.map((err) => {
				return err.message;
			});
			console.log(validationError);
			return next(new ErrorHandler(`${validationError.join(", ")}`, 400));
		}
		if (!imgFile && !parseBody.data.image) {
			console.log("hello ");
			return next(new ErrorHandler("please give a img", 400));
		}
		let url = parseBody.data.image;
		console.log(parseBody.data.category);
		if (imgFile) {
			const id = uuidv4();
			const key = `${id}-${imgFile?.originalname}`;
			url = (await putImage(imgFile.buffer, key)) as string;
		}

		const createProduct = await Product.create({
			...parseBody.data,
			image: url,
			price: Number.parseInt(parseBody.data.price),
			categoryId: category.get(parseBody.data.category.toLowerCase()),
		});
		res.status(201).json({
			message: "product added",
			data: createProduct.toJSON(),
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { productId } = req.params;
		const deletedProduct = await Product.destroy({
			where: {
				id: productId,
			},
		});
		res.status(200).json({
			message: "product successfully removed",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const updateProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { productId } = req.params;
		const files = req.file;

		console.log(files);
		console.log(productId);
		console.log(req.body);
		const parseBody = UpdateSchema.safeParse(req.body);
		let url = parseBody.data?.image;
		console.log(parseBody);
		console.log(parseBody.data);
		if (files) {
			const id = uuidv4();
			const key = `${id}-${files.originalname}`;
			url = await putImage(files.buffer, key);
		}
		const updateProduct = await Product.update(
			{
				...parseBody.data,
				image: url,
				price: Number.parseInt(parseBody.data?.price as string),
			},
			{
				where: {
					id: productId,
				},
			},
		);
		res.status(200).json({
			message: "product updated",
		});
	} catch (error) {
		next(error);
	}
};
