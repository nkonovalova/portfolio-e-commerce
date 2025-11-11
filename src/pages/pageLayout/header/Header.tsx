import styles from "./Header.module.scss";
import commonStyles from "../../../shared/ui/common.module.scss";
import { IconHamburger, IconLogo } from "../../../shared/ui/icons/Icon.tsx";
import { NavLink } from "react-router";
import clsx from "clsx";
import Menu from "../../../widgets/menu/Menu.tsx";
import { useEffect, useRef, useState } from "react";

function Header() {
	const [isMenuShow, setIsMenuShow] = useState(true);
	const headerRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsMenuShow(!isMenuShow);
	};

	useEffect(() => {
		if (!isMenuShow) {
			return;
		}

		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setIsMenuShow(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [isMenuShow]);

	return (
		<div className={styles.header} ref={headerRef}>
			<div className={styles.logoBlock}>
				<NavLink to="/" className={clsx(commonStyles.link, styles.homeLink)}>
					<div className={styles.icon}>
						<IconLogo />
					</div>
					<div className={styles.home}>Furniro</div>
				</NavLink>
				<button className={styles.menuButton} onClick={toggleMenu}>
					<IconHamburger />
				</button>
			</div>
			<div className={clsx(styles.nav, !isMenuShow && styles.hidden)}>
				<Menu />
			</div>
		</div>
	);
}

export default Header;
