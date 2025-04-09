import { addToCart } from "@/actions/addToCart";
import { getCartItems } from "@/actions/getCart";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cart-store";
import type { CartProps } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useFetchCart() {
	const queryClient = useQueryClient();
	const { isAuthenticated, user } = useAuth();
	const { setCartItems } = useCartStore((state) => state);
	const { mutateAsync: addInCart } = useMutation({
		mutationFn: addToCart,
		onSuccess: (data) => {
			toast.success("item added to cart");
			queryClient.setQueryData(["cart"], (old: CartProps[]) => {
				if (Array.isArray(old)) return [data, ...old];
				return [data];
			});
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
	useEffect(() => {
		console.log("hello done");
		setCartItems(cart as CartProps[]);
	}, [user]);

	return { cart, isLoading, isFetching, addInCart };
}
