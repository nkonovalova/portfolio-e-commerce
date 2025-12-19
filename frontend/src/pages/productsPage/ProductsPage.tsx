import PageLayout from "../pageLayout/PageLayout.tsx";
import PagesHeader from "../../shared/ui/pagesHeader/PagesHeader.tsx";
import HeaderImg from "./img/pageHeaderBg.jpg";
import {
	useGetCategoriesQuery,
	useGetColorsQuery,
	useGetProductsQuery,
} from "../../entities/product/store/productsApiSlice.ts";
import {
	nextPage,
	previousPage,
	selectActivePage,
	selectItemsPerPage,
	selectTotalPages,
	setActive,
	setItemsPerPage,
	setTotal,
} from "./store/productsPaginationSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "../../widgets/productCard/ProductCard.tsx";
import type { ProductT } from "../../entities/product/model/model.ts";
import styles from "./ProductsPage.module.scss";
import { Pagination } from "../../widgets/pagination/Pagination.tsx";
import ProductsFilter from "./ui/productsFilter/ProductsFilter.tsx";
import { ProductsFilterHeader } from "./ui/productsFilterHeader/ProductsFilterHeader.tsx";
import clsx from "clsx";
import { selectAllFilters } from "./store/productsFilterSlice.ts";
import { toFilterProducts } from "./lib/filter.ts";
import useDebounce from "../../shared/hooks/useDebounce.ts";
import { getSort, setSort } from "./store/productsSortSlice.ts";
import type { SortT } from "../../shared/model/sort.ts";
import { SortTypeE } from "../../shared/model/sort.ts";
import { sortObjectsByKey } from "../../shared/utils/sort/sort.ts";

function ProductsPage() {
	const productContainerRef = useRef<HTMLDivElement>(null);
	const filterContainerRef = useRef<HTMLDivElement>(null);
	const [filterShow, setFilterShow] = useState(false);
	const dispatch = useAppDispatch();
	const {
		data: productsData,
		error: productsError,
		isLoading: productsIsLoading,
	} = useGetProductsQuery();

	const {
		data: productsCategories,
		error: productsCategoriesError,
		isLoading: productsCategoriesIsLoading,
	} = useGetCategoriesQuery();

	const {
		data: productsColors,
		error: productsColorsError,
		isLoading: productsColorsIsLoading,
	} = useGetColorsQuery();

	const totalPages = useAppSelector(selectTotalPages);
	const activePage = useAppSelector(selectActivePage);
	const itemsPerPage = useAppSelector(selectItemsPerPage);
	const activeSort = useAppSelector(getSort);
	const productsFilter = useAppSelector(selectAllFilters);
	const debouncedProductFilter = useDebounce(productsFilter, 500);

	const filteredProducts = useMemo(() => {
		if (!productsData) return [];
		return toFilterProducts(productsData, debouncedProductFilter);
	}, [productsData, debouncedProductFilter]);

	const sortedProducts = useMemo(() => {
		if (activeSort.type === SortTypeE.DEFAULT) return filteredProducts;
		return sortObjectsByKey<ProductT>({
			array: filteredProducts,
			key: activeSort.type,
			order: activeSort.order,
		});
	}, [filteredProducts, activeSort]);

	const currentProducts = useMemo(() => {
		const startIndex = (activePage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return sortedProducts.slice(startIndex, endIndex);
	}, [itemsPerPage, sortedProducts, activePage]);

	useEffect(() => {
		dispatch(setTotal(Math.ceil(filteredProducts.length / itemsPerPage)));
		dispatch(setActive(1));
	}, [filteredProducts, itemsPerPage, dispatch]);

	useEffect(() => {
		if (!filterShow) return;
		const handleClickOutside = (
			event: MouseEvent | TouchEvent | KeyboardEvent,
		) => {
			if (event.type === "keydown" && "key" in event && event.key !== "Escape")
				return;
			if (!filterContainerRef.current?.contains(event.target as Node)) {
				setFilterShow(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		document.addEventListener("keydown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [filterShow]);

	const scrollTop = () => {
		productContainerRef.current?.scrollIntoView();
	};

	//TODO: remove action dummy function for cart, sharing, compare and like features
	const handleAction = (action: string, productId: string) => {
		console.log(`${action} clicked for product: ${productId}`);
	};

	const toggleFilter = () => {
		setFilterShow(!filterShow);
	};

	const changeItemsPerPage = (value: number) => {
		dispatch(setItemsPerPage(value));
	};

	const onChangeSort = (sort: SortT) => {
		dispatch(setSort(sort));
	};

	const isError =
		productsError ?? productsCategoriesError ?? productsColorsError;

	return (
		<PageLayout
			topInfoBlock={
				<>
					<div className={styles.pageHeader}>
						<PagesHeader header="Shop" imgSrc={HeaderImg} />
					</div>
					{!productsCategoriesIsLoading && !productsColorsIsLoading && (
						<div className={styles.filter} ref={filterContainerRef}>
							<div className={styles.filterHeader}>
								<ProductsFilterHeader
									itemsTotal={filteredProducts.length}
									itemsPerPage={itemsPerPage}
									currentPage={activePage}
									currentSort={activeSort}
									onToggleFilter={toggleFilter}
									onChangeElementsPerPage={changeItemsPerPage}
									onChangeSort={onChangeSort}
								/>
							</div>

							<div
								className={clsx(
									styles.filterWrapper,
									!filterShow && styles.hidden,
								)}
							>
								<ProductsFilter
									colors={productsColors}
									categories={productsCategories}
								/>
							</div>
						</div>
					)}
				</>
			}
			isLoading={productsIsLoading}
			errorMessage={isError ? "Loading data error" : ""}
		>
			<div className={styles.products} ref={productContainerRef}>
				{currentProducts.length > 0 &&
					currentProducts.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={(id: ProductT["id"]) => {
								handleAction("Add to Cart", id);
							}}
							onShare={(id: ProductT["id"]) => {
								handleAction("Share", id);
							}}
							onCompare={(id: ProductT["id"]) => {
								handleAction("Compare", id);
							}}
							onLike={(id: ProductT["id"]) => {
								handleAction("Like", id);
							}}
						/>
					))}
			</div>
			<Pagination
				total={totalPages}
				active={activePage}
				onClickPage={(page: number) => {
					dispatch(setActive(page));
					scrollTop();
				}}
				onClickNext={() => {
					dispatch(nextPage());
					scrollTop();
				}}
				onClickPrev={() => {
					dispatch(previousPage());
					scrollTop();
				}}
				className={styles.pagination}
			/>
		</PageLayout>
	);
}

export default ProductsPage;
