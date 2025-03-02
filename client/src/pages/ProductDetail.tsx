import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { relatedProducts } from "@/utils/data";
import { product } from "@/utils/data";
import { Heart, Share, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
	const [mainImage, setMainImage] = useState(product.images[0]);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState("");
	const [quantity, setQuantity] = useState(1);

	// Get product ID from URL
	const { id } = useParams<{ id: string }>();

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
									src={mainImage}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="grid grid-cols-4 gap-4">
								{product.images.map((image, index) => (
									<button
										type="button"
										key={index}
										className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
											mainImage === image
												? "border-black"
												: "border-transparent"
										}`}
										onClick={() => setMainImage(image)}
									>
										<img
											src={image}
											alt={`${product.name} view ${index + 1}`}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>
						</div>

						{/* Product Info */}
						<div className="flex flex-col justify-between">
							<div>
								<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
								<div className="flex items-center gap-2 mb-4">
									<div className="star-rating">
										{Array(5)
											.fill(0)
											.map((_, i) => (
												<span
													key={i}
													className={
														i < Math.round(product.rating)
															? "text-yellow-400"
															: "text-gray-300"
													}
												>
													★
												</span>
											))}
									</div>
									<span className="text-sm text-gray-600">
										({product.rating}) · {product.reviewCount} reviews
									</span>
								</div>

								<div className="mb-6">
									<div className="flex items-center gap-3">
										<span className="text-2xl font-bold">
											${product.price.toFixed(2)}
										</span>
										{product.discount && (
											<span className="text-sm text-gray-500 line-through">
												${product.discount.toFixed(2)}
											</span>
										)}
										{product.discount && (
											<span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
												Save ${(product.discount - product.price).toFixed(2)}
											</span>
										)}
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<span className="block font-medium mb-2">Color</span>
										<div className="flex flex-wrap gap-3">
											{product.colors.map((color, index) => (
												<button
													type="button"
													key={index}
													className={`w-8 h-8 rounded-full flex items-center justify-center border ${
														selectedColor === color
															? "border-black"
															: "border-gray-300"
													}`}
													style={{ backgroundColor: color }}
													onClick={() => setSelectedColor(color)}
													aria-label={`Select color ${index + 1}`}
												>
													{selectedColor === color && (
														<span className="text-white">✓</span>
													)}
												</button>
											))}
										</div>
									</div>

									<div>
										<span className="block font-medium mb-2">Size</span>
										<div className="flex flex-wrap gap-2">
											{product.sizes.map((size) => (
												<button
													type="button"
													key={size}
													className={`w-10 h-10 flex items-center justify-center border text-sm transition-colors ${
														selectedSize === size
															? "bg-black text-white border-black"
															: "border-gray-300 hover:border-gray-400"
													}`}
													onClick={() => setSelectedSize(size)}
												>
													{size}
												</button>
											))}
										</div>
										<div className="mt-1">
											<button
												type="button"
												className="text-sm text-gray-600 hover:text-black underline"
											>
												Size guide
											</button>
										</div>
									</div>

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
							<TabsList className="w-full grid grid-cols-3 mb-8">
								<TabsTrigger value="description">Description</TabsTrigger>
								<TabsTrigger value="details">Details & Care</TabsTrigger>
								<TabsTrigger value="reviews">Reviews</TabsTrigger>
							</TabsList>

							<TabsContent value="description" className="py-4">
								<div className="max-w-3xl mx-auto">
									<p className="text-gray-700 leading-relaxed">
										{product.description}
									</p>
								</div>
							</TabsContent>

							<TabsContent value="details" className="py-4">
								<div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
									<div>
										<h3 className="font-medium text-lg mb-4">
											Product Details
										</h3>
										<ul className="space-y-2">
											{product.details.map((detail, index) => (
												<li key={index} className="flex items-start">
													<span className="text-black mr-2">•</span>
													<span className="text-gray-700">{detail}</span>
												</li>
											))}
										</ul>
									</div>
									<div>
										<h3 className="font-medium text-lg mb-4">
											Care Instructions
										</h3>
										<p className="text-gray-700">{product.care}</p>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="reviews" className="py-4">
								<div className="max-w-3xl mx-auto">
									<div className="flex items-center justify-between mb-8">
										<div>
											<h3 className="font-medium text-lg">Customer Reviews</h3>
											<div className="flex items-center mt-1">
												<div className="star-rating mr-2">
													{Array(5)
														.fill(0)
														.map((_, i) => (
															<span
																key={i}
																className={
																	i < Math.round(product.rating)
																		? "text-yellow-400"
																		: "text-gray-300"
																}
															>
																★
															</span>
														))}
												</div>
												<span className="text-sm text-gray-600">
													Based on {product.reviewCount} reviews
												</span>
											</div>
										</div>
										<Button variant="outline">Write a Review</Button>
									</div>

									<div className="space-y-6">
										{/* Sample reviews - would be dynamically generated */}
										<div className="border-t pt-6">
											<div className="flex justify-between mb-2">
												<div>
													<div className="font-medium">Sarah Johnson</div>
													<div className="star-rating">★★★★★</div>
												</div>
												<div className="text-sm text-gray-500">2 days ago</div>
											</div>
											<h4 className="font-medium mb-2">
												Perfect fit and great quality
											</h4>
											<p className="text-gray-700">
												This dress is everything I hoped for! The fabric is
												lightweight but not see-through, and the cut is very
												flattering. I'm usually between sizes and went with the
												smaller one which fits perfectly.
											</p>
										</div>

										<div className="border-t pt-6">
											<div className="flex justify-between mb-2">
												<div>
													<div className="font-medium">Michael Brown</div>
													<div className="star-rating">★★★★☆</div>
												</div>
												<div className="text-sm text-gray-500">1 week ago</div>
											</div>
											<h4 className="font-medium mb-2">
												Great dress but runs small
											</h4>
											<p className="text-gray-700">
												I love the dress but had to return it for a larger size.
												The material is high quality and perfect for summer.
												Just be aware that it runs a bit small compared to other
												brands.
											</p>
										</div>

										<div className="text-center mt-8">
											<Button variant="outline">Load More Reviews</Button>
										</div>
									</div>
								</div>
							</TabsContent>
						</Tabs>
					</div>

					{/* Related Products */}
					<div>
						<h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{relatedProducts.map((product) => (
								<ProductCard
									key={product.id}
									id={product.id}
									name={product.name}
									price={product.price}
									image={product.image}
									rating={product.rating}
								/>
							))}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default ProductDetail;
