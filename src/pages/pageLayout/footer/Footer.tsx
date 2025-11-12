import commonStyles from "../../../shared/ui/common.module.scss";

import styles from "./Footer.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router";
function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.topContent}>
				<div className={clsx(styles.section, styles.location)}>
					<h3 className={styles.header}>Funiro.</h3>
					<div className={clsx(styles.content, styles.address)}>
						400 University Drive Suite 200 Coral Gables, FL 33134 USA
					</div>
				</div>
				<div className={clsx(styles.section, styles.links)}>
					<h3 className={clsx(styles.header, styles.contentHeader)}>Links</h3>
					<ul className={clsx(styles.content, styles.list)}>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Shop
							</NavLink>
						</li>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								About
							</NavLink>
						</li>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>
				<div className={clsx(styles.section, styles.help)}>
					<h3 className={clsx(styles.header, styles.contentHeader)}>Help</h3>
					<ul className={clsx(styles.content, styles.list)}>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Payment options
							</NavLink>
						</li>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Returns
							</NavLink>
						</li>
						<li>
							<NavLink to={"/"} className={commonStyles.link}>
								Privacy policies
							</NavLink>
						</li>
					</ul>
				</div>
				<div className={clsx(styles.section, styles.newsletter)}>
					<h3 className={clsx(styles.header, styles.contentHeader)}>
						Newsletter
					</h3>
					<div className={styles.form}>input</div>
				</div>
			</div>
			<div className={clsx(styles.section, styles.bottomContent)}>
				2023 furino. All rights reverved
			</div>
		</div>
	);
}

export default Footer;
