import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	API_BASE_URL,
	API_RELEVANT_PRODUCTS_URL,
} from "../../../shared/api/api.ts";
import type { ProductT } from "../model/model.ts";

const relevantProductsApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	reducerPath: "relevantProductsApi",
	tagTypes: ["relevantProducts"],
	endpoints: build => ({
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- Redux Toolkit wait for void arg
		getRelevantProducts: build.query<ProductT[], void>({
			query: () => API_RELEVANT_PRODUCTS_URL,
			providesTags: ["relevantProducts"],
		}),
	}),
});

export const { useGetRelevantProductsQuery } = relevantProductsApiSlice;
export default relevantProductsApiSlice;
