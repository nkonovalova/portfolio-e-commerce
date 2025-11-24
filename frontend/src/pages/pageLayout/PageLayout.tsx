import styles from "./PageLayout.module.scss";
import type React from "react";
import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";

type PageLayoutPropsT = {
	topInfoBlock?: React.ReactNode;
	children: React.ReactNode;
};

function PageLayout({ topInfoBlock, children }: PageLayoutPropsT) {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.main}>
				{topInfoBlock && (
					<section className={styles.information}>{topInfoBlock}</section>
				)}
				<section className={styles.content}>{children}</section>
				<section className={styles.information}>
					Bottom information block
				</section>
			</main>
			<footer className={styles.footer}>
				<Footer />
			</footer>
			<div className={styles.cart}>hidden shopping cart</div>
			<div className={styles.errors}>hidden system errors</div>
		</div>
	);
}

export default PageLayout;
