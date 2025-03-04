import { getCartItems } from "@/actions/getCart";
import { useCart } from "@/context/CartContext";
import type { CartProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCart() {
	const { setCartItems } = useCart();
	const {
		data: cartItems,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["cart"],
		queryFn: getCartItems,
	});
	const updateCart = () => {
		setCartItems(cartItems as CartProps[]);
	};
	return { cartItems, isLoading, updateCart, isFetching };
}
