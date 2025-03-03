import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import useFetchProducts from "@/hooks/useFetchProducts";
import { productsData } from "@/utils/data";
// Sample electronics products data

const Shop = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8;
	const { productData, isLoading } = useFetchProducts();

	// Calculate pagination
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = productData?.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);
	const totalPages = Math.ceil(productsData.length / productsPerPage);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow pt-24 pb-16">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold">Shop Electronics</h1>
						<Button
							variant="outline"
							className="md:hidden"
							onClick={() => setIsFilterOpen(!isFilterOpen)}
						>
							{isFilterOpen ? "Hide Filters" : "Show Filters"}
						</Button>
					</div>

					<div className="flex flex-col md:flex-row gap-8">
						{/* Sidebar */}
						<div className="w-full md:w-64 md:flex-shrink-0">
							<FilterSidebar isOpen={isFilterOpen} />
						</div>

						{/* Products Grid */}
						<div className="flex-1">
							<div className="bg-white p-4 mb-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
								<div className="text-sm text-gray-600">
									Showing {indexOfFirstProduct + 1}-
									{Math.min(indexOfLastProduct, productsData.length)} of{" "}
									{productsData.length} products
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">Sort by:</span>
									<Select defaultValue="featured">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Sort by" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="featured">Featured</SelectItem>
											<SelectItem value="newest">Newest</SelectItem>
											<SelectItem value="price-low">
												Price: Low to High
											</SelectItem>
											<SelectItem value="price-high">
												Price: High to Low
											</SelectItem>
											<SelectItem value="rating">Highest Rated</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Products */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{currentProducts?.map((el) => (
									<ProductCard
										key={el.id}
										id={el.id}
										name={el.product}
										price={el.price}
										image={el.image}
										description={el.desc}
									/>
								))}
							</div>

							{/* Pagination */}
							<div className="mt-12 flex justify-center">
								<div className="flex space-x-1">
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											handlePageChange(Math.max(currentPage - 1, 1))
										}
										disabled={currentPage === 1}
										className="h-9 w-9"
									>
										←
									</Button>

									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? "default" : "outline"}
												size="icon"
												onClick={() => handlePageChange(page)}
												className="h-9 w-9"
											>
												{page}
											</Button>
										),
									)}

									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											handlePageChange(Math.min(currentPage + 1, totalPages))
										}
										disabled={currentPage === totalPages}
										className="h-9 w-9"
									>
										→
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Shop;
