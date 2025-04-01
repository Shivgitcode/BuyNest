import { api } from "@/api/axios";
const verifyPayment = async (data: string) => {
	try {
		console.log(data);
		const res = await api.post("/verify", { orderId: data });
		return res.data;
	} catch (error) {
		if (error instanceof Error) throw error;
	}
};

export default verifyPayment;
