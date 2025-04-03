import type { NextFunction, Request, Response } from "express";
import { logger } from "../logger/devLogger";
import User from "../models/user.model";
import { type UpdateUserProps, UpdateUserSchema } from "../utils/types";

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const allUsers = await User.findAll();
		res.status(200).json({
			message: "all users",
			data: allUsers,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.debug(JSON.stringify(req.body));
		const parsedBody = UpdateUserSchema.safeParse(req.body);
		const id = req.params.userId;
		const { username, email, address, phoneNumber } =
			parsedBody.data as UpdateUserProps;
		const updateUser = await User.update(
			{
				username,
				email,
				address,
				phoneNumber: Number.parseInt(phoneNumber as string),
			},
			{
				where: {
					id,
				},
			},
		);

		res.status(200).json({
			message: "user updated successfully",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
