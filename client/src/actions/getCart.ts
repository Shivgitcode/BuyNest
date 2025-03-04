import { api } from "@/api/axios";
import type { CartProps } from "@/types/types";
import { Axios, AxiosError } from "axios";

export const getCartItems = async (): Promise<CartProps[] | undefined> => {
	try {
		const res = await api.get("/products/cart", { withCredentials: true });
		console.log(res.data.data);
		return res.data.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error.response?.data;
	}
};
