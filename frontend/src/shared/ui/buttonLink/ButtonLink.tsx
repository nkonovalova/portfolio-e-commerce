import type { LinkProps } from "react-router";
import { Link } from "react-router";
import clsx from "clsx";
import styles from "./ButtonLink.module.scss";

export enum ButtonLinkStyle {
	default = "default",
	link = "link",
	unfilled = "unfilled",
	filled = "filled",
}

type ButtonLinkT = LinkProps & {
	style?: ButtonLinkStyle;
};

/**
 * A component that renders a react-router Link styled as a "filled" button.
 * It accepts all the same props as the standard `Link` component.
 *
 * @param {object} props - Component props, inherits all props from react-router's Link.
 * @param {string} props.to - The path to link to.
 * @param {style} props.style - The style of the ButtonLink (e.g. ButtonLinkStyle.link)
 * @param {React.ReactNode} props.children - The content to display inside the button link.
 * @param {string} [props.className] - Additional CSS class names for custom styling.
 */
export function ButtonLink({
	style = ButtonLinkStyle.filled,
	children,
	className,
	...props
}: ButtonLinkT) {
	return (
		<Link
			className={clsx(styles.buttonLink, styles[style], className)}
			{...props}
		>
			{children}
		</Link>
	);
}
