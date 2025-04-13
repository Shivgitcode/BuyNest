import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const updateCartItem = async (data: {
	quantity: number;
	id: string;
}) => {
	try {
		const res = await api.patch(`/cart/${data.id}`, {
			newQuantity: data.quantity,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
