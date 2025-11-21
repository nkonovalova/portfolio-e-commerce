/**
 * Represents the available sizes for a product.
 */
export type ProductSizeT = "XS" | "S" | "M" | "L" | "XL";

/**
 * Represents the nested description object for a product.
 */
export type ProductDescriptionT = {
	caption: string;
	small: string;
	full: string;
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
	discount: number;
	category: string;
	size: ProductSizeT[];
	color: string[];
	rating: number;
};
