import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_PRODUCTS_URL } from "../../../shared/api/api.js.ts";
import type { ProductsApiResponseT } from "../model/model.ts";

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
	}),
});

export const { useGetProductsQuery } = productsApiSlice;
export default productsApiSlice;
