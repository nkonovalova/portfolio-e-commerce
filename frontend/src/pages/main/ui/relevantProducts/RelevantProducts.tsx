import styles from "./RelevantProducts.module.scss";
import type { ProductT } from "../../../../entities/product/model/model.ts";
import { ProductCard } from "../../../../widgets/productCard/ProductCard.tsx";
import {
	ButtonLink,
	ButtonLinkStyle,
} from "../../../../shared/ui/buttonLink/ButtonLink.tsx";
import { PRODUCTS_ROUTE } from "../../../../shared/routes.ts";

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
			<div className={styles.products}>
				{products.length > 0 &&
					products.map(product => (
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
			<div className={styles.showMore}>
				<ButtonLink style={ButtonLinkStyle.unfilled} to={PRODUCTS_ROUTE}>
					Show More
				</ButtonLink>
			</div>
		</section>
	);
}

export default RelevantProducts;
