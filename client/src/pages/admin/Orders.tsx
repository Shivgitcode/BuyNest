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
import { sampleOrders } from "@/utils/data";
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
import { useState } from "react";

// Status badge configuration
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

	// Filter orders based on search term and status
	const filteredOrders = sampleOrders.filter((order) => {
		const matchesSearch =
			order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || order.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	// Function to render status badge
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
						{filteredOrders.map((order) => (
							<TableRow key={order.id}>
								<TableCell className="font-medium">{order.id}</TableCell>
								<TableCell>
									<div>
										<div>{order.customer}</div>
										<div className="text-sm text-gray-500">{order.email}</div>
									</div>
								</TableCell>
								<TableCell>
									{new Date(order.date).toLocaleDateString()} at{" "}
									{new Date(order.date).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</TableCell>
								<TableCell>
									<Badge
										className={`${statusConfig[order.status as keyof typeof statusConfig].color} border-0`}
									>
										{renderStatusBadge(order.status)}
									</Badge>
								</TableCell>
								<TableCell>{order.items}</TableCell>
								<TableCell className="text-right">
									${order.total.toFixed(2)}
								</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="icon">
										<FileText className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between mt-4">
				<div className="text-sm text-gray-500">
					Showing {filteredOrders.length} of {sampleOrders.length} orders
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
