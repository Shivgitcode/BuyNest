import { api } from "@/api/axios";

export const allOrders = async () => {
	try {
		const res = await api.get("/orders");
		return res.data;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};
