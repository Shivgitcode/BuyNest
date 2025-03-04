import { api } from "@/api/axios";
import type { User } from "@/types/types";
import { AxiosError } from "axios";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
type AuthContextProps = {
	user: User | null;
	error: Error | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
};
export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export default function AuthContextWrapper({
	children,
}: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<AxiosError | null>(null);
	const fetchUser = async () => {
		try {
			const res = await api.get("/auth/user", { withCredentials: true });

			if (res.data) {
				console.log(res.data, "hello");
				setUser(res.data?.user);
			}
		} catch (error) {
			if (error instanceof AxiosError) setError(error);
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<AuthContext.Provider
			value={{ user, error, setUser, isAuthenticated: !!user }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (typeof context === "undefined") {
		throw new Error("context undefined");
	}
	return context;
};
