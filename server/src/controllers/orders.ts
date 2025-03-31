import { Cashfree } from "cashfree-pg";
import type { NextFunction, Request, Response } from "express";
import { generateId } from "../utils/utils";
import "../utils/config";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { orderAmount } = req.body;
		const user = req.user;
		const request = {
			order_amount: orderAmount,
			order_currency: "INR",
			order_id: generateId(),
			customer_details: {
				customer_id: user?.id as string,
				customer_phone: "999999999",
				customer_name: user?.username,
				customer_email: user?.email,
			},
		};
		const response = await Cashfree.PGCreateOrder("2025-03-31", request);
		res.status(200).json({
			message: "payment initiated",
			data: response.data,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
