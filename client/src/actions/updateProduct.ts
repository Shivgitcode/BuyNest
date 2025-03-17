import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const updateProducts = async ({
	productId,
	productData,
}: { productId: string; productData: FormData }) => {
	try {
		console.log(productData);
		const res = await api.patch(`/product/${productId}`, productData);
		console.log(res.data);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw new Error(error.response?.data);
	}
};
