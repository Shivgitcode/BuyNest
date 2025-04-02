import { z } from "zod";
export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: string;
	address: string;
	phoneNumber: number;
	createdAt: string;
};
export type ResponseProps = {
	message: string;
	user: User;
};

export const FormSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string().email({ message: "invalid email" }),
	password: z.string(),
	address: z.string(),
	phoneNumber: z
		.string()
		.min(10, { message: "invalid phoneNumber" })
		.max(10, { message: "phone number cannot exceed 10 digits" }),
});

export type FormTypes = z.infer<typeof FormSchema>;

export type SignUpProp = {
	username: string;
	email: string;
	password: string;
	address: string;
	phoneNumber: number;
};

export const LoginSchema = z.object({
	email: z
		.string({ message: "email Required" })
		.email({ message: "Invalid Email" }),
	password: z.string({ message: "password required" }),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export type ProductProps = {
	id: string;
	product: string;
	desc: string;
	image: string;
	price: number;
	categoryId: string;
	quantity: number;
	Category: {
		id: string;
		category: string;
	};
};

export type CartProps = {
	id: string;
	totalQuantity: number;
	userId: string;
	productId: string;
	Product: ProductProps;
};
export type ProductFormProps = {
	product: string;
	desc: string;
	category: string;
	price: string;
	img: string;
};
