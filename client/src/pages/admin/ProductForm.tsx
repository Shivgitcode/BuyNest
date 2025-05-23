import { fetchCategories } from "@/actions/fetchCategories";
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
import useAdminCreateAndUpdate from "@/hooks/use-admin-update-delete";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ImageIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const AdminProductForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditMode = Boolean(id);
	const { isSuccess, sampleProduct, addProduct, updatingProduct } =
		useAdminCreateAndUpdate(isEditMode, id as string);
	const { data: categories } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: fetchCategories,
	});

	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState("");
	const [formData, setFormData] = useState({
		product: "",
		desc: "",
		price: "",
		categoryId: "",
		image: "",
	});

	useEffect(() => {
		if (isSuccess && sampleProduct && categories) {
			const matchingCategory = categories.find(
				(cat) =>
					cat.category.toLowerCase() ===
					sampleProduct.Category?.category?.toLowerCase(),
			);

			setFormData((prev) => ({
				...prev,
				product: sampleProduct.product || "",
				desc: sampleProduct.desc || "",
				price: String(sampleProduct.price) || "",
				categoryId: matchingCategory?.category || "",
				image: sampleProduct.image || "",
			}));
		}
	}, [sampleProduct, isSuccess, categories]);

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

		productFormData.append("product", formData.product);
		productFormData.append("desc", formData.desc);
		productFormData.append("price", String(formData.price));
		productFormData.append("category", formData.categoryId);

		if (file) {
			productFormData.append("img", file);
		} else if (formData.image) {
			productFormData.append("image", formData.image);
		}

		if (isEditMode) {
			await updatingProduct({
				productId: id as string,
				productData: productFormData,
			});
		} else {
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
											<SelectTrigger className="w-full">
												<SelectValue>
													{formData.categoryId || "Select a category"}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												{categories?.map((category) => (
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
