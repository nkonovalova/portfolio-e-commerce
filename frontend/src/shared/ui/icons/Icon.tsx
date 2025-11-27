import Logo from "./img/logo.svg?react";
import Search from "./img/search.svg?react";
import Heart from "./img/heart.svg?react";
import Cart from "./img/cart.svg?react";
import Hamburger from "./img/threeLines.svg?react";
import Share from "./img/share.svg?react";
import Compare from "./img/compare.svg?react";

export function IconLogo() {
	return <Logo />;
}

export function IconSearch() {
	return <Search />;
}

export function IconHeart() {
	return <Heart />;
}

export function IconCart() {
	return <Cart />;
}

export function IconHamburger() {
	return <Hamburger />;
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

export function IconShare() {
	return <Share />;
}

export function IconCompare() {
	return <Compare />;
}
