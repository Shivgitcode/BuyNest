import type { CartProps } from "@/types/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStoreProps {
	cartItems: CartProps[];
	setCartItems: (cartItems: CartProps[]) => void;
	addToCart: (item: CartProps) => void;
	removeFromCart: () => void;
}

export const useCartStore = create<CartStoreProps>()(
	persist(
		(set) => ({
			cartItems: [],
			setCartItems: (cartItems: CartProps[]) => {
				set(() => ({ cartItems: cartItems }));
			},
			addToCart: (item: CartProps) => {
				set((state) => {
					const existingItem = state.cartItems.find(
						(el) => el.productId === item.id,
					);
					let items: CartProps[];
					if (existingItem) {
						items = state.cartItems.map((i) =>
							i.productId === item.id ? { ...i, quantity: i.quantity + 1 } : i,
						);
					} else {
						items = [...state.cartItems, item];
					}
					return { cartItems: items };
				});
			},
			removeFromCart: () => {},
		}),
		{ name: "cart-storage" },
	),
);
