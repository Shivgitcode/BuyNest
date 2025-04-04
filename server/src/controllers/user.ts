import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/error";
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
				returning: true,
			},
		);
		console.log(JSON.stringify(updateUser));

		res.status(200).json({
			message: "user updated successfully",
			data: updateUser,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const updatePassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { password, checkPassword } = req.body;
		const user = req.user;
		const findUser = await User.findOne({
			where: { id: user?.id },
		});
		console.log(findUser?.toJSON().password);
		const isPassword = await bcrypt.compare(
			checkPassword,
			findUser?.toJSON().password,
		);
		if (!isPassword) {
			next(new ErrorHandler("current password do not match", 401));
		}
		const newHashedPassword = await bcrypt.hash(password, 12);
		const updateUserPassword = await User.update(
			{ password: newHashedPassword },
			{
				where: {
					id: user?.id,
				},
			},
		);
		res.status(200).json({
			message: "password updated",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
