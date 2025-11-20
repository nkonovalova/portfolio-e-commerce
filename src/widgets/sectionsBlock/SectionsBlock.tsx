import styles from "./SectionsBlock.module.scss";
import ImgDining from "./img/image 106.jpg";
import ImgLiving from "./img/image 100.jpg";
import ImgBedroom from "./img/image 101.jpg";
import SectionCard from "./sectionCard/SectionCard.tsx";

function SectionsBlock() {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.sectionHeader}>Browse The Range</h2>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</p>
			<ul className={styles.sections}>
				<li className={styles.sectionItem}>
					<SectionCard to="/dinning" imgSrc={ImgDining} header="Dinning" />
				</li>
				<li className={styles.sectionItem}>
					<SectionCard to="/living" imgSrc={ImgLiving} header="Living" />
				</li>
				<li className={styles.sectionItem}>
					<SectionCard to="/bedroom" imgSrc={ImgBedroom} header="Bedroom" />
				</li>
			</ul>
		</div>
	);
}

export default SectionsBlock;
