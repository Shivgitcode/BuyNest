import type { CartProps } from "@/types/types";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

export default function CartItemCard({ item }: { item: CartProps }) {
	return (
		<div key={item.id} className="mb-6">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
				{/* Product Info */}
				<div className="col-span-1 md:col-span-6">
					<div className="flex items-center space-x-4">
						<div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100">
							<img
								src={item.Product.image}
								alt={item.Product.product}
								className="w-full h-full object-contain"
							/>
						</div>
						<div className="flex flex-col">
							<h3 className="font-medium">{item.Product.product}</h3>
							<div className="text-sm text-gray-500 mt-1">
								{/* <span>Options: {item.options}</span> */}
							</div>
							<button
								type="button"
								className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors mt-2 md:hidden"
							>
								<Trash2 className="h-4 w-4 mr-1" />
								Remove
							</button>
						</div>
					</div>
				</div>

				{/* Price */}
				<div className="col-span-1 md:col-span-2 text-left md:text-center">
					<div className="md:hidden text-sm font-medium text-gray-500">
						Price:
					</div>
					<div>${item.Product.price.toFixed(2)}</div>
				</div>

				{/* Quantity */}
				<div className="col-span-1 md:col-span-2 text-left md:text-center">
					<div className="md:hidden text-sm font-medium text-gray-500">
						Quantity:
					</div>
					<div className="flex items-center justify-start md:justify-center">
						<button type="button" className="text-gray-500 hover:text-gray-700">
							<MinusCircle className="h-5 w-5" />
						</button>
						<span className="mx-2 w-6 text-center">{item.totalQuantity}</span>
						<button type="button" className="text-gray-500 hover:text-gray-700">
							<PlusCircle className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Total */}
				<div className="col-span-1 md:col-span-2 text-left md:text-center font-medium">
					<div className="md:hidden text-sm font-medium text-gray-500">
						Total:
					</div>
					<div>${(item.Product.price * item.totalQuantity).toFixed(2)}</div>
				</div>

				{/* Remove - Desktop */}
				<div className="hidden md:block">
					<button
						type="button"
						className="text-gray-400 hover:text-red-500 transition-colors"
					>
						<Trash2 className="h-5 w-5" />
					</button>
				</div>
			</div>
			<Separator className="mt-6" />
		</div>
	);
}
