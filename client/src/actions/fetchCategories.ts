import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const fetchCategories = async (): Promise<
	{ id: string; category: string }[] | undefined
> => {
	try {
		const res = await api.get("/products/categories");
		return res.data.categories;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
