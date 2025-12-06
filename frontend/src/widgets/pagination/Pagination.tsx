import type { JSX } from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";
import { Button, ButtonStyle } from "../../shared/ui/button/Button.tsx";
import { IconChevronRight } from "../../shared/ui/icons/Icon.tsx";

type PaginationProps = {
	total: number;
	active: number;
	onClickPage: (page: number) => void;
	onClickNext: () => void;
	onClickPrev: () => void;
	className?: string;
};

const DOTS = "...";
const DOTS_NUMBER = 0;
const MAX_RANGE = 5;
/**
 * Generates a range of page numbers for pagination, including ellipses for gaps.
 * @param total - Total number of pages.
 * @param active - The current active page.
 * @returns An array of numbers and '...' strings.
 */
const generatePaginationRange = (total: number, active: number) => {
	if (total > 0 && total <= MAX_RANGE)
		return Array.from({ length: total }, (_, i) => i + 1);

	const first = 1;
	const prevActive = active === first ? null : active - 1;
	const nextActive = active === total ? null : active + 1;
	const firstDots =
		prevActive !== null && prevActive - first > 1 ? DOTS_NUMBER : null;
	const lastDots =
		nextActive !== null && total - nextActive > 1 ? DOTS_NUMBER : null;

	return [
		first === prevActive || first === active ? null : first,
		firstDots,
		prevActive,
		active,
		nextActive,
		lastDots,
		total === nextActive || total === active ? null : total,
	].filter(page => page !== null);
};

/**
 * A navigation component for paginated content.
 * It displays page numbers and previous/next buttons.
 *
 * @param {PaginationProps} props The component props.
 * @returns {JSX.Element | null} The rendered Pagination component, or null if there's only one page.
 */
export function Pagination({
	total,
	active,
	onClickPage,
	onClickNext,
	onClickPrev,
	className,
}: PaginationProps): JSX.Element | null {
	if (total <= 1) {
		return null;
	}

	const pageNumbers = generatePaginationRange(total, active);

	return (
		<nav aria-label="pagination" className={clsx(styles.pagination, className)}>
			<Button
				style={ButtonStyle.filledLight}
				onClick={onClickPrev}
				disabled={active === 1}
				className={clsx(styles.navButton, styles.prev)}
			>
				<IconChevronRight className={clsx(styles.arrow, styles.prev)} />
				<span className={styles.text}>Prev</span>
			</Button>

			<div className={styles.pageNumbers}>
				{pageNumbers.map(page => {
					if (page === DOTS_NUMBER) return <span>{DOTS}</span>;
					return (
						<Button
							className={styles.navButton}
							key={page}
							style={
								active === page ? ButtonStyle.filled : ButtonStyle.filledLight
							}
							onClick={() => {
								onClickPage(page);
							}}
							disabled={active === page}
							aria-current={active === page ? "page" : undefined}
						>
							{page}
						</Button>
					);
				})}
			</div>

			<Button
				style={ButtonStyle.filledLight}
				onClick={onClickNext}
				disabled={active === total}
				className={clsx(styles.navButton, styles.next)}
			>
				<IconChevronRight className={styles.arrow} />
				<span className={styles.text}>Next</span>
			</Button>
		</nav>
	);
}
