import { Cashfree } from "cashfree-pg";
import type { NextFunction, Request, Response } from "express";
import { generateId } from "../utils/utils";
import "../utils/config";
import ErrorHandler from "../ErrorHandler/error";
import { Order, OrderItems } from "../models";
import CartItem from "../models/cart.model";
import Product from "../models/product.model";
import { sequelize } from "../sequalize/db";
import { transportMail } from "../utils/nodemailer";
import { orderTemplate } from "../utils/template";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const transaction = await sequelize.transaction();

	try {
		const { orderAmount, totalItems, phoneNumber } = req.body;
		const user = req.user;
		const orderId = generateId();
		const request = {
			order_amount: orderAmount.toFixed(2),
			order_currency: "INR",
			order_id: orderId,
			customer_details: {
				customer_id: user?.id as string,
				customer_phone: phoneNumber.toString(),
				customer_name: user?.username,
				customer_email: user?.email,
			},
		};
		const response = await Cashfree.PGCreateOrder("2025-01-01", request);
		const createOrder = await Order.create(
			{
				userId: user?.id,
				orderId: orderId,
				totalItems,
			},
			{ transaction },
		);
		const getCartItems = await CartItem.findAll({
			where: {
				userId: user?.id,
			},
			include: Product,
			transaction,
		});

		const orderItems = await Promise.all(
			getCartItems.map(async (el) => {
				const createOrderItems = await OrderItems.create({
					quantity: el.toJSON().quantity,
					unitprice: el.toJSON().Product.price,
					name: el.toJSON().Product.product,
					customerId: user?.id,
					orderId,
				});
				return createOrderItems;
			}),
		);
		await transaction.commit();

		res.status(200).json({
			message: "payment initiated",
			data: response.data,
		});
	} catch (error) {
		await transaction.rollback();
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
		const user = req.user;
		const paymentVerification = await Cashfree.PGOrderFetchPayments(
			"2025-01-01",
			orderId,
		);
		const successfulPayment = paymentVerification.data.find(
			(txn) => txn.payment_status === "SUCCESS",
		);

		const currentOrder = await Cashfree.PGOrderFetchPayments(
			"2025-01-01",
			orderId,
		);

		console.log("current payment verification", paymentVerification);
		if (!successfulPayment) {
			await Order.destroy({
				where: {
					orderId: orderId,
				},
			});
			return next(new ErrorHandler("Payment not successful", 400));
		}
		await CartItem.destroy({
			where: {
				userId: user?.id as string,
			},
		});
		const getAllItems = await OrderItems.findAll({
			where: {
				orderId,
			},
		});
		await transportMail.sendMail({
			from: "toji082004@gmail.com",
			to: user?.email as string,
			subject: "Order Successfull",
			html: orderTemplate(
				orderId,
				currentOrder.data.customer_details?.customer_name as string,
				new Date().toLocaleDateString(),
				getAllItems,
				currentOrder.data.order_amount as number,
				`https://buynest-c70cf.web.app/profile/orders/${orderId}`,
				"BuyNest",
			),
		});
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

export const getOrderItems = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const { orderId } = req.params;
		const getOrder = await Cashfree.PGFetchOrder("2025-01-01", orderId);
		const getAllItems = await OrderItems.findAll({
			where: {
				orderId,
			},
		});

		const oneOrderSum = {
			...getOrder.data,
			invoiceNo: `INV-${getOrder.data.cf_order_id}`,
			allItems: getAllItems,
			address: user?.Address,
		};
		console.log(oneOrderSum);
		res.status(200).json({
			message: "data of one order",
			data: oneOrderSum,
		});
	} catch (err) {
		if (err instanceof Error) next(err);
	}
};

export const getAllOrders = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const getAllOrders = await Order.findAll();
		const newAllOrders = getAllOrders.map(async (el) => {
			const order = el.toJSON();
			const response = await Cashfree.PGFetchOrder("2025-01-01", order.orderId);
			return { ...response.data, ...order };
		});
		const myOrders = await Promise.all(newAllOrders);
		res.status(200).json({
			message: "all orders",
			data: myOrders,
		});
	} catch (error) {
		if (error instanceof Error) next(error);
	}
};
