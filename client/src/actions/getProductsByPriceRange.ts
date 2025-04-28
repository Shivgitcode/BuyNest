import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const getProductsByPrice = async (data: number[]) => {
	try {
		console.log(data);
		const res = await api.post("/product/price", {
			range: data,
		});
		return res.data.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
