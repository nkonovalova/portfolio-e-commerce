import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductSizeE } from "../../../entities/product/model/model.ts";
import {
	PRODUCT_SIZES,
	ProductStatusE,
} from "../../../entities/product/model/model.ts";

export type FilterState = {
	categories: Record<string, boolean>;
	sizes: Record<ProductSizeE, boolean>;
	colors: Record<string, boolean>;
	price: {
		from: string;
		to: string;
	};
	status: Record<ProductStatusE, boolean>;
	name: string;
};

const initialState: FilterState = {
	categories: {},
	sizes: PRODUCT_SIZES.reduce<Record<ProductSizeE, boolean>>(
		(acc, size) => {
			acc[size] = false;
			return acc;
		},
		{} as Record<ProductSizeE, boolean>,
	),
	colors: {},
	price: { from: "", to: "" },
	status: {
		[ProductStatusE.NEW]: false,
		[ProductStatusE.HOT]: false,
		[ProductStatusE.LAST]: false,
		[ProductStatusE.DISCOUNT]: false,
	},
	name: "",
};

export const productsFilterSlice = createSlice({
	name: "productsFilter",
	initialState,
	reducers: {
		initializeCategories: (state, action: PayloadAction<string[]>) => {
			state.categories = action.payload.reduce<Record<string, boolean>>(
				(acc, category) => {
					acc[category] = false;
					return acc;
				},
				{},
			);
		},
		initializeColors: (state, action: PayloadAction<string[]>) => {
			state.colors = action.payload.reduce<Record<string, boolean>>(
				(acc, color) => {
					acc[color] = false;
					return acc;
				},
				{},
			);
		},
		resetFilter: state => {
			const newState = {
				...initialState,
				categories: { ...state.categories },
				colors: { ...state.colors },
			};
			for (const key in newState.categories) {
				newState.categories[key] = false;
			}
			for (const key in newState.colors) {
				newState.colors[key] = false;
			}
			return { ...newState };
		},
		toggleCategory: (state, action: PayloadAction<string>) => {
			state.categories[action.payload] = !state.categories[action.payload];
		},
		toggleSize: (state, action: PayloadAction<ProductSizeE>) => {
			state.sizes[action.payload] = !state.sizes[action.payload];
		},
		toggleColor: (state, action: PayloadAction<string>) => {
			state.colors[action.payload] = !state.colors[action.payload];
		},
		setPriceFrom: (state, action: PayloadAction<string>) => {
			state.price.from = action.payload;
		},
		setPriceTo: (state, action: PayloadAction<string>) => {
			state.price.to = action.payload;
		},
		toggleStatus: (state, action: PayloadAction<ProductStatusE>) => {
			state.status[action.payload] = !state.status[action.payload];
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
	},
	selectors: {
		selectAllFilters: state => state,
	},
});

export const {
	initializeCategories,
	initializeColors,
	resetFilter,
	toggleCategory,
	toggleSize,
	toggleColor,
	setPriceFrom,
	setPriceTo,
	toggleStatus,
	setName,
} = productsFilterSlice.actions;

export const { selectAllFilters } = productsFilterSlice.selectors;
