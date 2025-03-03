import type { ProductProps } from "@/types/types";
import { type ReactNode, createContext, useContext, useState } from "react";

interface CartContextProps {
	cart: ProductProps[];
	setCartItems: (cart: ProductProps[]) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export default function CartContextWrapper({
	children,
}: { children: ReactNode }) {
	const [cart, setCartItems] = useState<ProductProps[]>([]);

	return (
		<CartContext.Provider value={{ cart, setCartItems }}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === null) {
		throw new Error("cart context is undefined");
	}
	return context;
};
