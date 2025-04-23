import nodemailer from "nodemailer";
import env from "./env";

export const transportMail = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.NODEMAILER_USER,
		pass: env.NODEMAILER_PASSWORD,
	},
});
