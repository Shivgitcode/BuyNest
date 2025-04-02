import type { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

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
