import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type ProtectedProps = {
	children: ReactNode;
	requiredRole?: string;
};

function Protected({ children, requiredRole }: ProtectedProps) {
	const { isAuthenticated, user } = useAuth();
	const navigate = useNavigate();
	if (!isAuthenticated) navigate("/auth/login");

	if (user?.role !== requiredRole) navigate("/auth/login");

	return children;
}

export default Protected;
