import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";

import styles from "./ProductsFilter.module.scss";
import Input from "../../../../shared/ui/input/Input.tsx";
import { Checkbox } from "../../../../shared/ui/checkbox/Checkbox.tsx";
import type { FilterState } from "../../store/productsFilterSlice.ts";
import {
	initializeCategories,
	initializeColors,
	resetFilter,
	selectAllFilters,
	setName,
	setPriceFrom,
	setPriceTo,
	toggleCategory,
	toggleColor,
	toggleSize,
	toggleStatus,
} from "../../store/productsFilterSlice.ts";
import clsx from "clsx";
import { Button, ButtonStyle } from "../../../../shared/ui/button/Button.tsx";
import type {
	ProductSizeE,
	ProductStatusE,
} from "../../../../entities/product/model/model.ts";
import useDebounce from "../../../../shared/hooks/useDebounce.ts";

type ProductsFilterProps = {
	categories?: string[];
	colors?: string[];
};

function renderCheckboxes<T extends string>({
	items,
	onChange,
}: {
	items: Record<T, boolean>;
	onChange: (item: T) => void;
}): ReactNode {
	return Object.keys(items).map(item => (
		<Checkbox
			key={item}
			label={item}
			value={items[item as T]}
			onChange={() => {
				onChange(item as T);
			}}
		/>
	));
}
function renderColorCheckboxes({
	filters,
	onChange,
}: {
	filters: FilterState;
	onChange: (color: string) => void;
}): ReactNode {
	if (Object.keys(filters.colors).length === 0) return null;
	return Object.entries(filters.colors).map(([color, isChecked]) => (
		<Checkbox
			key={color}
			color={color}
			value={isChecked}
			onChange={() => {
				onChange(color);
			}}
		/>
	));
}

function ProductsFilter({ categories = [], colors = [] }: ProductsFilterProps) {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectAllFilters);
	const [nameLocal, setNameLocal] = useState("");
	const [priceFromLocal, setPriceFromLocal] = useState("");
	const [priceToLocal, setPriceToLocal] = useState("");
	const debouncedName = useDebounce(nameLocal, 400);
	const debouncedPriceFrom = useDebounce(priceFromLocal, 400);
	const debouncedPriceTo = useDebounce(priceToLocal, 400);

	useEffect(() => {
		dispatch(setName(debouncedName));
	}, [debouncedName, dispatch]);

	useEffect(() => {
		dispatch(setPriceFrom(debouncedPriceFrom));
	}, [debouncedPriceFrom, dispatch]);

	useEffect(() => {
		dispatch(setPriceTo(debouncedPriceTo));
	}, [debouncedPriceTo, dispatch]);

	useEffect(() => {
		dispatch(setPriceFrom(debouncedPriceFrom));
	}, [debouncedPriceFrom, dispatch]);

	useEffect(() => {
		if (categories.length > 0) {
			dispatch(initializeCategories(categories));
		}
	}, [categories, dispatch]);

	useEffect(() => {
		if (colors.length > 0) {
			dispatch(initializeColors(colors));
		}
	}, [colors, dispatch]);

	return (
		<aside className={styles.filterContainer} aria-labelledby="filter-heading">
			<div className={styles.nameBlock}>
				<Input
					label="Product Name"
					placeholder="Search by name..."
					value={filters.name}
					onChange={value => {
						setNameLocal(value);
					}}
				/>
			</div>

			<div className={styles.filterGrid}>
				<fieldset className={clsx(styles.filterBlock, styles.categories)}>
					<legend className={styles.legend}>Categories</legend>
					{renderCheckboxes<string>({
						items: filters.categories,
						onChange: (category: string) => dispatch(toggleCategory(category)),
					})}
				</fieldset>

				<fieldset className={clsx(styles.filterBlock, styles.sizes)}>
					<legend className={styles.legend}>Sizes</legend>
					{renderCheckboxes<ProductSizeE>({
						items: filters.sizes,
						onChange: (size: ProductSizeE) => dispatch(toggleSize(size)),
					})}
				</fieldset>

				<fieldset className={clsx(styles.filterBlock, styles.colors)}>
					<legend className={styles.legend}>Colors</legend>
					<div className={styles.colorGrid}>
						{renderColorCheckboxes({
							filters,
							onChange: (color: string) => dispatch(toggleColor(color)),
						})}
					</div>
				</fieldset>

				<fieldset className={clsx(styles.filterBlock, styles.price)}>
					<legend className={styles.legend}>Price Range</legend>
					<div className={styles.priceInputs}>
						<Input
							type="number"
							label="From"
							placeholder="0"
							value={filters.price.from}
							onChange={value => {
								setPriceFromLocal(value);
							}}
						/>
						<Input
							type="number"
							label="To"
							placeholder="9999"
							value={filters.price.to}
							onChange={value => {
								setPriceToLocal(value);
							}}
						/>
					</div>
				</fieldset>

				<fieldset className={clsx(styles.filterBlock, styles.status)}>
					<legend className={styles.legend}>Status</legend>
					{renderCheckboxes<ProductStatusE>({
						items: filters.status,
						onChange: (status: ProductStatusE) =>
							dispatch(toggleStatus(status)),
					})}
				</fieldset>
			</div>
			<div className={styles.resetBlock}>
				<Button
					className={styles.resetButton}
					style={ButtonStyle.filled}
					onClick={() => dispatch(resetFilter())}
				>
					Reset filter
				</Button>
			</div>
		</aside>
	);
}

export default ProductsFilter;
