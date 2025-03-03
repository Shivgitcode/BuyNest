import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
	return (
		<AccordionItem value="category">
			<AccordionTrigger className="py-3">Category</AccordionTrigger>
			<AccordionContent>
				<div className="space-y-2">
					{/* Simulate multiple skeleton rows */}
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="flex items-center space-x-2">
							{/* Skeleton for the checkbox */}
							<Skeleton className="h-4 w-4 rounded" />
							{/* Skeleton for the label */}
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default CategorySkeleton;
