import { api } from "@/api/axios";
import type { CartProps, ProductProps } from "@/types/types";

export const addToCart = async (
	data: ProductProps,
): Promise<CartProps | undefined> => {
	try {
		const quantity = data.quantity || 1;
		const cartItems: ProductProps[] = [];
		cartItems.push(data);
		const res = await api.post(
			"/products/cart",
			{
				productId: data.id,
				quantity,
			},
			{
				withCredentials: true,
			},
		);
		console.log(res.data);
		return res.data.data;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
