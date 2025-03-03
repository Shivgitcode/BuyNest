import { api } from "@/api/axios";
import type { ProductProps } from "@/types/types";
import { AxiosError } from "axios";

export const getOneProduct = async (
	id: string,
): Promise<ProductProps | undefined> => {
	try {
		const res = await api.get(`/product/${id}`);
		return res.data.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
