import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	API_BASE_URL,
	API_PRODUCTS_CATEGORIES_URL,
	API_PRODUCTS_COLORS_URL,
	API_PRODUCTS_URL,
} from "../../../shared/api/api.ts";
import type {
	ProductsApiResponseT,
	ProductsCategoriesApiResponseT,
	ProductsColorsApiResponseT,
} from "../model/model.ts";

const productsApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	reducerPath: "productsApi",
	tagTypes: ["products"],
	endpoints: build => ({
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- Redux Toolkit wait for void arg
		getProducts: build.query<ProductsApiResponseT, void>({
			query: () => API_PRODUCTS_URL,
			providesTags: ["products"],
			transformResponse: (response: ProductsApiResponseT) => response,
		}),
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- Redux Toolkit wait for void arg
		getCategories: build.query<string[], void>({
			query: () => API_PRODUCTS_CATEGORIES_URL,
			transformResponse: (response: ProductsCategoriesApiResponseT) => response,
		}),
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
		getColors: build.query<string[], void>({
			query: () => API_PRODUCTS_COLORS_URL,
			transformResponse: (response: ProductsColorsApiResponseT) => response,
		}),
	}),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetColorsQuery } =
	productsApiSlice;
export default productsApiSlice;
