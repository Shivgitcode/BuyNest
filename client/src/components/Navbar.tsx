import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useFetchCart from "@/hooks/use-fetchCart";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import DropDownNav from "./DropDownNav";

const Navbar = () => {
	const { cart } = useFetchCart();
	const { isAuthenticated } = useAuth();

	return (
		<header className="border-b bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-10">
					<Link to="/" className="font-bold text-xl tracking-tight">
						BuyNest
					</Link>
					<nav className="hidden md:flex space-x-8">
						<Link
							to="/"
							className="nav-link text-sm font-medium transition-colors hover:text-black/80"
						>
							Home
						</Link>
						<Link
							to="/shop"
							className="nav-link text-sm font-medium transition-colors hover:text-black/80"
						>
							Shop
						</Link>
						<Link
							to="/shop"
							className="nav-link text-sm font-medium transition-colors hover:text-black/80"
						>
							New Arrivals
						</Link>
						<Link
							to="/shop"
							className="nav-link text-sm font-medium transition-colors hover:text-black/80"
						>
							Sale
						</Link>
						<Link
							to="/"
							className="nav-link text-sm font-medium transition-colors hover:text-black/80"
						>
							About
						</Link>
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					<Button variant="ghost" size="icon" className="hidden md:flex">
						<Search className="h-5 w-5" />
					</Button>
					<DropDownNav />

					{/* {isAuthenticated ? (
						<Button variant="ghost" size="icon">
							<LogOut className="h-5 w-5" />
						</Button>
					) : (
						<Link to="/auth/login">
							<Button variant="ghost" size="icon">
								<User className="h-5 w-5" />
							</Button>
						</Link>
					)} */}

					<Link to="/cart">
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingCart className="h-5 w-5" />
							<span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
								{isAuthenticated ? cart?.length : 0}
							</span>
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
