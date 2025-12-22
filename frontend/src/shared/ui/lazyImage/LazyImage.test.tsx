import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LazyImage } from "./LazyImage";
import { mockIntersection } from "../../../setupTests"; // Import the helper

describe("LazyImage", () => {
	// Clean up mocks after each test
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders placeholder initially and does not render the img tag", () => {
		render(<LazyImage src="image.jpg" alt="test" />);

		// The placeholder div should be present
		expect(screen.getByTestId("lazy-image-placeholder")).toBeInTheDocument();

		// The actual <img> element should not be in the DOM yet
		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});

	it("renders the img tag after intersection is triggered", () => {
		render(<LazyImage src="image.jpg" alt="test" />);

		const placeholder = screen.getByTestId("lazy-image-placeholder");

		// Simulate the element entering the viewport
		act(() => {
			mockIntersection(placeholder, true);
		});

		// Now the <img> element should be rendered
		const img = screen.getByRole("img");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "image.jpg");
	});

	it("applies the 'loaded' class after the image's onLoad event fires", () => {
		render(<LazyImage src="image.jpg" alt="test" />);

		const placeholder = screen.getByTestId("lazy-image-placeholder");
		act(() => {
			mockIntersection(placeholder, true);
		});

		const img = screen.getByRole("img");

		// The 'loaded' class should not be present before the event
		expect(img).not.toHaveClass(/loaded/);

		// Manually trigger the onLoad event
		fireEvent.load(img);

		// Now the class should be applied
		expect(img).toHaveClass(/loaded/);
	});

	it("passes additional props to the img element", () => {
		render(<LazyImage src="image.jpg" alt="test" data-custom="123" />);

		const placeholder = screen.getByTestId("lazy-image-placeholder");
		act(() => {
			mockIntersection(placeholder, true);
		});

		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("data-custom", "123");
	});

	it("cleans up the observer when the component unmounts", () => {
		const { unmount } = render(<LazyImage src="img.jpg" alt="t" />);
		const placeholder = screen.getByTestId("lazy-image-placeholder");

		// We need to spy on the prototype to check if unobserve is called
		const unobserveSpy = vi.spyOn(
			global.IntersectionObserver.prototype,
			"unobserve",
		);

		// Unmount the component to trigger the cleanup effect
		unmount();

		// Check that unobserve was called with the correct element
		expect(unobserveSpy).toHaveBeenCalledWith(placeholder);
	});
});
