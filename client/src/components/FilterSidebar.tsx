import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useFetchCategory from "@/hooks/useFetchCategory";
import { useFilter } from "@/store/filter-store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CategorySkeleton from "./CategorySkeleton";
import Spinner from "./Spinner";

interface FilterSidebarProps {
	isOpen?: boolean;
}

const FilterSidebar = ({ isOpen = true }: FilterSidebarProps) => {
	const { isFetching, isLoading, categories } = useFetchCategory();
	const queryClient = useQueryClient();
	const [sliderValue, setSliderValue] = useState();

	const { filterCategories, setFilterCategories, setNullFilter } = useFilter(
		(state) => state,
	);

	const handleFilter = (category: string) => {
		setFilterCategories(category);

		queryClient.invalidateQueries({
			queryKey: ["product", [...filterCategories]],
		});
	};

	const handlePriceFilter = (value: [number, number]) => {
		console.log(value);
	};

	return isLoading ? (
		<Spinner />
	) : (
		<div
			className={`bg-white p-4 rounded-lg ${isOpen ? "block" : "hidden md:block"}`}
		>
			<div className="flex justify-between items-center mb-4">
				<h3 className="font-medium text-lg">Filters</h3>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setNullFilter()} // Clear all selected categories
				>
					Clear all
				</Button>
			</div>

			<Accordion
				type="multiple"
				defaultValue={["price", "category", "colors", "size"]}
			>
				<AccordionItem value="price">
					<AccordionTrigger className="py-3">Price Range</AccordionTrigger>
					<AccordionContent>
						<div className="py-2">
							<Slider
								defaultValue={[20, 80]}
								max={500}
								step={1}
								onValueChange={handlePriceFilter}
							/>
							<div className="flex justify-between mt-2 text-sm text-muted-foreground">
								<span>$0</span>
								<span>$500</span>
							</div>
							<div className="flex justify-between items-center gap-4 mt-4">
								<div className="flex-1 flex gap-2 items-center">
									<Label htmlFor="min" className="text-xs">
										Min
									</Label>
									<input
										id="min"
										type="number"
										placeholder="0"
										className="w-full p-2 text-sm border rounded"
									/>
								</div>
								<div className="flex-1 flex gap-2 items-center">
									<Label htmlFor="max" className="text-xs">
										Max
									</Label>
									<input
										id="max"
										type="number"
										placeholder="500"
										className="w-full p-2 text-sm border rounded"
									/>
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="category">
					<AccordionTrigger className="py-3">Category</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-2">
							{!isFetching ? (
								categories?.map((el) => (
									<div key={el.id} className="flex items-center space-x-2">
										<Checkbox
											id={`category-${el.category}`}
											value={el.category}
											checked={filterCategories.includes(el.category)}
											onCheckedChange={() => handleFilter(el.category)}
										/>
										<Label
											htmlFor={`category-${el.category}`}
											className="text-sm"
										>
											{el.category}
										</Label>
									</div>
								))
							) : (
								<CategorySkeleton />
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default FilterSidebar;
