import styles from "./TopAdBlock.module.scss";
import bgImg from "./img/scandinavian-interior-mockup-wall-decal-background.jpg";
import { ButtonLink } from "../../shared/ui/buttonLink/ButtonLink.tsx";
import type { JSX } from "react";

/**
 * A component that displays the main hero/advertisement block, typically at the top of a page.
 * It features a background image, a title, descriptive text, and a call-to-action "Buy Now" button.
 * @returns {JSX.Element} The rendered TopAdBlock component.
 */
function TopAdBlock(): JSX.Element {
	return (
		<div className={styles.topAdBlock}>
			<img src={bgImg} alt="Top Ad Block" className={styles.bgImg} />
			<div className={styles.contentWrapper}>
				<div className={styles.content}>
					<h3 className={styles.sectionTitle}>New Arrival</h3>
					<h1 className={styles.title}>Discover our new collection</h1>
					<p className={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
						tellus, luctus nec ullamcorper mattis.
					</p>
					<ButtonLink to="/shop">Buy Now</ButtonLink>
				</div>
			</div>
		</div>
	);
}

export default TopAdBlock;
