import { logoutUser } from "@/actions/logoutUser";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut, Package, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function DropDownNav() {
	const { isAuthenticated, setUser } = useAuth();
	const router = useNavigate();
	const { mutateAsync: logout } = useMutation({
		mutationFn: logoutUser,
		onMutate: () => {
			toast.loading("logging out", { id: "logout-user" });
		},
		onSuccess: (data) => {
			toast.success(data?.message);
			toast.dismiss("logout-user");
			setUser(null);
			router("/auth/login");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("logout-user");
		},
	});
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon">
						<User className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					{isAuthenticated ? (
						<>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link
									to="/profile"
									className="flex items-center w-full cursor-pointer"
								>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/profile/orders"
									className="flex items-center w-full cursor-pointer"
								>
									<Package className="mr-2 h-4 w-4" />
									<span>My Orders</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/profile/settings"
									className="flex items-center w-full cursor-pointer"
								>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Button
									className="flex items-center w-full cursor-pointer"
									onClick={() => logout()}
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Logout</span>
								</Button>
							</DropdownMenuItem>
						</>
					) : (
						<>
							<DropdownMenuLabel>Welcome to BuyNest</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link
									to="/auth/login"
									className="flex items-center w-full cursor-pointer"
								>
									<User className="mr-2 h-4 w-4" />
									<span>Login</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									to="/auth/signup"
									className="flex items-center w-full cursor-pointer"
								>
									<LogIn className="mr-2 h-4 w-4" />
									<span>Sign up</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
