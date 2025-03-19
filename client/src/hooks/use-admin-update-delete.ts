import { addNewProduct } from "@/actions/addProducts";
import { getOneProduct } from "@/actions/getOneProduct";
import { updateProducts } from "@/actions/updateProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export default function useAdminCreateAndUpdate(
	isEditMode: boolean,
	id: string,
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { data: sampleProduct, isSuccess } = useQuery({
		queryKey: ["oneproduct", id],
		queryFn: () => getOneProduct(id as string),
		enabled: isEditMode,
	});

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
	const { mutateAsync: updatingProduct } = useMutation({
		mutationFn: updateProducts,
		onMutate: () => {
			toast.loading("updating product", { id: "update-product" });
		},
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["adminproducts"] });
			navigate("/admin/products");

			toast.dismiss("update-product");
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("update-product");
		},
	});

	return { addProduct, sampleProduct, isSuccess, updatingProduct };
}
