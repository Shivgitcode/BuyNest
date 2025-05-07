import { getAllAdminOrders } from "@/actions/getAllAdminOrders";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	FileText,
	Package,
	PackageX,
	Search,
	Truck,
} from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const statusConfig = {
	pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
	processing: { color: "bg-blue-100 text-blue-800", icon: Package },
	shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
	completed: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
	cancelled: { color: "bg-red-100 text-red-800", icon: PackageX },
};

const AdminOrders = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const { data: orders } = useQuery({
		queryKey: ["orders"],
		queryFn: getAllAdminOrders,
	});

	const filteredOrders = orders?.data.filter((order) => {
		const matchesSearch =
			order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customer_details.customer_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			order.customer_details.customer_email
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || order.orderStatus === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const renderStatusBadge = (status: string) => {
		const config = statusConfig[status as keyof typeof statusConfig];
		const StatusIcon = config.icon;

		return (
			<div className="flex items-center gap-1.5">
				<StatusIcon className="h-4 w-4" />
				<span className="capitalize">{status}</span>
			</div>
		);
	};

	return (
		<AdminLayout title="Orders">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
				<div className="relative w-full sm:w-auto">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
					<Input
						type="search"
						placeholder="Search orders..."
						className="pl-9 w-full sm:w-[300px]"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="w-full sm:w-auto">
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="All Statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Statuses</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="processing">Processing</SelectItem>
							<SelectItem value="shipped">Shipped</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
							<SelectItem value="cancelled">Cancelled</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Items</TableHead>
							<TableHead className="text-right">Total</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredOrders?.map((order) => (
							<TableRow key={order.order_id}>
								<TableCell className="font-medium">{order.order_id}</TableCell>
								<TableCell>
									<div>
										<div>{order.customer_details.customer_name}</div>
										<div className="text-sm text-gray-500">
											{order.customer_details.customer_email}
										</div>
									</div>
								</TableCell>
								<TableCell>
									{new Date(order.createdAt).toLocaleDateString()} at{" "}
									{new Date(order.createdAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</TableCell>
								<TableCell>
									<Badge
										className={`${statusConfig[order.orderStatus as keyof typeof statusConfig].color} border-0`}
									>
										{renderStatusBadge(order.orderStatus)}
									</Badge>
								</TableCell>
								<TableCell>{order.totalItems}</TableCell>
								<TableCell className="text-right">
									${order.order_amount.toFixed(2)}
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end space-x-1">
										<Button variant="ghost" size="icon" asChild>
											<Link to={`/admin/orders/${order.order_id}`}>
												<Eye className="h-4 w-4" />
												<span className="sr-only">View Order</span>
											</Link>
										</Button>
										<Button variant="ghost" size="icon">
											<FileText className="h-4 w-4" />
											<span className="sr-only">Order Details</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between mt-4">
				<div className="text-sm text-gray-500">
					Showing {filteredOrders?.length} of {orders?.data.length} orders
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="icon">
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="sm" className="px-4">
						Page 1 of 1
					</Button>
					<Button variant="outline" size="icon">
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminOrders;
