import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const logoutUser = async (): Promise<
	{ message: string } | undefined
> => {
	try {
		const res = await api.post("/logout");
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
