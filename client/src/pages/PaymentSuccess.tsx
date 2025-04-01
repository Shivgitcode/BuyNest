import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

const PaymentVerified = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<Card className="max-w-md w-full shadow-lg">
				<CardHeader className="pb-4 text-center">
					<div className="flex justify-center mb-4">
						<div className="rounded-full bg-green-100 p-3">
							<CheckCircle2
								className="h-12 w-12 text-green-600"
								strokeWidth={1.5}
							/>
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						Payment Successful!
					</CardTitle>
				</CardHeader>
				<CardContent className="text-center px-6">
					<p className="text-gray-600 mb-4">
						Your payment has been successfully processed. Thank you for your
						purchase!
					</p>
					<div className="border-t border-gray-200 pt-4 mb-4">
						<div className="flex justify-between mb-2">
							<span className="font-medium text-gray-600">Transaction ID:</span>
							<span className="text-gray-700">#TRX-28973645</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Date:</span>
							<span className="text-gray-700">
								{new Date().toLocaleDateString()}
							</span>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-2 pt-2">
					<Button asChild className="w-full">
						<Link to="/shop">Continue Shopping</Link>
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/cart">View Cart</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default PaymentVerified;
