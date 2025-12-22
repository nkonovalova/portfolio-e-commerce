import styles from "./ProductList.module.scss";
import { ProductCard } from "../productCard/ProductCard.tsx";
import type { ProductT } from "../../entities/product/model/model.ts";

type ProductListPropsT = {
	products: ProductT[];
	onAddToCart: (id: ProductT["id"]) => void;
	onShare: (id: ProductT["id"]) => void;
	onCompare: (id: ProductT["id"]) => void;
	onLike: (id: ProductT["id"]) => void;
};
function ProductList({
	products,
	onAddToCart,
	onShare,
	onCompare,
	onLike,
}: ProductListPropsT) {
	return (
		<ul className={styles.products}>
			{products.length > 0 &&
				products.map(product => (
					<li className={styles.productItem} key={product.id}>
						<ProductCard
							product={product}
							onAddToCart={(id: ProductT["id"]) => {
								onAddToCart(id);
							}}
							onShare={(id: ProductT["id"]) => {
								onShare(id);
							}}
							onCompare={(id: ProductT["id"]) => {
								onCompare(id);
							}}
							onLike={(id: ProductT["id"]) => {
								onLike(id);
							}}
						/>
					</li>
				))}
		</ul>
	);
}

export default ProductList;
