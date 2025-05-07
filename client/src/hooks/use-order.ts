import { allOrders } from "@/actions/getAllOrders";
import { useQuery } from "@tanstack/react-query";
export default function useOrder() {
	const { data: orders, isPending } = useQuery({
		queryKey: ["orders"],
		queryFn: allOrders,
	});
	return { orders, isPending };
}
