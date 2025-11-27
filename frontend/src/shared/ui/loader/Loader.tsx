import styles from "./Loader.module.scss";
import type { JSX } from "react";

/**
 * A simple spinning loader animation component.
 * This component only renders the visual spinner, not the overlay.
 *
 * @returns {JSX.Element} The rendered Loader spinner.
 */
export function Loader(): JSX.Element {
	return (
		<>
			<div className={styles.spinner} />
			<span className={styles.srOnly}>Loading...</span>
		</>
	);
}
