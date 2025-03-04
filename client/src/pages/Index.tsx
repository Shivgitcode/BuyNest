import { getFeaturedProducts } from "@/actions/getFeaturedProducts";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
// import { productsData } from "@/utils/data";
import { categoriesData } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Index = () => {
	const [isLoaded, setIsLoaded] = useState(true);
	const {
		data: productsData,
		isError,
		isFetching,
	} = useQuery({
		queryKey: ["featured"],
		queryFn: getFeaturedProducts,
	});

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow pt-16">
				{/* Hero section */}
				<section className="relative hero-section h-[85vh] bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=1600"
						alt="Summer Collection"
						className="w-full h-full object-cover object-center absolute inset-0"
					/>
					<div className="absolute inset-0 bg-black/30" />
					<div className="container mx-auto px-4 h-full flex items-center relative z-10">
						<div
							className={
								"hero-content max-w-md text-white transition-opacity duration-500 "
							}
						>
							<span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wider uppercase rounded mb-4">
								New Collection
							</span>
							<h1 className="text-5xl font-bold mb-4">
								Summer Collection 2024
							</h1>
							<p className="text-xl mb-8">
								Discover the latest trends in fashion.
							</p>
							<Button
								asChild
								className="bg-white text-black hover:bg-white/90 transition-all px-8 py-6 text-base"
							>
								<Link to="/shop">
									Shop Now
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Categories */}
				<section className="py-16 container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
						<p className="text-gray-600 max-w-xl mx-auto">
							Browse our curated collections designed for every occasion.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{categoriesData.map((category, index) => (
							<CategoryCard
								key={index}
								title={category.title}
								image={category.image}
								link={category.link}
							/>
						))}
					</div>
				</section>

				{/* Featured Products */}
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<div className="mb-12 flex justify-between items-end">
							<div>
								<h2 className="text-3xl font-bold mb-2">Featured Products</h2>
								<p className="text-gray-600">
									Discover our most popular items loved by customers.
								</p>
							</div>
							<Link
								to="/shop"
								className="flex items-center text-sm font-medium hover:underline"
							>
								View All
								<ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
							{isFetching ? (
								<ProductCardSkeleton />
							) : (
								productsData?.map((el) => (
									<ProductCard
										key={el.id}
										id={el.id}
										name={el.product}
										price={el.price}
										image={el.image}
									/>
								))
							)}
						</div>
					</div>
				</section>

				{/* Promotion Banner */}
				<section className="py-16 container mx-auto px-4">
					<div className="bg-gray-900 rounded-lg overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-2">
							<div className="p-12 flex flex-col justify-center">
								<span className="text-white/80 text-sm uppercase tracking-wider mb-2">
									Limited Time Offer
								</span>
								<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
									Up to 50% Off Summer Sale
								</h2>
								<p className="text-white/80 mb-8">
									Upgrade your wardrobe with our exclusive sale on seasonal
									favorites.
								</p>
								<div>
									<Button
										asChild
										className="bg-white text-black hover:bg-white/90 transition-all"
									>
										<Link to="/shop">Shop the Sale</Link>
									</Button>
								</div>
							</div>
							<div className="relative h-64 md:h-auto">
								<img
									src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&w=800"
									alt="Summer Sale"
									className="w-full h-full object-cover object-center"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Newsletter Section */}
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4 max-w-4xl text-center">
						<h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
						<p className="text-gray-600 mb-8">
							Subscribe to our newsletter to receive updates on new arrivals,
							special offers, and style guides.
						</p>
						<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
							<input
								type="email"
								placeholder="Your email address"
								className="w-full sm:flex-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/10"
							/>
							<Button className="w-full sm:w-auto">Subscribe</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default Index;
