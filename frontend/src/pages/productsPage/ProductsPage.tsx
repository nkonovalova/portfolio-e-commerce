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
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../../widgets/productCard/ProductCard.tsx";
import type { ProductT } from "../../entities/product/model/model.ts";
import styles from "./ProductsPage.module.scss";
import { Pagination } from "../../widgets/pagination/Pagination.tsx";
import ProductsFilter from "./ui/productsFilter/ProductsFilter.tsx";
import { ProductsFilterHeader } from "./ui/productsFilterHeader/ProductsFilterHeader.tsx";
import clsx from "clsx";
import { selectAllFilters } from "./store/productsFilterSlice.ts";
import { toFilterProducts } from "./lib/filter.ts";

function ProductsPage() {
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
	const productsFilter = useAppSelector(selectAllFilters);

	const filteredProducts = useMemo(() => {
		if (!productsData) return [];
		return toFilterProducts(productsData, productsFilter);
	}, [productsData, productsFilter]);

	const currentProducts = useMemo(() => {
		const startIndex = (activePage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredProducts.slice(startIndex, endIndex);
	}, [itemsPerPage, filteredProducts, activePage]);

	useEffect(() => {
		// window.scrollTo(0, 0);
	}, [activePage, totalPages]);

	useEffect(() => {
		dispatch(setTotal(Math.ceil(filteredProducts.length / itemsPerPage)));
		dispatch(setActive(1));
	}, [filteredProducts, itemsPerPage, dispatch]);

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
						<div className={styles.filter}>
							<div className={styles.filterHeader}>
								<ProductsFilterHeader
									itemsTotal={filteredProducts.length}
									itemsPerPage={itemsPerPage}
									currentPage={activePage}
									currentOrder={"default"}
									onToggleFilter={toggleFilter}
									onChangeElementsPerPage={changeItemsPerPage}
									onChangeSort={() => {
										console.log("onChangeSort");
									}}
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
			<div className={styles.products}>
				{currentProducts.length > 0 &&
					currentProducts.map(product => (
						<ProductCard
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
				onClickPage={(page: number) => dispatch(setActive(page))}
				onClickNext={() => dispatch(nextPage())}
				onClickPrev={() => dispatch(previousPage())}
				className={styles.pagination}
			/>
		</PageLayout>
	);
}

export default ProductsPage;
