export enum SortTypeE {
	NAME = "name",
	PRICE = "price",
	FINAL_PRICE = "finalPrice",
	DEFAULT = "default",
}

export enum SortOrderE {
	ASC = "asc",
	DESC = "desc",
}

export type SortT = {
	type: SortTypeE;
	order: SortOrderE;
};
