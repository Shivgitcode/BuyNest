import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/error";
import { verifyToken } from "../utils/tokenGenerator";
import type { User } from "../utils/types";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return next(new ErrorHandler("User is not LoggedIn", 401));
		}

		const isToken = await verifyToken(token);
		const user = isToken as User;
		req.user = user;
		next();
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const checkAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return next(new ErrorHandler("User not loggedIn", 401));
		}
		const parsedToken = await verifyToken(token);
		const user = parsedToken as User;
		if (user.role !== "admin") {
			return next(new ErrorHandler("User is not Admin", 401));
		}
		req.user = user;
		next();
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
