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
	selectTotalPages,
	setActive,
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

const ITEMS_PER_PAGE = 16;

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

	useEffect(() => {
		if (productsData) {
			dispatch(setTotal(Math.ceil(productsData.length / ITEMS_PER_PAGE)));
			dispatch(setActive(1));
		}
	}, [productsData, dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [activePage, totalPages]);

	const currentProducts = useMemo(() => {
		if (!productsData) return [];
		const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return productsData.slice(startIndex, endIndex);
	}, [productsData, activePage]);

	const handleAction = (action: string, productId: string) => {
		console.log(`${action} clicked for product: ${productId}`);
	};

	const toggleFilter = () => {
		setFilterShow(!filterShow);
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
									elementsTotalCount={productsData?.length ?? 0}
									elementsPerPage={ITEMS_PER_PAGE}
									currentPage={activePage}
									currentOrder={"default"}
									onToggleFilter={toggleFilter}
									onChangeElementsPerPage={() => {
										console.log("onChangeElementsPerPage");
									}}
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
