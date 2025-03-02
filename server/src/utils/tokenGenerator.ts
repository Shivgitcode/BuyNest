import jwt from "jsonwebtoken";
import type { SignUp } from "./types";
import "./config";

export const signedToken = async (data: SignUp) => {
	const token = await jwt.sign(data, process.env.JWTSECRET as string, {
		expiresIn: "1h",
	});
	return token;
};

export const verifyToken = async (data: string) => {
	const token = await jwt.verify(data, process.env.JWTSECRET as string);
	return token;
};
