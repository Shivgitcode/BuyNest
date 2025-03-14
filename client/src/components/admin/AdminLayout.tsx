import { Button } from "@/components/ui/button";
import { BellIcon, MenuIcon, UserCircle } from "lucide-react";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
	children: React.ReactNode;
	title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-100 flex">
			<AdminSidebar />

			{/* Mobile sidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 flex z-40 md:hidden">
					<div
						className="fixed inset-0 bg-gray-600 bg-opacity-75"
						onKeyDown={() => setSidebarOpen(false)}
					/>
					<div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
						<AdminSidebar />
					</div>
				</div>
			)}

			<div className="flex-1 flex flex-col">
				<header className="bg-white shadow-sm">
					<div className="flex items-center justify-between h-16 px-4 sm:px-6">
						<div className="flex items-center">
							<button
								type="button"
								className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								onClick={() => setSidebarOpen(true)}
							>
								<span className="sr-only">Open sidebar</span>
								<MenuIcon className="h-6 w-6" />
							</button>
							<h1 className="text-xl font-semibold text-gray-900 md:ml-0 ml-2">
								{title}
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<Button variant="ghost" size="icon">
								<BellIcon className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="icon">
								<UserCircle className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</header>

				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
