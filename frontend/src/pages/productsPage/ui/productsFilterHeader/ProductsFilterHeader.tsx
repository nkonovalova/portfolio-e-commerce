import type { JSX } from "react";
import styles from "./ProductsFilterHeader.module.scss";
import { Button } from "../../../../shared/ui/button/Button.tsx";
import { IconFilter } from "../../../../shared/ui/icons/Icon.tsx";
import Input from "../../../../shared/ui/input/Input.tsx";
import { Dropdown } from "../../../../shared/ui/dropdown/Dropdown.tsx";

type ProductFilterHeaderProps = {
	itemsTotal: number;
	itemsPerPage: number;
	currentPage: number;
	currentOrder: string;
	onToggleFilter: () => void;
	onChangeElementsPerPage: (count: number) => void;
	onChangeSort: (order: string) => void;
};

const SORT_OPTIONS = [
	{ value: "default", label: "Default" },
	{ value: "price-asc", label: "Price ↑" },
	{ value: "price-desc", label: "Price ↓" },
	{ value: "name-asc", label: "A-Z" },
	{ value: "name-desc", label: "Z-A" },
];

export function ProductsFilterHeader({
	itemsTotal,
	itemsPerPage,
	currentPage,
	currentOrder,
	onToggleFilter,
	onChangeElementsPerPage,
	onChangeSort,
}: ProductFilterHeaderProps): JSX.Element {
	const firstItem = (currentPage - 1) * itemsPerPage + 1;
	const lastItem = Math.min(currentPage * itemsPerPage, itemsTotal);

	return (
		<header className={styles.header}>
			<div className={styles.leftControls}>
				<Button className={styles.filterButton} onClick={onToggleFilter}>
					<IconFilter />
					<span>Filter</span>
				</Button>
				<div className={styles.resultsInfo}>
					<span className={styles.divider} />
					<span>
						Showing {firstItem}–{lastItem} of {itemsTotal} results
					</span>
				</div>
			</div>

			<div className={styles.rightControls}>
				<div className={styles.pages}>
					<Input
						label="Show"
						type="number"
						min={1}
						className={styles.showInput}
						value={itemsPerPage.toString()}
						onChange={val => {
							onChangeElementsPerPage(Number(val) || 16);
						}}
						debounceDelay={500}
					/>
				</div>
				<div className={styles.order}>
					<Dropdown
						label="Sort by"
						options={SORT_OPTIONS}
						value={currentOrder}
						onChange={onChangeSort}
					/>
				</div>
			</div>
		</header>
	);
}
