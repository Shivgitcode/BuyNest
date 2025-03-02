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

interface FilterSidebarProps {
	isOpen?: boolean;
}

const FilterSidebar = ({ isOpen = true }: FilterSidebarProps) => {
	return (
		<div
			className={`bg-white p-4 rounded-lg ${isOpen ? "block" : "hidden md:block"}`}
		>
			<div className="flex justify-between items-center mb-4">
				<h3 className="font-medium text-lg">Filters</h3>
				<Button variant="ghost" size="sm">
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
							<Slider defaultValue={[20, 80]} max={500} step={1} />
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
							{["All", "Dresses", "Tops", "Pants", "Accessories"].map(
								(category) => (
									<div key={category} className="flex items-center space-x-2">
										<Checkbox id={`category-${category}`} />
										<Label htmlFor={`category-${category}`} className="text-sm">
											{category}
										</Label>
									</div>
								),
							)}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="colors">
					<AccordionTrigger className="py-3">Colors</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-wrap gap-2 py-2">
							{[
								{ name: "Black", color: "#000000" },
								{ name: "White", color: "#FFFFFF" },
								{ name: "Red", color: "#FF0000" },
								{ name: "Blue", color: "#0000FF" },
								{ name: "Green", color: "#00FF00" },
							].map((color) => (
								<div key={color.name} className="flex items-center space-x-2">
									<button
										type="button"
										className="w-6 h-6 rounded-full border shadow-sm"
										style={{ backgroundColor: color.color }}
										title={color.name}
									/>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="size">
					<AccordionTrigger className="py-3">Size</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-4 gap-2">
							{["XS", "S", "M", "L", "XL"].map((size) => (
								<Button
									key={size}
									variant="outline"
									size="sm"
									className="text-center"
								>
									{size}
								</Button>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default FilterSidebar;
