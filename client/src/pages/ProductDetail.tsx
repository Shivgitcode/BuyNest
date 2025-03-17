import { getOneProduct } from "@/actions/getOneProduct";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { product } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
	// const [mainImage, setMainImage] = useState(product.images[0]);
	const [quantity, setQuantity] = useState(1);

	// Get product ID from URL
	const { id } = useParams<{ id: string }>();
	const { data: product } = useQuery({
		queryKey: ["oneProduct", id],
		queryFn: () => getOneProduct(id as string),
	});

	// Increase/decrease quantity handlers
	const increaseQuantity = () => setQuantity((prev) => prev + 1);
	const decreaseQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow pt-24 pb-16">
				<div className="container mx-auto px-4">
					{/* Product Details */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
						{/* Product Images */}
						<div className="space-y-4">
							<div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
								<img
									src={product?.image}
									alt={product?.product}
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						{/* Product Info */}
						<div className="flex flex-col justify-between">
							<div>
								<h1 className="text-3xl font-bold mb-2">{product?.product}</h1>
								<div className="flex items-center gap-2 mb-4">
									<div className="star-rating">
										{Array(5)
											.fill(0)
											.map((_, i) => (
												<span
													key={i}
													className={
														i < Math.round(5)
															? "text-yellow-400"
															: "text-gray-300"
													}
												>
													★
												</span>
											))}
									</div>
									<span className="text-sm text-gray-600">
										({5}) · {78} reviews
									</span>
								</div>

								<div className="mb-6">
									<div className="flex items-center gap-3">
										<span className="text-2xl font-bold">
											${Number.parseInt(product?.price as string).toFixed(2)}
										</span>
										{/* {product.discount && (
											<span className="text-sm text-gray-500 line-through">
												${product.discount.toFixed(2)}
											</span>
										)}
										{product.discount && (
											<span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
												Save ${(product.discount - product.price).toFixed(2)}
											</span>
										)} */}
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<span className="block font-medium mb-2">Quantity</span>
										<div className="flex items-center w-32 border border-gray-300 rounded-md">
											<button
												type="button"
												className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black border-r"
												onClick={decreaseQuantity}
											>
												-
											</button>
											<span className="flex-1 text-center">{quantity}</span>
											<button
												type="button"
												className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black border-l"
												onClick={increaseQuantity}
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Button className="py-6 w-full relative overflow-hidden cart-btn flex items-center justify-center gap-2">
									<ShoppingCart className="h-5 w-5" />
									Add to Cart
								</Button>
								<Button
									variant="outline"
									className="py-6 w-full flex items-center justify-center gap-2"
								>
									<Heart className="h-5 w-5" />
									Add to Wishlist
								</Button>
							</div>
						</div>
					</div>

					{/* Product Description, Details, Reviews Tabs */}
					<div className="mb-16">
						<Tabs defaultValue="description" className="w-full">
							<TabsList className=" flex justify-center w-[30%] mx-auto mb-8">
								<TabsTrigger value="description">Description</TabsTrigger>
							</TabsList>

							<TabsContent value="description" className="py-4">
								<div className="max-w-3xl mx-auto">
									<p className="text-gray-700 leading-relaxed">
										{product?.desc}
									</p>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default ProductDetail;
