import jwt from "jsonwebtoken";
import env from "./env";
import type { SignUp } from "./types";

export const signedToken = async (data: SignUp) => {
	const token = await jwt.sign(data, env.JWTSECRET as string, {
		expiresIn: "1h",
	});
	return token;
};

export const verifyToken = async (data: string) => {
	const token = await jwt.verify(data, env.JWTSECRET as string);
	return token;
};
