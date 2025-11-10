import styles from "./Layout.module.scss";
import type React from "react";
import clsx from "clsx";

type LayoutPropsT = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutPropsT) {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>Menu</header>

			<main className={styles.main}>
				<section className={clsx(styles.information, styles.top)}>
					Top information block
				</section>
				<section className={styles.content}>{children}</section>
				<section className={clsx(styles.information, styles.bottom)}>
					Bottom information block
				</section>
			</main>

			<footer className={styles.footer}>Footer</footer>
			<div className={styles.cart}>hidden shopping cart</div>
			<div className={styles.errors}>hidden system errors</div>
		</div>
	);
}

export default Layout;
