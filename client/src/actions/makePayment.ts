import { api } from "@/api/axios";
import { AxiosError } from "axios";

const makePayment = async (data: {
	orderAmount: number;
	totalItems: number;
	phoneNumber: number;
}) => {
	try {
		const res = await api.post("/payment", {
			orderAmount: data.orderAmount,
			totalItems: data.totalItems,
			phoneNumber: data.phoneNumber,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};

export default makePayment;
