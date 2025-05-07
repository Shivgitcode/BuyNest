import { api } from "@/api/axios";
import type { OrderProps } from "@/types/types";
import { AxiosError } from "axios";

export const getAllAdminOrders = async (): Promise<OrderProps | undefined> => {
	try {
		const response = await api.get("/admin/orders");
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message);
		}
	}
};
