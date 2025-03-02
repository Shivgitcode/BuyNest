import { z } from "zod";
export const SignupSchema = z.object({
	username: z.string({ message: "username required" }),
	email: z
		.string({ message: "enter email" })
		.email({ message: "enter valid mail" }),
	password: z.string({ message: "enter password" }),
	role: z.string({ message: "Please mention your role" }),
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
	price: z.number(),
	category: z.string(),
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
