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

export const ProfileSchema = z.object({
	username: z.string(),
	email: z.string(),
	phoneNumber: z.string(),
	address: z.string(),
});

export const PasswordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(1, { message: "Current password is required" }),
		newPassword: z.string(),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Password don't match",
		path: ["confirmPassword"],
	});

export type ProfileProps = z.infer<typeof ProfileSchema>;
export type PasswordProps = z.infer<typeof PasswordSchema>;

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
	quantity: number;
	userId: string;
	productId: string;
	Product: ProductProps;
};
export type ProductFormProps = {
	product: string;
	desc: string;
	category: string;
	price: number;
	img: string;
};

export type OrderProps = {
	message: string;
	data: Order[];
};

export type OrderItemProp = {
	id: string;
	quantity: number;
	unitprice: number;
	name: string;
};

export type OrderItemProps = {
	message: string;
	data: Order & {
		invoiceNo: string;
		allItems: OrderItemProp[];
	};
};

export type Order = {
	cf_order_id: string;
	created_at: Date;
	customer_details: CustomerDetails;
	entity: string;
	order_amount: number;
	payment_session_id: string;
	order_currency: string;
	order_expiry_time: Date;
	order_id: string;
	order_meta: OrderMeta;
	totalItems: number;
	order_note: string;
	order_status: string;
	order_tags: OrderTags;
	terminal_data: null;
	cart_details: CartDetails;
	address: string;
	createdAt: string;
};

export type CartDetails = {
	cart_id: string;
};

export type CustomerDetails = {
	customer_id: string;
	customer_name: string;
	customer_email: string;
	customer_phone: string;
	customer_uid: string;
};

export type OrderMeta = {
	return_url: string;
	payment_methods: string;
	notify_url: string;
};

export type OrderTags = {
	name: string;
	age: string;
	address: string;
};
