import { createAppSlice } from "../../../app/createAppSlice.ts";
import {
	SortOrderE,
	SortTypeE,
} from "../../../shared/utils/sort/model/sort.ts";

const initialState = {
	type: SortTypeE.DEFAULT,
	order: SortOrderE.ASC,
};

export const productsSortSlice = createAppSlice({
	name: "productsSort",
	initialState,
	reducers: {
		setSort: (
			state,
			action: { payload: { order: SortOrderE; type: SortTypeE } },
		) => {
			state.type = action.payload.type;
			state.order = action.payload.order;
		},
	},
	selectors: {
		getSort: state => state,
	},
});

export const { setSort } = productsSortSlice.actions;
export const { getSort } = productsSortSlice.selectors;
