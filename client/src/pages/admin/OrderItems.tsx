import { getAllOrderItems } from "@/actions/getAllOrderItems";
import { orderStatusFn } from "@/actions/updateOrderStatus";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	ArrowLeft,
	CheckCircle2,
	Package,
	PackageX,
	Truck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

// Update the statusConfig to match the actual status values
const statusConfig = {
	Processing: { color: "bg-blue-100 text-blue-800", icon: Package },
	Shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
	Delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
	Cancelled: { color: "bg-red-100 text-red-800", icon: PackageX },
};

// Mock data for a single order - in a real app, this would be fetched from API
const mockOrder = {
	id: "ORD-2024-1234",
	customer: "John Smith",
	email: "john@example.com",
	phone: "+1 (555) 123-4567",
	date: "2023-06-15T10:30:00",
	total: 1299.98,
	status: "processing",
	items: [
		{
			id: 1,
			name: "Ultra HD Smart TV",
			quantity: 1,
			price: 999.99,
			total: 999.99,
		},
		{
			id: 2,
			name: "Wireless Headphones",
			quantity: 2,
			price: 149.99,
			total: 299.98,
		},
	],
	shippingAddress: {
		street: "123 Main Street",
		city: "Anytown",
		state: "CA",
		zip: "12345",
		country: "United States",
	},
	paymentMethod: "Credit Card (Visa ending in 4242)",
};

const OrderDetail = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const [orderStatus, setOrderStatus] = useState("Processing");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: order } = useQuery({
		queryKey: ["orderAdminItems", orderId],
		queryFn: () => getAllOrderItems(orderId as string),
		enabled: typeof orderId === "string",
	});
	const { mutate: updateOrderStatus } = useMutation({
		mutationFn: orderStatusFn,
		onMutate: () => {
			toast.loading("updating status", { id: "order-status" });
		},
		onSuccess: (data) => {
			toast.success(data.message);
			toast.dismiss("order-status");
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
			toast.dismiss("order-status");
		},
	});

	const renderStatusBadge = (status: string) => {
		const config = statusConfig[status as keyof typeof statusConfig];
		if (!config) return <span className="capitalize">{status}</span>;

		const StatusIcon = config.icon;
		return (
			<div className="flex items-center gap-1.5">
				<StatusIcon className="h-4 w-4" />
				<span className="capitalize">{status}</span>
			</div>
		);
	};

	const handleStatusUpdate = () => {
		setIsSubmitting(true);
		updateOrderStatus({ orderId: orderId as string, status: orderStatus });
		setIsSubmitting(false);
	};
	return (
		<AdminLayout title={`Order #${orderId}`}>
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						size="sm"
						className="gap-1"
						onClick={() => navigate("/admin/orders")}
					>
						<ArrowLeft className="h-4 w-4" /> Back to Orders
					</Button>

					<Badge
						className={`${statusConfig[orderStatus as keyof typeof statusConfig].color} border-0 px-3 py-1.5 text-sm`}
					>
						{renderStatusBadge(order?.data.orderStatus as string)}
					</Badge>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Order Details */}
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Order Details</CardTitle>
							<CardDescription>
								Placed on{" "}
								{new Date(order?.data.createdAt as string).toLocaleString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-medium mb-2">Items</h3>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Product</TableHead>
												<TableHead className="text-right">Qty</TableHead>
												<TableHead className="text-right">Price</TableHead>
												<TableHead className="text-right">Total</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{order?.data.allItems.map((item) => (
												<TableRow key={item.id}>
													<TableCell className="font-medium">
														{item.name}
													</TableCell>
													<TableCell className="text-right">
														{item.quantity}
													</TableCell>
													<TableCell className="text-right">
														${item.unitprice.toFixed(2)}
													</TableCell>
													<TableCell className="text-right">
														${(item.unitprice * item.quantity).toFixed(2)}
													</TableCell>
												</TableRow>
											))}
											<TableRow>
												<TableCell colSpan={3} className="text-right font-bold">
													Order Total:
												</TableCell>
												<TableCell className="text-right font-bold">
													${order?.data.order_amount.toFixed(2)}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</div>

								<Separator />

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<h3 className="text-lg font-medium mb-2">
											Shipping Address
										</h3>
										<div className="text-sm text-gray-600">
											<p>{order?.data.address.street}</p>
											<p>
												{order?.data.address.city}, {order?.data.address.state}{" "}
												{order?.data.address.zipCode}
											</p>
											<p>{order?.data.address.country}</p>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-medium mb-2">Payment Method</h3>
										<p className="text-sm text-gray-600">
											{order?.data.order_currency}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Customer Info and Status Update */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Customer</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-medium">
										{order?.data.customer_details.customer_name}
									</h3>
									<p className="text-sm text-gray-600">
										{order?.data.customer_details.customer_email}
									</p>
									{mockOrder.phone && (
										<p className="text-sm text-gray-600">
											{order?.data.customer_details.customer_phone}
										</p>
									)}
								</div>

								<Separator />

								<div>
									<Label htmlFor="status">Order Status</Label>
									<Select
										value={orderStatus}
										onValueChange={setOrderStatus}
										disabled={isSubmitting}
									>
										<SelectTrigger id="status" className="mt-1.5">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Processing">Processing</SelectItem>
											<SelectItem value="Shipped">Shipped</SelectItem>
											<SelectItem value="Delivered">Delivered</SelectItem>
											<SelectItem value="Cancelled">Cancelled</SelectItem>
										</SelectContent>
									</Select>
									<Button
										className="w-full mt-4"
										onClick={handleStatusUpdate}
										disabled={isSubmitting}
									>
										Update Status
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default OrderDetail;
