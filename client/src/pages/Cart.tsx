import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cartItems } from "@/utils/data";
import { MinusCircle, PlusCircle, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

// Sample electronics cart data

const Cart = () => {
	const [items, setItems] = useState(cartItems);

	// Calculate cart totals
	const subtotal = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const shipping = subtotal > 0 ? 12.99 : 0;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow pt-24 pb-16">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold mb-8">Your Tech Cart</h1>

					{items.length > 0 ? (
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

									{items.map((item) => (
										<div key={item.id} className="mb-6">
											<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
												{/* Product Info */}
												<div className="col-span-1 md:col-span-6">
													<div className="flex items-center space-x-4">
														<div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100">
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-full object-contain"
															/>
														</div>
														<div className="flex flex-col">
															<h3 className="font-medium">{item.name}</h3>
															<div className="text-sm text-gray-500 mt-1">
																<span>Options: {item.options}</span>
															</div>
															<button
																type="button"
																className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors mt-2 md:hidden"
															>
																<Trash2 className="h-4 w-4 mr-1" />
																Remove
															</button>
														</div>
													</div>
												</div>

												{/* Price */}
												<div className="col-span-1 md:col-span-2 text-left md:text-center">
													<div className="md:hidden text-sm font-medium text-gray-500">
														Price:
													</div>
													<div>${item.price.toFixed(2)}</div>
												</div>

												{/* Quantity */}
												<div className="col-span-1 md:col-span-2 text-left md:text-center">
													<div className="md:hidden text-sm font-medium text-gray-500">
														Quantity:
													</div>
													<div className="flex items-center justify-start md:justify-center">
														<button
															type="button"
															className="text-gray-500 hover:text-gray-700"
														>
															<MinusCircle className="h-5 w-5" />
														</button>
														<span className="mx-2 w-6 text-center">
															{item.quantity}
														</span>
														<button
															type="button"
															className="text-gray-500 hover:text-gray-700"
														>
															<PlusCircle className="h-5 w-5" />
														</button>
													</div>
												</div>

												{/* Total */}
												<div className="col-span-1 md:col-span-2 text-left md:text-center font-medium">
													<div className="md:hidden text-sm font-medium text-gray-500">
														Total:
													</div>
													<div>${(item.price * item.quantity).toFixed(2)}</div>
												</div>

												{/* Remove - Desktop */}
												<div className="hidden md:block">
													<button
														type="button"
														className="text-gray-400 hover:text-red-500 transition-colors"
													>
														<Trash2 className="h-5 w-5" />
													</button>
												</div>
											</div>
											<Separator className="mt-6" />
										</div>
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
												${subtotal.toFixed(2)}
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

									<div className="mt-6 p-4 bg-gray-50 rounded-md">
										<h3 className="font-medium mb-2">Have a promo code?</h3>
										<div className="flex">
											<input
												type="text"
												className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
												placeholder="Enter code"
											/>
											<Button
												variant="outline"
												className="rounded-l-none border-l-0"
											>
												Apply
											</Button>
										</div>
									</div>
								</div>

								<div className="bg-white rounded-lg shadow-sm p-6 mt-6">
									<h3 className="font-medium mb-3">Accepted Payment Methods</h3>
									<div className="flex gap-2">
										<div className="w-12 h-8 bg-gray-200 rounded-md" />
										<div className="w-12 h-8 bg-gray-200 rounded-md" />
										<div className="w-12 h-8 bg-gray-200 rounded-md" />
										<div className="w-12 h-8 bg-gray-200 rounded-md" />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="bg-white rounded-lg shadow-sm p-16 text-center">
							<div className="flex justify-center mb-6">
								<ShoppingBag className="h-16 w-16 text-gray-300" />
							</div>
							<h2 className="text-2xl font-semibold mb-2">
								Your tech cart is empty
							</h2>
							<p className="text-gray-500 mb-8">
								Looks like you haven't added any gadgets to your cart yet.
							</p>
							<Link to="/shop">
								<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
									Browse Electronics
								</Button>
							</Link>
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Cart;
