import type { JSX } from "react";
import clsx from "clsx";
import styles from "./ProductCard.module.scss";
import type { ProductT } from "../../entities/product/model/model.ts";
import { Button, ButtonStyle } from "../../shared/ui/button/Button.tsx";
import {
	IconCompare,
	IconHeart,
	IconShare,
} from "../../shared/ui/icons/Icon.tsx";
import { LazyImage } from "../../shared/ui/lazyImage/LazyImage.tsx";

type ProductCardProps = {
	product: ProductT;
	onAddToCart: (productId: string) => void;
	onShare: (productId: string) => void;
	onCompare: (productId: string) => void;
	onLike: (productId: string) => void;
	className?: string;
};

const getStatusLabel = (status: ProductT["status"]) => {
	if (status.new) return "New";
	if (status.hot) return "Hot";
	if (status.discount && status.discount > 0)
		return `-${status.discount.toString()}%`;
	return null;
};

/**
 * A card component to display product information and actions.
 * It shows product name, description, price, and a status badge.
 * An overlay with action buttons appears on hover.
 *
 * @param {ProductCardProps} props The component props.
 * @returns {JSX.Element} The rendered ProductCard component.
 */
export function ProductCard({
	product,
	onAddToCart,
	onShare,
	onCompare,
	onLike,
	className,
}: ProductCardProps): JSX.Element {
	const discountLabel = getStatusLabel(product.status);
	let hasDiscount = false;
	let discountedPrice = product.price;
	if (product.status.discount && product.status.discount > 0) {
		hasDiscount = true;
		discountedPrice = discountedPrice * (1 - product.status.discount / 100);
	}
	return (
		<article className={clsx(styles.card, className)} aria-label={product.name}>
			<div className={styles.imageWrapper}>
				<LazyImage
					src={product.image}
					alt={product.name}
					className={styles.image}
				/>
				{discountLabel && (
					<span
						className={clsx(styles.badge, {
							[styles.new]: product.status.new,
							[styles.hot]: product.status.hot,
							[styles.discount]: hasDiscount,
						})}
					>
						{discountLabel}
					</span>
				)}
			</div>

			<div className={styles.info}>
				<h3 className={styles.name}>{product.name}</h3>
				<p className={styles.caption}>{product.description.caption}</p>
				<div className={styles.priceWrapper}>
					<span className={styles.price}>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: product.currency,
						}).format(discountedPrice)}
					</span>
					{hasDiscount && (
						<span className={styles.oldPrice}>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: product.currency,
							}).format(product.price)}
						</span>
					)}
				</div>
			</div>

			<div className={styles.overlay}>
				<Button
					style={ButtonStyle.filled}
					onClick={() => {
						onAddToCart(product.id);
					}}
				>
					Add to cart
				</Button>
				<div className={styles.actions}>
					<button
						type="button"
						className={styles.actionButton}
						onClick={() => {
							onShare(product.id);
						}}
					>
						<IconShare /> Share
					</button>
					<button
						type="button"
						className={styles.actionButton}
						onClick={() => {
							onCompare(product.id);
						}}
					>
						<IconCompare /> Compare
					</button>
					<button
						type="button"
						className={styles.actionButton}
						onClick={() => {
							onLike(product.id);
						}}
					>
						<IconHeart /> Like
					</button>
				</div>
			</div>
		</article>
	);
}
