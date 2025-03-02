import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/error";
import { verifyToken } from "../utils/tokenGenerator";
import type { SignUp } from "../utils/types";

declare global {
	namespace Express {
		interface Request {
			user?: SignUp;
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
		const isToken = await verifyToken(token);
		if (!isToken) {
			return next(new ErrorHandler("Unauthorized User", 401));
		}
		const user = isToken as SignUp;
		req.user = user;
		next();
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
