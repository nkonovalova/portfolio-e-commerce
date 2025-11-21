import type { LinkProps } from "react-router";
import { Link } from "react-router";
import styles from "./SectionCard.module.scss";
import type { JSX } from "react";

type SectionCardPropsT = LinkProps & {
	imgSrc: string;
	header: string;
};

/**
 * A clickable card component that displays an image and a header, linking to a specific section.
 *
 * @param {object} props - The component props.
 * @param {string} props.to - The URL path to navigate to when the card is clicked.
 * @param {string} props.imgSrc - The source URL for the card's image.
 * @param {string} props.header - The header text to display on the card.
 * @returns {JSX.Element} The rendered SectionCard component.
 */
function SectionCard({
	imgSrc,
	header,
	to,
	...props
}: SectionCardPropsT): JSX.Element {
	return (
		<Link to={to} className={styles.link} {...props}>
			<img src={imgSrc} alt={header} className={styles.img} />
			<h3 className={styles.header}>{header}</h3>
		</Link>
	);
}

export default SectionCard;
