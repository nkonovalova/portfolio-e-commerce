import type { LinkProps } from "react-router";
import { Link } from "react-router";
import styles from "./SectionCard.module.scss";

type SectionCardPropsT = LinkProps & {
	imgSrc: string;
	header: string;
};

function SectionCard({ imgSrc, header, to, ...props }: SectionCardPropsT) {
	return (
		<Link to={to} className={styles.link} {...props}>
			<img src={imgSrc} alt={header} className={styles.img} />
			<p className={styles.header}>{header}</p>
		</Link>
	);
}

export default SectionCard;
