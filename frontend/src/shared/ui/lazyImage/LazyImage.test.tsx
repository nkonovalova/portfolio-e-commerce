// import { render, screen, waitFor } from "@testing-library/react";
// import { vi } from "vitest";
// import { LazyImage } from "./LazyImage.tsx";
//
// // Mock IntersectionObserver
// const mockIntersectionObserver = vi.fn();
// vi.mock(
// 	"intersection-observer",
// 	() => ({
// 		IntersectionObserver: mockIntersectionObserver,
// 	}),
// 	{ virtual: true },
// );
//
// describe("LazyImage Component", () => {
// 	let observe: (element: Element) => void;
// 	let unobserve: (element: Element) => void;
// 	let disconnect: () => void;
// 	let intersectionCallback: (
// 		entries: Partial<IntersectionObserverEntry>[],
// 	) => void;
//
// 	beforeEach(() => {
// 		observe = vi.fn();
// 		unobserve = vi.fn();
// 		disconnect = vi.fn();
//
// 		mockIntersectionObserver.mockImplementation(callback => {
// 			intersectionCallback = callback;
// 			return {
// 				observe,
// 				unobserve,
// 				disconnect,
// 				root: null,
// 				rootMargin: "",
// 				thresholds: [],
// 			};
// 		});
// 	});
//
// 	afterEach(() => {
// 		vi.clearAllMocks();
// 	});
//
// 	test("initially renders a placeholder and not the image", () => {
// 		render(<LazyImage src="test.jpg" alt="A test image" />);
//
// 		// The placeholder should be in the document
// 		expect(screen.getByTestId("lazy-image-placeholder")).toBeInTheDocument();
//
// 		// The actual image element should not be rendered yet
// 		expect(screen.queryByRole("img")).not.toBeInTheDocument();
// 	});
//
// 	test("loads the image when it enters the viewport", async () => {
// 		render(<LazyImage src="test.jpg" alt="A test image" />);
//
// 		const placeholder = screen.getByTestId("lazy-image-placeholder");
//
// 		// Check that the observer was set up correctly
// 		expect(observe).toHaveBeenCalledWith(placeholder);
//
// 		// Simulate the element intersecting the viewport
// 		intersectionCallback([{ isIntersecting: true }]);
//
// 		// Wait for the image to appear in the DOM
// 		const image = await screen.findByRole("img");
// 		expect(image).toBeInTheDocument();
// 		expect(image).toHaveAttribute("src", "test.jpg");
// 		expect(image).toHaveAttribute("alt", "A test image");
//
// 		// Check that the observer is disconnected after intersection
// 		expect(disconnect).toHaveBeenCalled();
// 	});
//
// 	test("passes through additional props and className to the placeholder", () => {
// 		render(
// 			<LazyImage
// 				src="test.jpg"
// 				alt="A test image"
// 				className="custom-class"
// 				data-custom="value"
// 			/>,
// 		);
//
// 		const placeholder = screen.getByTestId("lazy-image-placeholder");
// 		expect(placeholder).toHaveClass("custom-class");
//
// 		// Simulate intersection to render the image
// 		intersectionCallback([{ isIntersecting: true }]);
//
// 		// Check that other props are passed to the img element
// 		const image = screen.getByRole("img");
// 		expect(image).toHaveAttribute("data-custom", "value");
// 	});
// });
