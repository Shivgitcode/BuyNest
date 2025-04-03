import { api } from "@/api/axios";
import type { ProfileProps } from "@/types/types";
import { AxiosError } from "axios";
export const updateUser = async ({
	profileData,
	userId,
}: { profileData: ProfileProps; userId: string }) => {
	try {
		const res = await api.put(`/user/${userId}`, profileData);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
