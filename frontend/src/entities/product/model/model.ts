/**
 * Represents the available sizes for a product.
 */
export enum ProductSizeE {
	XS = "XS",
	S = "S",
	M = "M",
	L = "L",
}

export const PRODUCT_SIZES = [
	ProductSizeE.XS,
	ProductSizeE.S,
	ProductSizeE.M,
	ProductSizeE.L,
];

export type ProductSizeT = keyof ProductSizeE;

/**
 * Represents the nested description object for a product.
 */
export type ProductDescriptionT = {
	caption: string;
	small: string;
	full: string;
};
/**
 * Represents the status of a product: new, discount, last, hot.
 */

export enum ProductStatusE {
	NEW = "new",
	DISCOUNT = "discount",
	LAST = "last",
	HOT = "hot",
}

export type ProductStatusValuesT = keyof ProductStatusE;

export const PRODUCT_STATUSES = [
	ProductStatusE.NEW,
	ProductStatusE.DISCOUNT,
	ProductStatusE.LAST,
	ProductStatusE.HOT,
];

export type ProductStatusT = {
	new: boolean;
	discount: number;
	last: boolean;
	hot: boolean;
};

/**
 * Represents a product, based on the API schema.
 */
export type ProductT = {
	id: string;
	name: string;
	image: string;
	description: ProductDescriptionT;
	price: number;
	currency: string;
	status: ProductStatusT;
	category: string;
	size: ProductSizeE[];
	color: string[];
	rating: number;
	finalPrice?: number;
};

export type ProductsApiResponseT = ProductT[];

export type ProductsCategoriesApiResponseT = string[];
export type ProductsColorsApiResponseT = string[];
