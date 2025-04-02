import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Home, Package, Settings, User } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

interface ProfileNavLinkProps {
	to: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}

const ProfileNavLink = ({ to, icon, children }: ProfileNavLinkProps) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<Link
			to={to}
			className={cn(
				"flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
				isActive ? "bg-black text-white" : "hover:bg-gray-100",
			)}
		>
			{icon}
			<span>{children}</span>
		</Link>
	);
};

const ProfileLayout = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto px-4 py-16 mt-8">
				<div className="flex items-center gap-2 mb-8">
					<Link
						to="/"
						className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
					>
						<Home size={16} />
						Home
					</Link>
					<span className="text-gray-500">/</span>
					<span className="text-gray-900 font-medium">My Account</span>
				</div>

				<h1 className="text-3xl font-bold mb-8">My Account</h1>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<aside className="md:col-span-1">
						<nav className="flex flex-col gap-2 sticky top-24">
							<ProfileNavLink to="/profile" icon={<User size={18} />}>
								Profile
							</ProfileNavLink>
							<ProfileNavLink to="/profile/orders" icon={<Package size={18} />}>
								My Orders
							</ProfileNavLink>
							<ProfileNavLink
								to="/profile/settings"
								icon={<Settings size={18} />}
							>
								Settings
							</ProfileNavLink>
						</nav>
					</aside>

					<main className="md:col-span-3">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default ProfileLayout;
