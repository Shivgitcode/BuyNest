import { api } from "@/api/axios";
import type { ProductProps } from "@/types/types";
import { AxiosError } from "axios";

export const getFeaturedProducts = async (): Promise<
	ProductProps[] | undefined
> => {
	try {
		const res = await api.get("/products/featured");
		return res.data.featuredProducts;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
