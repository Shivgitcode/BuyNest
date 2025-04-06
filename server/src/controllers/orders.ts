import { Cashfree } from "cashfree-pg";
import type { NextFunction, Request, Response } from "express";
import { generateId } from "../utils/utils";
import "../utils/config";
import { Order } from "../models";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { orderAmount, totalItems } = req.body;

		const user = req.user;
		const orderId = generateId();
		const request = {
			order_amount: orderAmount.toFixed(2),
			order_currency: "INR",
			order_id: orderId,
			customer_details: {
				customer_id: user?.id as string,
				customer_phone: "9999999999",
				customer_name: user?.username,
				customer_email: user?.email,
			},
		};
		const response = await Cashfree.PGCreateOrder("2025-01-01", request);
		const createOrder = await Order.create({
			userId: user?.id,
			orderId: orderId,
			totalItems,
		});

		res.status(200).json({
			message: "payment initiated",
			data: response.data,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const verifyPayment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { orderId } = req.body;
		const paymentVerification = await Cashfree.PGOrderFetchPayments(
			"2025-01-01",
			orderId,
		);
		res.status(200).json({
			message: "payment successfull",
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};

export const allOrders = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const getAllOrders = await Order.findAll({
			where: {
				userId: user?.id,
			},
		});

		const newAllOrders = getAllOrders.map(async (el) => {
			const order = el.toJSON();
			const response = await Cashfree.PGFetchOrder("2025-01-01", order.orderId);

			return { ...response.data, ...order };
		});
		const myOrders = await Promise.all(newAllOrders);
		console.log(myOrders);
		res.status(200).json({
			message: "your orders",
			data: myOrders,
		});
	} catch (error) {
		if (error instanceof Error) next(Error);
	}
};
