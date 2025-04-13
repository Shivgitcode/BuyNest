import { api } from "@/api/axios";
import type { CartProps } from "@/types/types";
import { AxiosError } from "axios";

export const getCartItems = async (): Promise<CartProps[] | undefined> => {
	try {
		const res = await api.get("/cart", { withCredentials: true });
		if (!res.data || !res.data.data) {
			throw new Error("Invalid response format from server");
		}
		console.log(res.data.data, "inside cart Items");
		return res.data.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.error("Cart fetch error:", error.response?.data || error.message);
			throw error.response?.data || new Error("Failed to fetch cart items");
		}
		throw error;
	}
};
