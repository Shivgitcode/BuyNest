import { api } from "@/api/axios";
import type { CartProps, ProductProps } from "@/types/types";

export const addToCart = async (
	data: ProductProps,
): Promise<CartProps | undefined> => {
	try {
		const quantity = data.quantity || 1;
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
		return res.data.data;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
