import { getAllProducts, getProductsByCategory } from "@/actions/getProducts";
import { useQuery } from "@tanstack/react-query";

export default function useFetchProducts(options?: { category?: string }) {
	const { category = "All Products" } = options || {};
	const {
		data: productData,
		isError,
		isFetched,
		isLoading,
	} = useQuery({
		queryKey: category === "All Products" ? ["product"] : ["product", category],
		queryFn:
			category === "All Products"
				? getAllProducts
				: () => getProductsByCategory(category),
	});

	return { productData, isError, isFetched, isLoading };
}
