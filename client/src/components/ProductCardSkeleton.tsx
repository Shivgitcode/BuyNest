import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton: React.FC = () => {
	return (
		<div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
			<div className="relative aspect-square bg-gray-100">
				<Skeleton className="w-full h-full" />
				<Skeleton className="absolute top-2 left-2 h-5 w-16 rounded" />
			</div>

			<div className="p-4">
				<Skeleton className="h-5 w-3/4 mb-2" />

				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-5/6 mb-4" />

				<div className="flex justify-between items-center">
					<div>
						<Skeleton className="h-5 w-16 mb-2" />
						<div className="flex space-x-1">
							{Array(10)
								.fill(0)
								.map((_, i) => (
									<Skeleton key={i} className="h-4 w-4 rounded-full" />
								))}
						</div>
					</div>
					<Skeleton className="h-8 w-20 rounded" />
				</div>
			</div>
		</div>
	);
};
