import PageLayout from "../pageLayout/PageLayout.tsx";
import PagesHeader from "../../shared/ui/pagesHeader/PagesHeader.tsx";
import HeaderImg from "./img/pageHeaderBg.jpg";
import { useGetProductsQuery } from "../../entities/product/store/productsApiSlice.ts";
import {
	nextPage,
	previousPage,
	selectActivePage,
	selectTotalPages,
	setActive,
	setTotal,
} from "./store/productsPaginationSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useMemo } from "react";
import { ProductCard } from "../../widgets/productCard/ProductCard.tsx";
import type { ProductT } from "../../entities/product/model/model.ts";
import styles from "./ProductsPage.module.scss";
import { Pagination } from "../../widgets/pagination/Pagination.tsx";

const ITEMS_PER_PAGE = 16;

function ProductsPage() {
	const dispatch = useAppDispatch();
	const {
		data: productsData,
		error: productsError,
		isLoading: productsIsLoading,
	} = useGetProductsQuery();

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

	return (
		<PageLayout
			topInfoBlock={<PagesHeader header="Shop" imgSrc={HeaderImg} />}
			isLoading={productsIsLoading}
			errorMessage={productsError ? "Loading data error" : ""}
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
