import { deleteProduct } from "@/actions/deleteProduct";
import { getAllProducts } from "@/actions/getProducts";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useAdminProduct() {
	const queryClient = useQueryClient();

	const { data: adminProducts, isPending } = useQuery({
		queryKey: ["adminproducts"],
		queryFn: getAllProducts,
	});
	const { mutateAsync: handleDelete } = useMutation({
		mutationFn: deleteProduct,
		onMutate: () => {
			toast.loading("deleting product", { id: "delete-product" });
		},
		onSuccess: (data) => {
			toast.success(data.message);
			toast.dismiss("delete-product");
			queryClient.invalidateQueries({ queryKey: ["adminproducts"] });
		},
		onError: (err) => {
			toast.error(err.message);
			toast.dismiss("delete-product");
		},
	});
	return { adminProducts, isPending, handleDelete };
}
