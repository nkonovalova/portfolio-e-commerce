import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header.tsx";
import styles from "./Header.module.scss";

// Helper to set the window width for testing responsive hooks/components
const setScreenWidth = (width: number) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

describe("Header Component", () => {
	// Wrapper component to provide routing context for NavLink
	const renderHeader = () => {
		return render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);
	};

	describe("on mobile screens (< 1024px)", () => {
		beforeEach(() => {
			setScreenWidth(768); // Set a mobile-like screen width
		});

		test("1. Menu is not visible initially", () => {
			renderHeader();
			const navContainer = screen.getByRole("navigation", {
				hidden: true,
			});

			// The menu is hidden via a class that applies a transform
			expect(navContainer).toHaveClass(styles.hidden);
		});

		test("2. Menu becomes visible after clicking the menu button", () => {
			renderHeader();
			const menuButton = screen.getByRole("button", { name: /open menu/i }); // Assuming an aria-label for the button
			const navContainer = screen.getByRole("navigation", { hidden: true });

			// Initially hidden
			expect(navContainer).toHaveClass(styles.hidden);

			// Click the button to show the menu
			fireEvent.click(menuButton);

			// The 'hidden' class is removed, starting the CSS transition
			expect(navContainer).not.toHaveClass(styles.hidden);
		});

		test("3. Menu becomes invisible when clicking the button again or outside", async () => {
			renderHeader();
			const menuButton = screen.getByRole("button", { name: /open menu/i });
			const navContainer = screen.getByRole("navigation", { hidden: true });

			// --- Open the menu first ---
			fireEvent.click(menuButton);
			expect(navContainer).not.toHaveClass(styles.hidden);

			// --- Scenario A: Click the button again ---
			fireEvent.click(menuButton);
			// The menu should become hidden again
			await waitFor(() => {
				expect(navContainer).toHaveClass(styles.hidden);
			});

			// --- Re-open for the next scenario ---
			fireEvent.click(menuButton);
			expect(navContainer).not.toHaveClass(styles.hidden);

			// --- Scenario B: Click outside the header ---
			// We simulate a click on the document body
			fireEvent.mouseDown(document.body);
			await waitFor(() => {
				expect(navContainer).toHaveClass(styles.hidden);
			});
		});
	});

	// TODO: fix test for desktop
	describe.skip("on desktop screens (>= 1024px)", () => {
		beforeEach(() => {
			setScreenWidth(1280); // Set a desktop screen width
			window.matchMedia = vi.fn().mockImplementation(query => ({
				matches: query === "(min-width: 1024px)",
				media: query,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				addListener: vi.fn(),
				removeListener: vi.fn(),
			}));
		});

		test("Menu is always visible and the menu button is not visible", () => {
			renderHeader();

			// The menu button for mobile should not be in the document
			const menuButton = screen.queryByRole("button", { name: /open menu/i });
			expect(menuButton).not.toBeVisible();

			// The navigation container should be present and visible
			const navContainer = screen.getByRole("navigation");
			expect(navContainer).toBeVisible();

			// On desktop, the 'hidden' class has no effect due to CSS media queries,
			// so the menu is effectively always visible regardless of state.
			// We can verify it doesn't have the transform style.
			expect(navContainer).not.toHaveStyle("transform: translateY(-150%)");
		});
	});
});
