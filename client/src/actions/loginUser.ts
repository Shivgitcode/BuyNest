import { api } from "@/api/axios";
import type { LoginProps, ResponseProps } from "@/types/types";
import { AxiosError } from "axios";

export async function loginUser(
	data: LoginProps,
): Promise<ResponseProps | undefined> {
	try {
		const res = await api.post("/login", data, {
			withCredentials: true,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError)
			throw new Error(error.response?.data.error);
	}
}
