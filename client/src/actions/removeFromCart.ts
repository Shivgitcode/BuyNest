import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const removeItemFromCart = async (itemId: string) => {
	try {
		const res = await api.delete(`/cart/${itemId}`);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw Error;
	}
};
