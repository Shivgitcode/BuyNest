import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useFetchCart from "@/hooks/use-fetchCart";
import useFetchProducts from "@/hooks/useFetchProducts";
import type { ProductProps } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	image: string;
	category?: string;
	rating?: number;
	description?: string;
}

const ProductCard = ({
	id,
	name,
	price,
	image,
	category,
	rating = 5,
	description,
}: ProductCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const { addInCart } = useFetchCart();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const { productData } = useFetchProducts();

	const handleAddToCart = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(isAuthenticated);
		if (!isAuthenticated) {
			navigate("/auth/login");
		}
		const oneProduct = productData?.find((el) => el.id === id);

		addInCart(oneProduct as ProductProps);
	};

	return (
		<div
			className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link
				to={`/product/${id}`}
				className="block relative aspect-square overflow-hidden bg-gray-100"
			>
				<img
					src={image}
					alt={name}
					className="w-full h-full object-contain transition-transform duration-500"
					style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
				/>
				{category && (
					<span className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
						{category}
					</span>
				)}
			</Link>
			<div className="p-4">
				<Link to={`/product/${id}`}>
					<h3 className="font-medium text-base mb-1 hover:text-blue-600 transition-colors line-clamp-2">
						{name}
					</h3>
				</Link>
				{description && (
					<p className="text-gray-600 text-sm mb-3 line-clamp-2">
						{description}
					</p>
				)}
				<div className="flex justify-between items-center">
					<div>
						<p className="font-semibold">${price}</p>
						<div className="star-rating mt-1">
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<span
										key={i}
										className={i < rating ? "text-yellow-400" : "text-gray-300"}
									>
										★
									</span>
								))}
						</div>
					</div>
					<Button
						size="sm"
						className="cart-btn bg-blue-600 hover:bg-blue-700 text-white"
						onClick={(e) => handleAddToCart(e, id)}
					>
						<ShoppingCart className="h-4 w-4 mr-1" />
						<span className="text-xs">Add</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
