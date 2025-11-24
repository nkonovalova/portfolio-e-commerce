import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export enum ButtonStyle {
	default = "default",
	link = "link",
	unfilled = "unfilled",
	filled = "filled",
}

type ButtonPropsT = ComponentPropsWithoutRef<"button"> & {
	style?: ButtonStyle;
};

/**
 * A customizable button component.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {string} [props.className] - Additional CSS class names for custom styling.
 * @param {boolean} [props.disabled] - If true, the button will be disabled.
 * @param {string} [props.type] - The type of the button (e.g., "submit", "button").
 * @param {ButtonStyle} [props.style] - The style of the button (e.g. ButtonStyle.link)
 */
export function Button({
	children,
	disabled,
	type = "button",
	style = ButtonStyle.default,
	...props
}: ButtonPropsT) {
	return (
		<button
			type={type}
			className={clsx(styles.button, styles[style])}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
