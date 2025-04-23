import { api } from "@/api/axios";
import type { OrderItemProps } from "@/types/types";
import { AxiosError } from "axios";

export const getAllOrderItems = async (
	orderId: string,
): Promise<OrderItemProps | undefined> => {
	try {
		console.log(orderId);
		const res = await api.get(`/orders/${orderId}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw Error;
	}
};
