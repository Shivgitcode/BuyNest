import { z } from "zod";
export const SignupSchema = z.object({
	username: z.string({ message: "username required" }),
	email: z
		.string({ message: "enter email" })
		.email({ message: "enter valid mail" }),
	password: z.string({ message: "enter password" }),
	role: z.string({ message: "Please mention your role" }).optional(),
	address: z.string({ message: "Please add your Address" }),
});
export type SignUp = z.infer<typeof SignupSchema> & { id: string };

export const LoginSchema = z.object({
	email: z
		.string({ message: "Email required" })
		.email({ message: "invalid email format" }),
	password: z.string(),
});
export type Login = z.infer<typeof LoginSchema>;

export const ProductSchema = z.object({
	product: z.string(),
	desc: z.string(),
	price: z.string(),
	category: z.string(),
	image: z.string(),
});

export type Products = z.infer<typeof ProductSchema>;

export const fileSchema = z.object({
	fieldname: z.string(),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string(),
	size: z.number(),
	destination: z.string(),
	filename: z.string(),
	path: z.string(),
	buffer: z.instanceof(Buffer).optional(),
});

// Type definition from the schema
type FileType = z.infer<typeof fileSchema>;

export interface ProductData {
	id: string;
	product: string;
	price: number;
	image: string;
}

export interface CartItemResult {
	productId: string;
	totalQuantity: number;
	Product: ProductData;
}

export interface RawQueryResult {
	productId: string;
	totalQuantity: string;
	product_id: string;
	product_name: string;
	product_price: number;
	product_image: string;
}

export const UpdateSchema = z.object({
	product: z.string().optional(),
	desc: z.string().optional(),
	price: z.string().optional(),
	image: z.string().optional(),
});
export type UpdateProp = z.infer<typeof UpdateSchema>;
