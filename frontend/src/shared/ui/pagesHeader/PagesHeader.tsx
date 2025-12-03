import styles from "./PagesHeader.module.scss";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs.tsx";

type PagesHeaderPropsT = {
	header: string;
	imgSrc: string;
};

function PagesHeader({ header, imgSrc }: PagesHeaderPropsT) {
	return (
		<div className={styles.wrapper} data-image={imgSrc}>
			<img src={imgSrc} alt={header} className={styles.img} />
			<div className={styles.content}>
				<h1 className={styles.header}>{header}</h1>
				<Breadcrumbs />
			</div>
		</div>
	);
}

export default PagesHeader;
