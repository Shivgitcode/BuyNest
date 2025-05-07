import { api } from "@/api/axios";
import type { OrderItemProps } from "@/types/types";
import { AxiosError } from "axios";
export const getAdminOrderById = async (
	orderId: string,
): Promise<OrderItemProps | undefined> => {
	try {
		const response = await api.get(`/orders/${orderId}`);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
