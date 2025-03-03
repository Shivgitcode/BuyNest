import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

type ProtectedProps = {
	children: ReactNode;
	fallback: ReactNode;
};

function Protected({ children, fallback }: ProtectedProps) {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return fallback;

	return children;
}

export default Protected;
