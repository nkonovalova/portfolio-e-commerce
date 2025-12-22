import styles from "./RelevantProducts.module.scss";
import type { ProductT } from "../../../../entities/product/model/model.ts";
import {
	ButtonLink,
	ButtonLinkStyle,
} from "../../../../shared/ui/buttonLink/ButtonLink.tsx";
import { PRODUCTS_ROUTE } from "../../../../shared/routes.ts";
import ProductList from "../../../../widgets/productList/ProductList.tsx";

type RelevantProductsPropsT = {
	products?: ProductT[];
};

function RelevantProducts({ products = [] }: RelevantProductsPropsT) {
	const handleAction = (action: string, productId: string) => {
		console.log(`${action} clicked for product: ${productId}`);
	};

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.header}>Our Products</h2>
			<ProductList
				products={products}
				onLike={(id: ProductT["id"]) => {
					handleAction("onLike", id);
				}}
				onShare={(id: ProductT["id"]) => {
					handleAction("onShare", id);
				}}
				onAddToCart={(id: ProductT["id"]) => {
					handleAction("onAddToCart", id);
				}}
				onCompare={(id: ProductT["id"]) => {
					handleAction("onCompare", id);
				}}
			/>
			<div className={styles.showMore}>
				<ButtonLink style={ButtonLinkStyle.unfilled} to={PRODUCTS_ROUTE}>
					Show More
				</ButtonLink>
			</div>
		</section>
	);
}

export default RelevantProducts;
