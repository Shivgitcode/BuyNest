import { api } from "@/api/axios";
import type { OrderProps } from "@/types/types";

export const allOrders = async (): Promise<OrderProps | undefined> => {
	try {
		const res = await api.get("/orders");
		console.log("order summmary", res.data);
		return res.data;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
