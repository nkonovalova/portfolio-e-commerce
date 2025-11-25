import styles from "./Icon.module.scss";
import Logo from "./img/logo.svg";
import Search from "./img/search.svg";
import Heart from "./img/heart.svg";
import Cart from "./img/cart.svg";
import Hamburger from "./img/threeLines.svg";

export function IconLogo() {
	return <img className={styles.icon} src={Logo} alt={"Furniro"} />;
}

export function IconSearch() {
	return <img className={styles.icon} src={Search} alt={"Search"} />;
}

export function IconHeart() {
	return <img className={styles.icon} src={Heart} alt={"Heart"} />;
}

export function IconCart() {
	return <img className={styles.icon} src={Cart} alt={"Cart"} />;
}

export function IconHamburger() {
	return <img className={styles.icon} src={Hamburger} alt={"Hamburger"} />;
}

export const IconCross = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);
