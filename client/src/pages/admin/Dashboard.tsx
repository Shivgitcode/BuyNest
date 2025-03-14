import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

const statsData = [
	{
		title: "Total Revenue",
		value: "$45,231.89",
		change: "+20.1% from last month",
		icon: DollarSign,
	},
	{
		title: "New Orders",
		value: "356",
		change: "+12.2% from last month",
		icon: ShoppingCart,
	},
	{
		title: "Products",
		value: "2,420",
		change: "+5.4% from last month",
		icon: Package,
	},
	{
		title: "Conversion Rate",
		value: "3.2%",
		change: "+1.2% from last month",
		icon: TrendingUp,
	},
];

const AdminDashboard = () => {
	return (
		<AdminLayout title="Dashboard">
			{/* Stats Cards */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
				{statsData.map((stat, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								{stat.title}
							</CardTitle>
							<stat.icon className="h-5 w-5 text-gray-500" />
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">{stat.value}</p>
							<p className="text-xs text-gray-500 mt-1">{stat.change}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activity */}
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Recent Orders</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<div
									key={i}
									className="flex items-center justify-between border-b pb-2"
								>
									<div>
										<p className="font-medium">
											Order #{Math.floor(Math.random() * 10000)}
										</p>
										<p className="text-sm text-gray-500">
											{new Date(Date.now() - i * 86400000).toLocaleDateString()}
										</p>
									</div>
									<p className="font-medium">
										${(Math.random() * 500).toFixed(2)}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Popular Products</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="flex items-center gap-4 border-b pb-2">
									<div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
										<Package className="h-5 w-5 text-gray-500" />
									</div>
									<div className="flex-1">
										<p className="font-medium">Product {i + 1}</p>
										<p className="text-sm text-gray-500">
											{Math.floor(Math.random() * 100)} sales
										</p>
									</div>
									<p className="font-medium">
										${(Math.random() * 1000).toFixed(2)}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
};

export default AdminDashboard;
