import type { CartProps } from "@/types/types";
import { create } from "zustand";

interface CartStoreProps {
	cartItems: CartProps[];
	setCartItems: (cartItems: CartProps[]) => void;
	addToCart: (item: CartProps) => void;
	removeFromCart: () => void;
}

export const useCartStore = create<CartStoreProps>((set) => ({
	cartItems: [],
	setCartItems: (cartItems: CartProps[]) => {
		set(() => ({ cartItems: cartItems }));
	},
	addToCart: (item: CartProps) => {
		set((state) => {
			const existingItem = state.cartItems.find(
				(el) => el.productId === item.productId,
			);
			let items: CartProps[];
			if (existingItem) {
				items = state.cartItems.map((i) =>
					i.productId === item.productId
						? { ...i, quantity: i.quantity + 1 }
						: i,
				);
			} else {
				items = [...state.cartItems, item];
			}
			return { cartItems: items };
		});
	},
	removeFromCart: () => {},
}));
