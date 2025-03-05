import CartEmpty from "@/components/CartComponents/CartEmpty";
import CartItemCard from "@/components/CartComponents/CartItemCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFetchCart from "@/hooks/use-fetchCart";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

// Sample electronics cart data

const Cart = () => {
	const { cart } = useFetchCart();

	// Calculate cart totals
	const subtotal = cart?.reduce(
		(total, item) => total + item.Product.price * item.totalQuantity,
		0,
	);
	const shipping = (subtotal as number) > 0 ? 12.99 : 0;
	const tax = (subtotal as number) * 0.08;
	const total = (subtotal as number) + shipping + tax;

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow pt-24 pb-16">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold mb-8">Your Tech Cart</h1>

					{(cart?.length as number) > 0 ? (
						<div className="flex flex-col lg:flex-row gap-8">
							{/* Cart Items */}
							<div className="flex-grow lg:w-2/3">
								<div className="bg-white rounded-lg shadow-sm p-6">
									<div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 mb-4">
										<div className="col-span-6">Product</div>
										<div className="col-span-2 text-center">Price</div>
										<div className="col-span-2 text-center">Quantity</div>
										<div className="col-span-2 text-center">Total</div>
									</div>

									<Separator className="mb-4 md:hidden" />

									{cart?.map((item) => (
										<CartItemCard key={item.id} item={item} />
									))}

									<div className="flex justify-between items-center mt-6">
										<Link to="/shop">
											<Button variant="outline" className="text-sm">
												← Continue Shopping
											</Button>
										</Link>
										<Button variant="outline" className="text-sm">
											Update Cart
										</Button>
									</div>
								</div>
							</div>

							{/* Order Summary */}
							<div className="lg:w-1/3">
								<div className="bg-white rounded-lg shadow-sm p-6">
									<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
									<Separator className="mb-4" />

									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600">Subtotal</span>
											<span className="font-medium">
												${subtotal?.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Shipping</span>
											<span className="font-medium">
												${shipping.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Tax</span>
											<span className="font-medium">${tax.toFixed(2)}</span>
										</div>
									</div>

									<Separator className="my-4" />

									<div className="flex justify-between mb-6">
										<span className="font-semibold">Total</span>
										<span className="font-bold text-lg">
											${total.toFixed(2)}
										</span>
									</div>

									<Button
										className="w-full py-6 bg-blue-600 hover:bg-blue-700"
										size="lg"
									>
										<ShoppingBag className="mr-2 h-5 w-5" />
										Proceed to Checkout
									</Button>
								</div>
							</div>
						</div>
					) : (
						<CartEmpty />
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Cart;
