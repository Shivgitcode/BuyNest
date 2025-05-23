import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { fetchCategories } from "@/actions/fetchCategories";
import useAdminProduct from "@/hooks/use-admin-product";
import { useQuery } from "@tanstack/react-query";
import {
	ChevronLeft,
	ChevronRight,
	Edit,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const ITEMS_PER_PAGE = 10;
const AdminProducts = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const { adminProducts, isPending, handleDelete } = useAdminProduct();
	const { data: categories } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: fetchCategories,
	});

	const filteredProducts = adminProducts?.filter((product) => {
		const matchesSearch = product.product
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" ||
			product.Category.category.toLowerCase() === categoryFilter.toLowerCase();
		return matchesSearch && matchesCategory;
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [categoryFilter, searchTerm]);

	const totalPages = Math.ceil(
		(filteredProducts?.length || 0) / ITEMS_PER_PAGE,
	);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedProducts = filteredProducts?.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<AdminLayout title="Products">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
				<div className="relative w-full sm:w-auto">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
					<Input
						type="search"
						placeholder="Search products..."
						className="pl-9 w-full sm:w-[300px]"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<Select value={categoryFilter} onValueChange={setCategoryFilter}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="All Categories">
								{categoryFilter === "all"
									? "All Categories"
									: categoryFilter.charAt(0).toUpperCase() +
										categoryFilter.slice(1)}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories?.map((category) => (
								<SelectItem key={category.id} value={category.category}>
									{category.category.charAt(0).toUpperCase() +
										category.category.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button asChild>
						<Link to="/admin/products/new">
							<Plus className="mr-2 h-4 w-4" />
							Add Product
						</Link>
					</Button>
				</div>
			</div>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Category</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isPending ? (
							<div>Loading...</div>
						) : (
							paginatedProducts?.map((product) => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
												<img
													src={product.image}
													alt={product.product}
													className="h-full w-full object-cover"
												/>
											</div>
											<span>{product.product}</span>
										</div>
									</TableCell>
									<TableCell className="max-w-xs truncate">
										{product.desc}
									</TableCell>
									<TableCell>{product.Category.category}</TableCell>
									<TableCell className="text-right">${product.price}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button variant="ghost" size="icon" asChild>
												<Link to={`/admin/products/edit/${product.id}`}>
													<Edit className="h-4 w-4" />
												</Link>
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="text-red-500"
												onClick={() => handleDelete(product.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end mt-4 space-x-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="sm" className="px-4">
					Page {currentPage} of {totalPages}
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</AdminLayout>
	);
};

export default AdminProducts;
