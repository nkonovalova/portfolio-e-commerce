import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorToast } from "./ErrorToast.tsx";

describe("ErrorToast Component", () => {
	test("renders the error message correctly", () => {
		const errorMessage = "Something went terribly wrong!";
		render(<ErrorToast message={errorMessage} onClose={() => {}} />);

		// Check that the message is in the document
		expect(screen.getByText(errorMessage)).toBeInTheDocument();

		// Check for accessibility attributes
		const toastElement = screen.getByRole("alert");
		expect(toastElement).toBeInTheDocument();
		expect(toastElement).toHaveAttribute("aria-live", "assertive");
	});

	test("calls the onClose callback when the close button is clicked", () => {
		const handleClose = vi.fn();
		const errorMessage = "Network request failed.";

		render(<ErrorToast message={errorMessage} onClose={handleClose} />);

		// Find the close button by its accessible name
		const closeButton = screen.getByRole("button", {
			name: /close error message/i,
		});
		expect(closeButton).toBeInTheDocument();

		// Simulate a user click
		fireEvent.click(closeButton);

		// Verify that the onClose function was called exactly once
		expect(handleClose).toHaveBeenCalledTimes(1);
	});
});
