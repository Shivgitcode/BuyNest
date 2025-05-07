import { z } from "zod";
export const SignupSchema = z.object({
	username: z.string({ message: "username required" }),
	email: z
		.string({ message: "enter email" })
		.email({ message: "enter valid mail" }),
	password: z.string({ message: "enter password" }),
	role: z.string({ message: "Please mention your role" }).optional(),
	address: z.string({ message: "Please add your Address" }),
	phoneNumber: z.number().min(10, { message: "phone number invalid" }),
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
	image: z.string().optional(),
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

export const UpdateUserSchema = z.object({
	username: z.string().optional(),
	email: z.string().optional(),
	password: z.string().optional(),
	phoneNumber: z.string().optional(),
	address: z.string().optional(),
});

export type UpdateUserProps = z.infer<typeof UpdateUserSchema>;

export const ProcessEnvSchema = z.object({
	PORT: z.string(),
	NODE_ENV: z.enum(["production", "development"]),
	JWTSECRET: z.string(),
	DB_URL: z.string(),
	ACCESS_ID: z.string(),
	SECRET_ACCESS_ID: z.string(),
	REGION: z.string(),
	BUCKET: z.string(),
	DEPLOYED_URL: z.string(),
	CASHFREE_APP_ID: z.string(),
	CASHFREE_SECRET_KEY: z.string(),
	TWILIO_ACCOUNT_ID: z.string(),
	TWILIO_AUTH_TOKEN: z.string(),
	TWILIO_PHONE_NUMBER: z.string(),
	NODEMAILER_USER: z.string(),
	NODEMAILER_PASSWORD: z.string(),
});

export const TwilioSchema = z.object({
	account_sid: z.string(),
	api_version: z.string(),
	body: z.string(),
	date_created: z.string(),
	date_sent: z.string(),
	date_updated: z.string(),
	direction: z.string(),
	error_code: z.null(),
	error_message: z.null(),
	from: z.string(),
	num_media: z.string(),
	num_segments: z.string(),
	price: z.null(),
	price_unit: z.null(),
	messaging_service_sid: z.string(),
	sid: z.string(),
	status: z.string(),
	subresource_uris: z.object({
		media: z.string(),
	}),
	tags: z.object({
		campaign_name: z.string(),
		message_type: z.string(),
	}),
	to: z.string(),
	uri: z.string(),
});

export type TwilioProps = z.infer<typeof TwilioSchema>;
