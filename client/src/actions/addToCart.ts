import type { ProductProps } from "@/types/types";

export const addToCart = async (
	data: ProductProps,
): Promise<ProductProps[] | undefined> => {
	try {
		const cartItems: ProductProps[] = [];
		cartItems.push(data);
		return cartItems;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
