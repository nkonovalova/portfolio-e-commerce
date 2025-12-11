import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";

import styles from "./ProductsFilter.module.scss";
import Input from "../../../../shared/ui/input/Input.tsx";
import { Checkbox } from "../../../../shared/ui/checkbox/Checkbox.tsx";
import {
	initializeCategories,
	initializeColors,
	selectAllFilters,
	setName,
	setPriceFrom,
	setPriceTo,
	toggleCategory,
	toggleColor,
	toggleSize,
	toggleStatus,
} from "../../store/productsFilterSlice.ts";

type ProductsFilterProps = {
	categories?: string[];
	colors?: string[];
};

function ProductsFilter({ categories = [], colors = [] }: ProductsFilterProps) {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectAllFilters);

	// Initialize filter state when props are received
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

	const renderCheckboxes = (
		items: Record<string, boolean>,
		action: (payload: string) => { payload: string; type: string },
	) => {
		if (Object.keys(items).length === 0) return <p>No options available.</p>;
		return Object.entries(items).map(([item, isChecked]) => (
			<Checkbox
				key={item}
				label={item}
				value={isChecked}
				onChange={() => dispatch(action(item))}
			/>
		));
	};

	const renderColorCheckboxes = () => {
		if (Object.keys(filters.colors).length === 0) return null;
		return Object.entries(filters.colors).map(([color, isChecked]) => (
			<Checkbox
				key={color}
				label={
					<span
						className={styles.colorLabel}
						style={{ backgroundColor: color }}
						title={color}
					/>
				}
				value={isChecked}
				onChange={() => dispatch(toggleColor(color))}
			/>
		));
	};

	return (
		<aside className={styles.filterContainer} aria-labelledby="filter-heading">
			<div className={styles.nameBlock}>
				<Input
					label="Product Name"
					placeholder="Search by name..."
					value={filters.name}
					onChange={value => dispatch(setName(value))}
					debounceDelay={300}
				/>
			</div>

			<div className={styles.filterGrid}>
				<fieldset className={styles.filterBlock}>
					<legend className={styles.legend}>Categories</legend>
					{renderCheckboxes(filters.categories, toggleCategory)}
				</fieldset>

				<fieldset className={styles.filterBlock}>
					<legend className={styles.legend}>Sizes</legend>
					{renderCheckboxes(filters.sizes, toggleSize)}
				</fieldset>

				<fieldset className={styles.filterBlock}>
					<legend className={styles.legend}>Colors</legend>
					<div className={styles.colorGrid}>{renderColorCheckboxes()}</div>
				</fieldset>

				<fieldset className={styles.filterBlock}>
					<legend className={styles.legend}>Price Range</legend>
					<div className={styles.priceInputs}>
						<Input
							type="number"
							label="From"
							placeholder="0"
							value={filters.price.from}
							onChange={value => dispatch(setPriceFrom(value))}
							debounceDelay={500}
						/>
						<Input
							type="number"
							label="To"
							placeholder="9999"
							value={filters.price.to}
							onChange={value => dispatch(setPriceTo(value))}
							debounceDelay={500}
						/>
					</div>
				</fieldset>

				<fieldset className={styles.filterBlock}>
					<legend className={styles.legend}>Status</legend>
					{renderCheckboxes(filters.status, toggleStatus)}
				</fieldset>
			</div>
		</aside>
	);
}

export default ProductsFilter;
