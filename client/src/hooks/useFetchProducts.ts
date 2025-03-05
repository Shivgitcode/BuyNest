import { getAllProducts, getProductsByCategory } from "@/actions/getProducts";
import { useFilter } from "@/store/filter-store";
import { useQuery } from "@tanstack/react-query";

export default function useFetchProducts() {
	const { filterCategories } = useFilter((state) => state);

	// Check if we should fetch all products or filter by categories
	const shouldFetchAll =
		filterCategories.length === 0 || filterCategories.includes("All Products");

	const {
		data: productData,
		isError,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: shouldFetchAll
			? ["products", "all"]
			: ["products", "byCategory", filterCategories],

		queryFn: shouldFetchAll
			? getAllProducts
			: () => getProductsByCategory(filterCategories),

		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});

	return { productData, isError, isFetching, isLoading };
}
