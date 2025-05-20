import { getAllOrderItems } from "@/actions/getAllOrderItems";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { Link, useParams } from "react-router";

const OrderSummary = () => {
	const { orderId } = useParams<{ orderId: string }>();
	console.log(orderId);
	const { data: oneOrder } = useQuery({
		queryKey: ["orderItems", "orderId"],
		queryFn: () => getAllOrderItems(orderId as string),
		enabled: typeof orderId === "string",
	});

	if (!oneOrder) {
		return (
			<div className="max-w-xl mx-auto mt-16">
				<Card>
					<CardContent className="p-8 text-center">
						<h2 className="text-xl font-semibold mb-4">Order not found</h2>
						<Button asChild>
							<Link to="/profile/orders">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Orders
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto mt-10 space-y-8">
			<Button variant="link" asChild className="pl-0 mb-2">
				<Link to="/profile/orders">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Orders
				</Link>
			</Button>

			<Card>
				<CardHeader className="flex flex-row items-center gap-4">
					<ReceiptText size={30} className="text-violet-500" />
					<div>
						<CardTitle>Order Summary</CardTitle>
						<CardDescription>
							Order #{oneOrder?.data.order_id} • Placed on{" "}
							{oneOrder?.data.createdAt}
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="mb-6 grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="font-medium text-gray-700">Invoice No:</span>
							<span className="ml-2">{oneOrder.data.invoiceNo}</span>
						</div>
						<div>
							<span className="font-medium text-gray-700">Shipping To:</span>
							<span className="ml-2">
								{oneOrder.data.customer_details.customer_name}
							</span>
						</div>
						<div>
							<span className="font-medium text-gray-700">Email:</span>
							<span className="ml-2">
								{oneOrder.data.customer_details.customer_email}
							</span>
						</div>
						<div className="col-span-2">
							<span className="font-medium text-gray-700">Address:</span>
							<span className="ml-2">{`${oneOrder.data.address.street}, ${oneOrder.data.address.city}, ${oneOrder.data.address.state}, ${oneOrder.data.address.zipCode}, ${oneOrder.data.address.country}`}</span>
						</div>
					</div>
					<div className="border-b mb-4" />
					<h3 className="font-semibold mb-2">Items</h3>
					<div className="mb-6">
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-gray-50 text-gray-700">
									<th className="py-2 px-2 text-left">Product</th>
									<th className="py-2 px-2">Qty</th>
									<th className="py-2 px-2 text-right">Price</th>
									<th className="py-2 px-2 text-right">Total</th>
								</tr>
							</thead>
							<tbody>
								{oneOrder?.data.allItems.map((item, idx) => (
									<tr key={idx} className="border-b last:border-0">
										<td className="py-2 px-2">{item.name}</td>
										<td className="py-2 px-2 text-center">{item.quantity}</td>
										<td className="py-2 px-2 text-right">
											${item.unitprice.toFixed(2)}
										</td>
										<td className="py-2 px-2 text-right">
											${(item.unitprice * item.quantity).toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan={3} className="py-2 px-2 text-right font-bold">
										Total:
									</td>
									<td className="py-2 px-2 text-right font-bold">
										$
										{oneOrder.data.allItems
											.reduce((sum, x) => sum + x.unitprice * x.quantity, 0)
											.toFixed(2)}
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					<div className="border-t pt-3 flex justify-end">
						<div>
							<div className="flex justify-between gap-8 text-sm mb-1">
								<span>Subtotal:</span>
								<span>
									$
									{oneOrder.data.allItems
										.reduce((sum, x) => sum + x.unitprice * x.quantity, 0)
										.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between gap-8 text-base mt-2 font-bold">
								<span>Grand Total:</span>
								<span>
									$
									{oneOrder.data.allItems
										.reduce((sum, x) => sum + x.unitprice * x.quantity, 0)
										.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OrderSummary;
