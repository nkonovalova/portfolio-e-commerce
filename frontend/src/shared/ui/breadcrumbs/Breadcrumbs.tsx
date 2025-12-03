import type { JSX } from "react";
import { NavLink, useMatches } from "react-router";
import styles from "./Breadcrumbs.module.scss";
import { IconChevronRight } from "../icons/Icon.tsx";

type RouteHandleT = {
	breadcrumb?: (
		params: Record<string, string | undefined>,
	) => string | undefined;
};

export function Breadcrumbs(): JSX.Element | null {
	const matches = useMatches() as {
		handle?: RouteHandleT;
		pathname: string;
		params: Record<string, string | undefined>;
	}[];

	let crumbs = matches
		.filter(match => match.handle?.breadcrumb)
		.map(match => {
			const label = match.handle?.breadcrumb?.(match.params);
			return {
				label,
				pathname: match.pathname,
			};
		})
		.filter(crumb => !!crumb.label);

	crumbs = [{ label: "Home", pathname: "/" }].concat(crumbs);
	return (
		<nav aria-label="breadcrumb" className={styles.breadcrumbs}>
			<ol className={styles.list}>
				{crumbs.map((crumb, index) => {
					const isLast = index === crumbs.length - 1;
					return (
						<li key={crumb.pathname} className={styles.listItem}>
							{index > 0 && <IconChevronRight className={styles.separator} />}
							{isLast ? (
								<span className={styles.currentPage} aria-current="page">
									{crumb.label}
								</span>
							) : (
								<NavLink to={crumb.pathname} className={styles.link}>
									{crumb.label}
								</NavLink>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
