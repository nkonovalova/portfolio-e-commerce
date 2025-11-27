import { render, screen } from "@testing-library/react";
import { ErrorToast } from "./ErrorToast.tsx";

describe("ErrorToast Component", () => {
	test("renders the error message correctly", () => {
		const errorMessage = "Something went terribly wrong!";
		render(<ErrorToast message={errorMessage} />);

		// Check that the message is in the document
		expect(screen.getByText(errorMessage)).toBeInTheDocument();

		// Check for accessibility attributes
		const toastElement = screen.getByRole("alert");
		expect(toastElement).toBeInTheDocument();
		expect(toastElement).toHaveAttribute("aria-live", "assertive");
	});
});
