import { api } from "@/api/axios";
import type { ProductProps } from "@/types/types";

export const addToCart = async (
	data: ProductProps,
	number?: number,
): Promise<ProductProps[] | undefined> => {
	try {
		const quantity = number || 1;
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
		return res.data.data.Product;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
