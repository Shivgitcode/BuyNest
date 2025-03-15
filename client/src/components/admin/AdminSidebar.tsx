import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	LogOut,
	Package,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const sidebarItems = [
	{ icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
	{ icon: Package, label: "Products", href: "/admin/products" },
	{ icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
	{ icon: Users, label: "Customers", href: "/admin/customers" },
	{ icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
	const location = useLocation();

	return (
		<div className="hidden md:flex flex-col h-screen w-64 bg-gray-900 text-white">
			<div className="p-5 border-b border-gray-800">
				<h1 className="text-xl font-bold">BuyNest Admin</h1>
			</div>

			<nav className="flex-1 overflow-y-auto py-4">
				<ul className="space-y-1 px-2">
					{sidebarItems.map((item) => (
						<li key={item.href}>
							<Link
								to={item.href}
								className={cn(
									"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
									location.pathname === item.href
										? "bg-gray-800 text-white"
										: "text-gray-400 hover:bg-gray-800 hover:text-white",
								)}
							>
								<item.icon className="h-5 w-5" />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="p-4 border-t border-gray-800">
				<Link
					to="/"
					className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
				>
					<LogOut className="h-5 w-5" />
					Back to Store
				</Link>
			</div>
		</div>
	);
}
