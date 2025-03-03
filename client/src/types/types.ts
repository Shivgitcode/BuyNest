import { z } from "zod";
export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: string;
	address: string;
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
});

export type FormTypes = z.infer<typeof FormSchema>;

export type SignUpProp = {
	username: string;
	email: string;
	password: string;
	address: string;
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
};

export type CartProps = {
	id: string;
	quantity: number;
	userId: string;
	productId: string;
	product: ProductProps;
};
