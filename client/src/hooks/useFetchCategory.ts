import { fetchCategories } from "@/actions/fetchCategories";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCategory() {
	const {
		data: categories,
		isError,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: ["category"],
		queryFn: fetchCategories,
	});

	return { categories, isError, isFetching, isLoading };
}
