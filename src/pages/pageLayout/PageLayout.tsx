import styles from "./PageLayout.module.scss";
import type React from "react";
import Header from "./header/Header.tsx";

type PageLayoutPropsT = {
	children: React.ReactNode;
};

function PageLayout({ children }: PageLayoutPropsT) {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.main}>
				<section className={styles.information}>Top information block</section>
				<section className={styles.content}>{children}</section>
				<section className={styles.information}>
					Bottom information block
				</section>
			</main>
			<footer className={styles.footer}>Footer</footer>
			<div className={styles.cart}>hidden shopping cart</div>
			<div className={styles.errors}>hidden system errors</div>
		</div>
	);
}

export default PageLayout;
