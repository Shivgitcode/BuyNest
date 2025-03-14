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
import { ArrowLeft, ImageIcon, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

// Sample product data (for edit mode)
const sampleProducts = [
	{
		id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
		product: "iPad Pro 12.9-inch",
		desc: "Apple's most powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
		price: 1099,
		categoryId: "tablet-cat-id",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format",
	},
	{
		id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
		product: "ASUS ROG Gaming Monitor",
		desc: "27-inch 4K HDR gaming monitor with 144Hz refresh rate and 1ms response time.",
		price: 799,
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

	// Find the product if in edit mode
	const existingProduct = isEditMode
		? sampleProducts.find((p) => p.id === id)
		: null;

	// Form state
	const [formData, setFormData] = useState({
		product: existingProduct?.product || "",
		desc: existingProduct?.desc || "",
		price: existingProduct?.price || "",
		categoryId: existingProduct?.categoryId || "none", // Changed from empty string to "none"
		image: existingProduct?.image || "",
	});

	// Handle form input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle category selection
	const handleCategoryChange = (value: string) => {
		setFormData((prev) => ({ ...prev, categoryId: value }));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);

		// In a real app, you would make an API call here
		// For now, just navigate back to products list
		navigate("/admin/products");
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
													<SelectItem key={category.id} value={category.id}>
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
											{formData.image ? (
												<div className="text-center">
													<img
														src={formData.image}
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
											value={formData.image}
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
