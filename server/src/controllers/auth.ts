import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/error";
import { logger } from "../logger/devLogger";
import User from "../models/user.model";
import { signedToken } from "../utils/tokenGenerator";
import { LoginSchema, type SignUp, SignupSchema } from "../utils/types";
export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.debug(JSON.stringify(req.body));
		const parseResult = SignupSchema.safeParse(req.body);
		if (!parseResult.success) {
			const validationErrors = parseResult.error.errors.map(
				(err) => err.message,
			);
			return next(new ErrorHandler(`${validationErrors.join(", ")}`, 400));
		}
		const signupBody = parseResult.data;

		const hashPassword = await bcrypt.hash(signupBody.password, 12);
		const newUser = await User.create({
			username: signupBody.username,
			password: hashPassword,
			email: signupBody.email,
			role: signupBody.role,
			address: signupBody.address,
			phoneNumber: signupBody.phoneNumber,
		});
		res.status(201).json({
			message: "user created",
			data: newUser.toJSON(),
		});
	} catch (error) {
		if (error instanceof Error) next(error.message);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		logger.debug(JSON.stringify(req.body));
		const parseResult = LoginSchema.safeParse(req.body);
		if (!parseResult.success) {
			const validationErrors = parseResult.error.errors.map((err) => {
				err.message;
			});
			return next(new ErrorHandler(`${validationErrors.join(", ")}`, 400));
		}
		const loginData = parseResult.data;
		const user = await User.findOne({
			where: { email: loginData.email },
			attributes: {
				exclude: ["updatedAt"],
			},
		});
		if (!user) {
			next(new ErrorHandler("User do not Exist , SignUp First", 404));
		}
		logger.debug(user?.toJSON());
		const hashedPass = user?.toJSON().password;
		const verifyPass = await bcrypt.compare(loginData.password, hashedPass);
		if (!verifyPass) {
			res.status(401).json({
				message: "Invalid password or username",
			});
		}
		const token = await signedToken(user?.toJSON() as SignUp);
		res.cookie("jwt", token, {
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
			sameSite: "lax",
			secure: true,
		});
		res.status(200).json({
			message: "Logged In Successfully",
			user,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findOne({
			where: { email: req.user?.email },
		});
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}
		res.status(200).json({
			message: "user found",
			success: true,
			user,
		});
	} catch (error) {
		if (error instanceof Error) {
			next(error);
		}
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie("jwt");
	res.status(200).json({
		message: "logged out successfully",
	});
};
