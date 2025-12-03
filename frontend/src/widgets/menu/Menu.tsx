import styles from "./Menu.module.scss";
import commonStyles from "../../shared/ui/common.module.scss";
import { NavLink } from "react-router";
import {
	IconCart,
	IconHeart,
	IconSearch,
} from "../../shared/ui/icons/Icon.tsx";
import clsx from "clsx";
import {
	ABOUT_ROUTE,
	CONTACT_ROUTE,
	HOME_ROUTE,
	PRODUCTS_ROUTE,
} from "../../shared/routes.ts";

function Menu() {
	return (
		<div className={styles.menu}>
			<ul className={clsx(styles.list, styles.sectionList)}>
				<li className={styles.sectionItem}>
					<NavLink to={HOME_ROUTE} className={commonStyles.link}>
						Home
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={PRODUCTS_ROUTE} className={commonStyles.link}>
						Shop
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={ABOUT_ROUTE} className={commonStyles.link}>
						About
					</NavLink>
				</li>
				<li className={styles.sectionItem}>
					<NavLink to={CONTACT_ROUTE} className={commonStyles.link}>
						Contact
					</NavLink>
				</li>
			</ul>
			<ul className={clsx(styles.list, styles.personalList)}>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink
						to={"/"}
						className={clsx(commonStyles.link, styles.iconLink)}
					>
						<IconSearch />
					</NavLink>
				</li>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink
						to={"/"}
						className={clsx(commonStyles.link, styles.iconLink)}
					>
						<IconHeart />
					</NavLink>
				</li>
				<li className={clsx(styles.item, styles.icon)}>
					<NavLink
						to={"/"}
						className={clsx(commonStyles.link, styles.iconLink)}
					>
						<IconCart />
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
