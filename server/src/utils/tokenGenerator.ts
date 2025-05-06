import type { Response } from "express";
import jwt from "jsonwebtoken";
import env from "./env";
import type { SignUp } from "./types";

export const signedToken = async (data: SignUp, res: Response) => {
	const token = await jwt.sign(data, env.JWTSECRET as string, {
		expiresIn: "1h",
	});

	res.cookie("jwt", token, {
		maxAge: 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});
	return token;
};

export const verifyToken = async (data: string) => {
	const token = await jwt.verify(data, env.JWTSECRET as string);
	return token;
};
