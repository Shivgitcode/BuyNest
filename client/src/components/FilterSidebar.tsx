import { getProductsByPrice } from "@/actions/getProductsByPriceRange";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CategorySkeleton from "./CategorySkeleton";
import Spinner from "./Spinner";

interface FilterSidebarProps {
	isOpen?: boolean;
}

const FilterSidebar = ({ isOpen = true }: FilterSidebarProps) => {
	const { isFetching, isLoading, categories } = useFetchCategory();
	const queryClient = useQueryClient();
	const [priceRange, setPriceRange] = useState<[number, number]>([20, 500]);

	const { filterCategories, setFilterCategories, setNullFilter } = useFilter(
		(state) => state,
	);

	const handleFilter = (category: string) => {
		setFilterCategories(category);
		queryClient.invalidateQueries({
			queryKey: ["products", [...filterCategories]],
		});
	};

	const { mutateAsync: priceFilter } = useMutation({
		mutationFn: getProductsByPrice,
		onSuccess: (data) => {
			console.log(data, "something is wrong");
			queryClient.setQueryData(["products", "all"], data);
		},
	});

	const handlePriceFilter = (value: [number, number]) => {
		setPriceRange(value);
		priceFilter(value);
	};

	const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const min = Number.parseInt(e.target.value);
		if (!Number.isNaN(min) && min >= 20 && min <= priceRange[1]) {
			handlePriceFilter([min, priceRange[1]]);
		}
	};

	const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const max = Number.parseInt(e.target.value);
		if (!Number.isNaN(max) && max <= 500 && max >= priceRange[0]) {
			handlePriceFilter([priceRange[0], max]);
		}
	};

	return isLoading ? (
		<Spinner />
	) : (
		<div
			className={`bg-white p-4 rounded-lg ${isOpen ? "block" : "hidden md:block"}`}
		>
			<div className="flex justify-between items-center mb-4">
				<h3 className="font-medium text-lg">Filters</h3>
				<Button variant="ghost" size="sm" onClick={() => setNullFilter()}>
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
								defaultValue={priceRange}
								max={500}
								min={20}
								step={1}
								value={priceRange}
								onValueChange={handlePriceFilter}
							/>
							<div className="flex justify-between mt-2 text-sm text-muted-foreground">
								<span>${priceRange[0]}</span>
								<span>${priceRange[1]}</span>
							</div>
							<div className="flex justify-between items-center gap-4 mt-4">
								<div className="flex-1 flex gap-2 items-center">
									<Label htmlFor="min" className="text-xs">
										Min
									</Label>
									<input
										id="min"
										type="number"
										value={priceRange[0]}
										onChange={handleMinInputChange}
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
										value={priceRange[1]}
										onChange={handleMaxInputChange}
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
