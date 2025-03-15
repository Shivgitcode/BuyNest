import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const addNewProduct = async (formdata: FormData) => {
	try {
		const res = await api.post("/products", formdata);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
