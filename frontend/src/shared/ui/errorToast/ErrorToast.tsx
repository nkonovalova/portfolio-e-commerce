import type { JSX } from "react";
import clsx from "clsx";
import styles from "./ErrorToast.module.scss";
import { IconCross } from "../icons/Icon.tsx";

type ErrorToastProps = {
	/**
	 * The error message to display inside the toast.
	 */
	message: string;
	/**
	 * Optional additional class names for custom styling.
	 */
	className?: string;
	onClose?: () => void;
};

/**
 * A toast/modal component for displaying application-level errors.
 * It appears as a small window and includes a message and a close button.
 *
 * @param {ErrorToastProps} props The component props.
 * @returns {JSX.Element} The rendered ErrorToast component.
 */
export function ErrorToast({
	message,
	className,
	onClose,
}: ErrorToastProps): JSX.Element {
	return (
		<div
			className={clsx(styles.errorToast, className)}
			role="alert"
			aria-live="assertive"
		>
			<p className={styles.message}>{message}</p>
			<button
				type="button"
				className={styles.closeButton}
				aria-label="Close error message"
				onClick={onClose}
			>
				<IconCross />
			</button>
		</div>
	);
}
