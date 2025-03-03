import { api } from "@/api/axios";
import type { ProductProps } from "@/types/types";
import { AxiosError } from "axios";

export const getAllProducts = async (): Promise<ProductProps[] | undefined> => {
	try {
		const res = await api.get("/products");
		console.log(res.data.data);

		return res.data.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};

export const getProductsByCategory = async (
	category: string,
): Promise<ProductProps[] | undefined> => {
	try {
		const res = await api.get(`/products/${category}`);
		return res.data.data.products;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
