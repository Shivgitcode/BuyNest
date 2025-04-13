import type { CartProps } from "@/types/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStoreProps {
	cartItems: CartProps[];
	cartLen: number;
	setCartItems: (cartItems: CartProps[]) => void;
	addToCart: (item: CartProps) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, currentQuantity: number) => void;
}

export const useCartStore = create<CartStoreProps>()(
	persist(
		(set) => ({
			cartItems: [],
			cartLen: 0,
			setCartItems: (cartItems: CartProps[]) => {
				set(() => ({ cartItems: cartItems, cartLen: cartItems.length }));
			},
			addToCart: (item: CartProps) => {
				set((state) => {
					const existingItem = state.cartItems.find((el) => el.id === item.id);
					let items: CartProps[];
					if (existingItem) {
						items = state.cartItems.map((i) =>
							i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
						);
					} else {
						items = [...state.cartItems, item];
					}
					return { cartItems: items, cartLen: items.length };
				});
			},
			removeFromCart: (itemId: string) => {
				set((state) => {
					const filteredItems = state.cartItems.filter(
						(el) => el.id !== itemId,
					);
					return { cartItems: filteredItems };
				});
			},
			updateQuantity: (itemId, currentQuantity: number) => {
				set((state) => {
					const items = state.cartItems.map((item) =>
						item.id === itemId ? { ...item, quantity: currentQuantity } : item,
					);
					return { cartItems: items };
				});
			},
		}),
		{ name: "cart-storage" },
	),
);
