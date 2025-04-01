import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleX } from "lucide-react";
import { Link } from "react-router";

const PaymentFailed = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<Card className="max-w-md w-full shadow-lg">
				<CardHeader className="pb-4 text-center">
					<div className="flex justify-center mb-4">
						<div className="rounded-full bg-red-100 p-3">
							<CircleX className="h-12 w-12 text-red-600" strokeWidth={1.5} />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						Payment Failed
					</CardTitle>
				</CardHeader>
				<CardContent className="text-center px-6">
					<p className="text-gray-600 mb-6">
						We were unable to process your payment. Please check your payment
						details and try again.
					</p>
					<div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
						<p className="text-amber-800 text-sm">
							If you believe this is an error or need assistance, please contact
							our customer support.
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-2 pt-2">
					<Button asChild className="w-full">
						<Link to="/cart">Try Again</Link>
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/">Return to Home</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default PaymentFailed;
