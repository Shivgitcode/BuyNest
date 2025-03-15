import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const deleteProduct = async (id: string) => {
	try {
		const res = await api.post(`/product/delete/${id}`);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw new Error(error.response?.data);
	}
};
