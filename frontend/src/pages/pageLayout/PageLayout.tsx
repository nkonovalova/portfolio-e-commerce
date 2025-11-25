import styles from "./PageLayout.module.scss";
import type React from "react";
import { useEffect, useState } from "react";
import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";
import { Loader } from "../../shared/ui/loader/Loader.tsx";
import { ErrorToast } from "../../shared/ui/errorToast/ErrorToast.tsx";

type PageLayoutPropsT = {
	isLoading?: boolean;
	errorMessage?: string;
	topInfoBlock?: React.ReactNode;
	children: React.ReactNode;
};

function PageLayout({
	errorMessage = "",
	isLoading = false,
	topInfoBlock,
	children,
}: PageLayoutPropsT) {
	const [activeError, setActiveError] = useState<string | undefined>(
		errorMessage,
	);

	// Sync the local state if a new error message prop comes in
	useEffect(() => {
		setActiveError(errorMessage);
	}, [errorMessage]);

	const handleCloseError = () => {
		setActiveError(undefined);
	};
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
				{isLoading && (
					<div
						className={styles.loaderWrapper}
						role="status"
						aria-live="polite"
						aria-label="Loading"
					>
						<Loader />
					</div>
				)}
			</main>
			<footer className={styles.footer}>
				<Footer />
			</footer>
			<div className={styles.cart}>hidden shopping cart</div>
			{activeError && (
				<ErrorToast message={activeError} onClose={handleCloseError} />
			)}
		</div>
	);
}

export default PageLayout;
