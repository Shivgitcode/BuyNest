import { allOrders } from "@/actions/getAllOrders";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
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
import { Search } from "lucide-react";
import { useState } from "react";

// Mock data for orders
const mockOrders = [
	{
		id: "12345",
		date: "June 15, 2023",
		status: "Delivered",
		total: 149.99,
		items: 3,
	},
	{
		id: "12344",
		date: "May 28, 2023",
		status: "Delivered",
		total: 84.5,
		items: 2,
	},
	{
		id: "12343",
		date: "April 12, 2023",
		status: "Delivered",
		total: 199.99,
		items: 1,
	},
	{
		id: "12342",
		date: "March 5, 2023",
		status: "Delivered",
		total: 56.99,
		items: 2,
	},
	{
		id: "12341",
		date: "February 20, 2023",
		status: "Delivered",
		total: 129.99,
		items: 4,
	},
];

const Orders = () => {
	const [statusFilter, setStatusFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const { data: orders, isPending } = useQuery({
		queryKey: ["orders"],
		queryFn: allOrders,
	});

	// Filter orders based on status and search query
	const filteredOrders = orders?.data?.filter((order) => {
		const matchesStatus =
			statusFilter === "all" ||
			order.status.toLowerCase() === statusFilter.toLowerCase();
		const matchesSearch =
			order.order_id.includes(searchQuery) ||
			order.date.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	return (
		<div>
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
						<div>
							<CardTitle>My Orders</CardTitle>
							<CardDescription>View and track all your orders</CardDescription>
						</div>
						<div className="flex flex-col sm:flex-row gap-2">
							<div className="relative">
								<Input
									placeholder="Search by order ID or date"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-8 w-full sm:w-[240px]"
								/>
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="all">All Orders</SelectItem>
										<SelectItem value="processing">Processing</SelectItem>
										<SelectItem value="shipped">Shipped</SelectItem>
										<SelectItem value="delivered">Delivered</SelectItem>
										<SelectItem value="cancelled">Cancelled</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order ID</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Items</TableHead>
									<TableHead className="text-right">Total</TableHead>
									<TableHead className="text-right">Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{!isPending ? (
									orders.data?.map((order) => (
										<TableRow key={order.order_id}>
											<TableCell className="font-medium">
												#{order.order_id}
											</TableCell>
											<TableCell>
												{new Date(order.createdAt).toLocaleDateString("us-en", {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</TableCell>
											<TableCell>
												<span
													className={`inline-block px-2 py-1 rounded-md text-xs font-medium
                          ${
														order.order_status === "PAID"
															? "bg-green-100 text-green-800"
															: order.status === "Processing"
																? "bg-blue-100 text-blue-800"
																: order.status === "Shipped"
																	? "bg-purple-100 text-purple-800"
																	: "bg-red-100 text-red-800"
													}`}
												>
													{order.order_status}
												</span>
											</TableCell>
											<TableCell>{order.totalItems} items</TableCell>
											<TableCell className="text-right">
												${order.order_amount.toFixed(2)}
											</TableCell>
											<TableCell className="text-right">
												<Button variant="outline" size="sm">
													View Details
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-center py-8 text-gray-500"
										>
											No orders found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Orders;
