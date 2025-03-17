import { addNewProduct } from "@/actions/addProducts";
import { getOneProduct } from "@/actions/getOneProduct";
import { updateProducts } from "@/actions/updateProduct";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProductProps } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ImageIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

// Sample product data (for edit mode)
const sampleProducts = [
	{
		id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
		product: "iPad Pro 12.9-inch",
		desc: "Apple's most powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
		price: "1099",
		categoryId: "tablet-cat-id",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format",
	},
	{
		id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
		product: "ASUS ROG Gaming Monitor",
		desc: "27-inch 4K HDR gaming monitor with 144Hz refresh rate and 1ms response time.",
		price: "799",
		categoryId: "monitor-cat-id",
		category: "Monitors",
		image:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format",
	},
];

// Sample categories
const categories = [
	{ id: "laptop-cat-id", category: "Laptops" },
	{ id: "smartphone-cat-id", category: "Smartphones" },
	{ id: "audio-cat-id", category: "Audio" },
	{ id: "tablet-cat-id", category: "Tablets" },
	{ id: "accessory-cat-id", category: "Accessories" },
	{ id: "monitor-cat-id", category: "Monitors" },
	{ id: "camera-cat-id", category: "Cameras" },
	{ id: "component-cat-id", category: "Components" },
];

const AdminProductForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditMode = Boolean(id);
	const queryClient = useQueryClient();
	console.log(isEditMode, "inside ProductForm");

	const {
		data: sampleProduct,
		isPending,
		isFetching,
		isSuccess,
	} = useQuery({
		queryKey: ["oneproduct", id],
		queryFn: () => getOneProduct(id as string),
		enabled: isEditMode,
	});
	console.log(JSON.stringify(sampleProduct), "shivansh");

	const { mutateAsync: addProduct } = useMutation({
		mutationFn: addNewProduct,
		onMutate: () => {
			toast.loading("adding product", { id: "add-product" });
		},
		onSuccess: (data) => {
			console.log(data);

			toast.success(data.message);
			toast.dismiss("add-product");
			queryClient.invalidateQueries({ queryKey: ["adminproducts"] });
			navigate("/admin/products");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("add-product");
		},
	});
	useEffect(() => {
		if (isSuccess) {
			setFormData(sampleProduct as ProductProps);
		}
	}, [sampleProduct]);

	// Find the product if in edit mode
	const { mutateAsync: updatingProduct } = useMutation({
		mutationFn: updateProducts,
		onMutate: () => {
			toast.loading("updating product", { id: "update-product" });
		},
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["adminproducts"] });

			toast.dismiss("update-product");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("update-product");
		},
	});

	// Form state
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState("");
	const [formData, setFormData] = useState({
		product: sampleProduct?.product || "",
		desc: sampleProduct?.desc || "",
		price: sampleProduct?.price || "",
		categoryId: sampleProduct?.categoryId || "none",
		image: sampleProduct?.image || "",
	});

	const productFormData = new FormData();
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		if (e.target instanceof HTMLInputElement && e.target.files) {
			setFile(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (value: string) => {
		setFormData((prev) => ({ ...prev, categoryId: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submission initiated");

		// Create a new FormData instance inside the submit handler
		const productFormData = new FormData();
		productFormData.append("product", formData.product);
		productFormData.append("desc", formData.desc);
		productFormData.append("price", formData.price);
		productFormData.append("category", formData.categoryId);

		// Check if file is set before appending
		if (file) {
			productFormData.append("img", file);
		}

		console.log("Form data being submitted:", {
			product: formData.product,
			desc: formData.desc,
			price: formData.price,
			category: formData.categoryId,
			img: file ? file.name : "No file selected",
		});

		if (isEditMode) {
			console.log("Updating product...");
			await updatingProduct({
				productId: id as string,
				productData: productFormData,
			});
		} else {
			console.log("Adding new product...");
			await addProduct(productFormData);
		}
	};

	return (
		<AdminLayout title={isEditMode ? "Edit Product" : "Add New Product"}>
			<Button
				variant="ghost"
				className="mb-6"
				onClick={() => navigate("/admin/products")}
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Products
			</Button>

			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 mb-6 md:grid-cols-3">
					{/* Product Information */}
					<div className="md:col-span-2 space-y-6">
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="grid gap-4">
										<div>
											<Label htmlFor="product">Product Name</Label>
											<Input
												id="product"
												name="product"
												value={formData.product}
												onChange={handleChange}
												required
											/>
										</div>

										<div>
											<Label htmlFor="desc">Description</Label>
											<Textarea
												id="desc"
												name="desc"
												value={formData.desc}
												onChange={handleChange}
												rows={5}
												required
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div>
										<Label htmlFor="categoryId">Category</Label>
										<Select
											value={formData.categoryId}
											onValueChange={handleCategoryChange}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="none">Select a category</SelectItem>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.category}
													>
														{category.category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label htmlFor="price">Price</Label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
												<span className="text-gray-500">$</span>
											</div>
											<Input
												id="price"
												name="price"
												type="number"
												min="0"
												step="0.01"
												className="pl-7"
												value={formData.price}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Image Upload */}
					<div>
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div>
										<Label htmlFor="image">Product Image</Label>
										<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
											{file !== null ? (
												<div className="text-center">
													<img
														src={preview}
														alt="Product preview"
														className="mx-auto h-32 w-32 object-contain rounded"
													/>
													<div className="mt-4 flex text-sm leading-6 text-gray-600">
														<Label
															htmlFor="file-upload"
															className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
														>
															<span>Change image</span>
															<Input
																id="file-upload"
																name="file-upload"
																type="file"
																className="sr-only"
															/>
														</Label>
													</div>
												</div>
											) : (
												<div className="text-center">
													<ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
													<div className="mt-4 flex text-sm leading-6 text-gray-600">
														<Label
															htmlFor="file-upload"
															className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
														>
															<span>Upload a file</span>
															<Input
																id="file-upload"
																name="file-upload"
																type="file"
																onChange={handleChange}
																className="sr-only"
															/>
														</Label>
														<p className="pl-1">or drag and drop</p>
													</div>
													<p className="text-xs leading-5 text-gray-600">
														PNG, JPG, GIF up to 10MB
													</p>
												</div>
											)}
										</div>
										<Input
											id="image"
											name="image"
											value={sampleProduct?.image}
											onChange={handleChange}
											placeholder="Or enter image URL"
											className="mt-2"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => navigate("/admin/products")}
					>
						Cancel
					</Button>
					<Button type="submit">
						<Save className="mr-2 h-4 w-4" />
						{isEditMode ? "Update Product" : "Create Product"}
					</Button>
				</div>
			</form>
		</AdminLayout>
	);
};

export default AdminProductForm;
