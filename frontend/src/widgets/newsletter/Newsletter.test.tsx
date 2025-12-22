import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, vi } from "vitest";
import { Newsletter } from "./Newsletter.tsx";

describe("Newsletter Component", () => {
	beforeEach(() => {
		// Use fake timers to control setTimeout during tests
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Restore real timers after each test
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	test("1. User writes an incorrect email and component shows an error message", async () => {
		render(<Newsletter />);

		const emailInput = screen.getByTestId("subscribe-email");
		const subscribeButton = screen.getByRole("button", { name: /subscribe/i });

		// Initially, the button is disabled because the input is empty
		expect(subscribeButton).toBeDisabled();

		// Simulate user typing an invalid email
		fireEvent.change(emailInput, { target: { value: "invalid-email" } });

		// Fast-forward timers to trigger the debounced onChanged
		await act(() => vi.advanceTimersByTimeAsync(500));

		// Check for the validation error message
		expect(
			screen.getByText("Please enter a valid email address."),
		).toBeInTheDocument();

		// The button should still be disabled due to the error
		expect(subscribeButton).toBeDisabled();
	});
});
