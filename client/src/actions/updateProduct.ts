import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const updateProducts = async ({
	productId,
	productData,
}: { productId: string; productData: FormData }) => {
	try {
		const res = await api.post(`/product/update/${productId}`, productData);
		console.log(res.data);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error.response?.data;
	}
};
