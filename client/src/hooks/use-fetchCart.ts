import { addToCart } from "@/actions/addToCart";
import { getCartItems } from "@/actions/getCart";
import { removeItemFromCart } from "@/actions/removeFromCart";
import { updateCartItem } from "@/actions/updateQuantityCart";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useFetchCart() {
	const queryClient = useQueryClient();
	const { isAuthenticated } = useAuth();
	const { mutateAsync: addInCart } = useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			toast.success("item added to cart");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			// queryClient.setQueryData(["cart"], (old: CartProps[]) => {
			// 	if (Array.isArray(old)) return [data, ...old];
			// 	return [data];
			// });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const {
		data: cart,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["cart"],
		queryFn: getCartItems,
		enabled: isAuthenticated,
	});

	const { mutateAsync: removeItem } = useMutation({
		mutationFn: removeItemFromCart,
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (err) => {
			toast.success(err.message);
		},
	});

	const { mutateAsync: updateQuantity } = useMutation({
		mutationFn: updateCartItem,
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { cart, isLoading, isFetching, addInCart, removeItem, updateQuantity };
}
