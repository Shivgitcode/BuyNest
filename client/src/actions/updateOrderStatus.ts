import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const orderStatusFn = async (data: {
	orderId: string;
	status: string;
}) => {
	try {
		console.log(data);
		const res = await api.patch(`/order/update/${data.orderId}`, {
			status: data.status,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
