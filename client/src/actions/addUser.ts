import { api } from "@/api/axios";
import type { ResponseProps, SignUpProp } from "@/types/types";
import { AxiosError } from "axios";

export const addUser = async (
	data: SignUpProp,
): Promise<ResponseProps | AxiosError | undefined> => {
	try {
		const res = await api.post("/signup", {
			...data,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
