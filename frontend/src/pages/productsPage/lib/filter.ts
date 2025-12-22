import type { ProductsApiResponseT } from "../../../entities/product/model/model.ts";
import {
	PRODUCT_SIZES,
	PRODUCT_STATUSES,
} from "../../../entities/product/model/model.ts";
import type { FilterState } from "../store/productsFilterSlice.ts";

export const toFilterProducts = (
	products: ProductsApiResponseT,
	filter: FilterState,
) => {
	const { categories, sizes, colors, price, status, name } = filter;

	const activeCategories = Object.keys(categories).filter(
		key => categories[key],
	);
	const activeColors = Object.keys(colors).filter(key => colors[key]);
	const activeSizes = PRODUCT_SIZES.filter(val => sizes[val]);
	const activeStatuses = PRODUCT_STATUSES.filter(val => status[val]);

	const priceFrom = parseFloat(price.from);
	const priceTo = parseFloat(price.to);
	const searchName = name.toLowerCase().trim();
	return products.filter(product => {
		if (searchName && !product.name.toLowerCase().includes(searchName)) {
			return false;
		}

		if (
			activeCategories.length > 0 &&
			!activeCategories.includes(product.category)
		)
			return false;

		if (
			activeSizes.length > 0 &&
			!product.size.some(size => activeSizes.includes(size))
		) {
			return false;
		}

		if (
			activeColors.length > 0 &&
			!product.color.some(color => activeColors.includes(color))
		) {
			return false;
		}

		if (
			!isNaN(priceFrom) &&
			(product.finalPrice ?? product.price) < (priceFrom satisfies number)
		) {
			return false;
		}

		if (
			!isNaN(priceTo) &&
			(product.finalPrice ?? product.price) > (priceTo satisfies number)
		) {
			return false;
		}

		return !(
			activeStatuses.length > 0 &&
			!activeStatuses.some(
				statusKey => product.status[statusKey as keyof typeof product.status],
			)
		);
	});
};
