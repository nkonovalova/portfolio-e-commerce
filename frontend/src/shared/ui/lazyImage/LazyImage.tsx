import type { ComponentPropsWithoutRef, JSX } from "react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./LazyImage.module.scss";

type LazyImageProps = ComponentPropsWithoutRef<"img">;

/**
 * An image component that lazy-loads the image source.
 * It uses the IntersectionObserver API to detect when the image enters the viewport
 * before triggering the download. It accepts all props of a standard `<img>` tag.
 *
 * @param className
 * @param src
 * @param alt
 * @param {LazyImageProps} props The component props, identical to `<img>` attributes.
 * @returns {JSX.Element} The rendered LazyImage component.
 */
export function LazyImage({
	className,
	src,
	alt,
	...props
}: LazyImageProps): JSX.Element {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = placeholderRef.current; // сохраняем текущее значение ref

		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "100px" },
		);

		observer.observe(node);

		return () => {
			observer.unobserve(node); // используем сохранённый node
		};
	}, []);

	return (
		<div
			ref={placeholderRef}
			className={clsx(styles.placeholder, className)}
			data-testid="lazy-image-placeholder"
		>
			{isInView && (
				<img
					src={src}
					alt={alt}
					className={clsx(styles.image, { [styles.loaded]: isLoaded })}
					onLoad={() => {
						setIsLoaded(true);
					}}
					{...props}
				/>
			)}
		</div>
	);
}
