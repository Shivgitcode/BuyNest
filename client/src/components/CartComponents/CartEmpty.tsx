import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
export default function CartEmpty() {
	return (
		<div className="bg-white rounded-lg shadow-sm p-16 text-center">
			<div className="flex justify-center mb-6">
				<ShoppingBag className="h-16 w-16 text-gray-300" />
			</div>
			<h2 className="text-2xl font-semibold mb-2">Your tech cart is empty</h2>
			<p className="text-gray-500 mb-8">
				Looks like you haven't added any gadgets to your cart yet.
			</p>
			<Link to="/shop">
				<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
					Browse Electronics
				</Button>
			</Link>
		</div>
	);
}
