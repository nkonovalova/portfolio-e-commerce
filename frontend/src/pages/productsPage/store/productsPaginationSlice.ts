import { createAppSlice } from "../../../app/createAppSlice.ts";

export type ProductsPaginationStateT = {
	total: number;
	active: number;
};

const FIRST_PAGE = 1;
const initialState: ProductsPaginationStateT = {
	total: 1,
	active: FIRST_PAGE,
};

export const productsPaginationSlice = createAppSlice({
	name: "productsPagination",
	initialState,
	reducers: {
		setTotal: (state, action: { payload: number }) => {
			state.total = action.payload;
		},
		setActive: (state, action: { payload: number }) => {
			state.active = action.payload;
		},
		nextPage: state => {
			if (state.active < state.total) state.active += 1;
		},
		previousPage: state => {
			if (state.active > FIRST_PAGE) state.active -= 1;
		},
	},
	selectors: {
		selectActivePage: state => state.active,
		selectTotalPages: state => state.total,
	},
});

// export const selectProductsPagePagination = () =>

export const { setTotal, setActive, nextPage, previousPage } =
	productsPaginationSlice.actions;

export const { selectActivePage, selectTotalPages } =
	productsPaginationSlice.selectors;
