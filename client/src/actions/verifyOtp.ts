import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const verifyOtp = async (data: { otp: string; email: string }) => {
	try {
		const res = await api.post("/verify-otp", {
			otp: data.otp,
			email: data.email,
		});
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
