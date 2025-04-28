import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../ErrorHandler/error";
import { logger } from "../logger/devLogger";
import { OTP } from "../models";
import User from "../models/user.model";
import generateOtp from "../utils/generateOtp";
import { transportMail } from "../utils/nodemailer";
import { otpTemplate } from "../utils/template";
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
		logger.debug(parseResult.success);
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
		if (error instanceof Error) next(error);
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
			return;
		}
		await OTP.destroy({
			where: {
				email: user?.toJSON().email,
			},
		});
		const { otp, expiresAt } = generateOtp();
		const otpLiteral = otpTemplate(user?.toJSON().username, otp, "BuyNest");
		await transportMail.sendMail({
			from: "toji082004@gmail.com",
			to: user?.toJSON().email,
			subject: "Otp for login Verification",
			html: otpLiteral,
		});
		const creatingOtp = await OTP.create({
			otp,
			email: user?.toJSON().email,
			phoneNumber: user?.toJSON().phoneNumber,
			expiresAt,
		});
		res.status(200).json({
			message: "otp sent on your mail",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const verifyOtp = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { otp, email } = req.body;
		const findOtp = await OTP.findOne({
			where: {
				email,
			},
		});
		if (findOtp?.toJSON().expiresAt < Date.now()) {
			res.status(401).json({
				message: "otp expired",
			});
			await OTP.destroy({
				where: {
					email,
				},
			});
		}
		const user = await User.findOne({
			where: {
				email,
			},
		});
		const verifyOtp = findOtp?.toJSON().otp.toString() === otp;
		if (!verifyOtp) {
			next(new ErrorHandler("OTP Invalid", 401));
			return;
		}
		signedToken(user?.toJSON() as SignUp, res);
		await OTP.destroy({
			where: {
				email,
			},
		});
		res.status(200).json({
			message: "Otp verified",
			user,
		});
	} catch (err) {
		if (err instanceof Error) next(err);
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
