import { create } from "zustand";

type FilterProps = {
	filterCategories: string[];
	setFilterCategories: (category: string) => void;
	setNullFilter: () => void;
};

export const useFilter = create<FilterProps>((set) => ({
	filterCategories: [],
	setFilterCategories: (category: string) => {
		set((state) => {
			if (state.filterCategories.includes(category)) {
				return {
					filterCategories: state.filterCategories.filter(
						(el) => el !== category,
					),
				};
			}
			return { filterCategories: [...state.filterCategories, category] };
		});
	},
	setNullFilter: () => set({ filterCategories: [] }),
	setPriceFilter: (range: [number, number]) => set({}),
}));
