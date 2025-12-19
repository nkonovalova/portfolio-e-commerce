import type { JSX } from "react";
import { useEffect, useState } from "react";
import styles from "./ProductsFilterHeader.module.scss";
import { Button } from "../../../../shared/ui/button/Button.tsx";
import { IconFilter } from "../../../../shared/ui/icons/Icon.tsx";
import Input from "../../../../shared/ui/input/Input.tsx";
import { Dropdown } from "../../../../shared/ui/dropdown/Dropdown.tsx";
import useDebounce from "../../../../shared/hooks/useDebounce.ts";
import type { SortT } from "../../../../shared/model/sort.ts";
import { SortOrderE, SortTypeE } from "../../../../shared/model/sort.ts";

type ProductFilterHeaderProps = {
	itemsTotal: number;
	itemsPerPage: number;
	currentPage: number;
	currentSort: SortT;
	onToggleFilter: () => void;
	onChangeElementsPerPage: (count: number) => void;
	onChangeSort: (sort: SortT) => void;
};

const SORT_OPTIONS = [
	{ value: SortTypeE.DEFAULT, label: "Default" },
	{ value: SortTypeE.FINAL_PRICE + SortOrderE.ASC, label: "Price ↑" },
	{ value: SortTypeE.FINAL_PRICE + SortOrderE.DESC, label: "Price ↓" },
	{ value: SortTypeE.NAME + SortOrderE.ASC, label: "A-Z" },
	{ value: SortTypeE.NAME + SortOrderE.DESC, label: "Z-A" },
];

const SORT_MAPPING = new Map<string, SortT>();
SORT_MAPPING.set(SortTypeE.DEFAULT, {
	type: SortTypeE.DEFAULT,
	order: SortOrderE.ASC,
});
SORT_MAPPING.set(SortTypeE.FINAL_PRICE + SortOrderE.ASC, {
	type: SortTypeE.FINAL_PRICE,
	order: SortOrderE.ASC,
});
SORT_MAPPING.set(SortTypeE.FINAL_PRICE + SortOrderE.DESC, {
	type: SortTypeE.FINAL_PRICE,
	order: SortOrderE.DESC,
});
SORT_MAPPING.set(SortTypeE.NAME + SortOrderE.ASC, {
	type: SortTypeE.NAME,
	order: SortOrderE.ASC,
});
SORT_MAPPING.set(SortTypeE.NAME + SortOrderE.DESC, {
	type: SortTypeE.NAME,
	order: SortOrderE.DESC,
});

export function ProductsFilterHeader({
	itemsTotal,
	itemsPerPage,
	currentPage,
	currentSort,
	onToggleFilter,
	onChangeElementsPerPage,
	onChangeSort,
}: ProductFilterHeaderProps): JSX.Element {
	const [itemsPerPageLocal, setItemsPerPageLocal] = useState(
		itemsPerPage.toString(),
	);
	const debouncedItemsPerPage = useDebounce(itemsPerPageLocal, 400);
	const firstItem = (currentPage - 1) * itemsPerPage + 1;
	const lastItem = Math.min(currentPage * itemsPerPage, itemsTotal);

	useEffect(() => {
		onChangeElementsPerPage(Number(debouncedItemsPerPage) || 16);
	}, [debouncedItemsPerPage, onChangeElementsPerPage]);

	const handleChangeSort = (value: string) => {
		if (SORT_MAPPING.has(value)) {
			onChangeSort(
				SORT_MAPPING.get(value) ?? {
					type: SortTypeE.DEFAULT,
					order: SortOrderE.ASC,
				},
			);
		}
	};

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
						value={itemsPerPageLocal}
						onChange={val => {
							setItemsPerPageLocal(val);
						}}
					/>
				</div>
				<div className={styles.order}>
					<Dropdown
						label="Sort by"
						options={SORT_OPTIONS}
						value={currentSort.type + currentSort.order}
						onChange={handleChangeSort}
					/>
				</div>
			</div>
		</header>
	);
}
