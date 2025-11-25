import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	API_BASE_URL,
	API_RELEVANT_PRODUCTS_URL,
} from "../../../shared/api/api.js.ts";

const relevantProductsApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	reducerPath: "relevantProductsApi",
	tagTypes: ["relevantProducts"],
	endpoints: build => ({
		getRelevantProducts: build.query({
			query: () => API_RELEVANT_PRODUCTS_URL,
			providesTags: ["relevantProducts"],
		}),
	}),
});

export const { useGetRelevantProductsQuery } = relevantProductsApiSlice;
export default relevantProductsApiSlice;
