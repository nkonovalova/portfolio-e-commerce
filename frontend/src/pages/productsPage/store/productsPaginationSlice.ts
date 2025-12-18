import { createAppSlice } from "../../../app/createAppSlice.ts";

export type ProductsPaginationStateT = {
	total: number;
	active: number;
	itemsPerPage: number;
};

const FIRST_PAGE = 1;
const initialState: ProductsPaginationStateT = {
	total: 1,
	active: FIRST_PAGE,
	itemsPerPage: 16,
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
		setItemsPerPage: (state, action: { payload: number }) => {
			state.itemsPerPage = action.payload;
		},
	},
	selectors: {
		selectActivePage: state => state.active,
		selectTotalPages: state => state.total,
		selectItemsPerPage: state => state.itemsPerPage,
	},
});

export const { setTotal, setActive, nextPage, previousPage, setItemsPerPage } =
	productsPaginationSlice.actions;

export const { selectActivePage, selectTotalPages, selectItemsPerPage } =
	productsPaginationSlice.selectors;
