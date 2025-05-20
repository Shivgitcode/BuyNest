import { api } from "@/api/axios";
import { auth, provider } from "@/config/firebase";
import { AxiosError } from "axios";
import { signInWithPopup } from "firebase/auth";

export const googleAuthFn = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const idToken = await user.getIdToken();
		const res = await api.post(
			"/auth/save-user",
			{
				uid: user.uid,
				email: user.email,
				name: user.displayName,
				phoneNumber: user.phoneNumber,
			},
			{
				headers: { Authorization: `Bearer ${idToken}` },
			},
		);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) throw error;
	}
};
