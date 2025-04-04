import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const passwordUpdate = async (data: {
	currentPassword: string;
	confirmPassword: string;
}) => {
	try {
		const res = await api.put("/user/password", {
			password: data.confirmPassword,
			checkPassword: data.currentPassword,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
