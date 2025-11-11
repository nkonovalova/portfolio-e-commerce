import styles from "./Menu.module.scss";
import commonStyles from "../../shared/ui/common.module.scss";
import { NavLink } from "react-router";
import {
	IconCart,
	IconHeart,
	IconSearch,
} from "../../shared/ui/icons/Icon.tsx";
import clsx from "clsx";

function Menu() {
	return (
		<nav className={styles.menu}>
			<ul className={clsx(styles.list, styles.sectionList)}>
				<li className={styles.sectionItem}>
					<NavLink to={"/"} className={commonStyles.link}>
						Home
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={"/"} className={commonStyles.link}>
						Shop
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={"/"} className={commonStyles.link}>
						About
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={"/"} className={commonStyles.link}>
						Contact
					</NavLink>
				</li>
			</ul>
			<ul className={clsx(styles.list, styles.personalList)}>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink to={"/"} className={commonStyles.link}>
						<IconSearch />
					</NavLink>
				</li>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink to={"/"} className={commonStyles.link}>
						<IconHeart />
					</NavLink>
				</li>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink to={"/"} className={commonStyles.link}>
						<IconCart />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
