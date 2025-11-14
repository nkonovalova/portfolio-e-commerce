import type React from "react";
import { useCallback, useState } from "react";
import styles from "./Newsletter.module.scss";
import clsx from "clsx";
import Input from "../../shared/ui/input/Input.tsx";
import { isValidEmail } from "../../shared/utils/isValidEmail/isValidEmail.ts";
import { Button, ButtonStyle } from "../../shared/ui/button/Button.tsx";

/**
 * The Newsletter subscription widget.
 * Contains an email input with validation and a subscribe button.
 */
export function Newsletter() {
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string | undefined>(undefined);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submissionMessage, setSubmissionMessage] = useState<
		string | undefined
	>(undefined);

	/**
	 * Handles changes from the debounced Input component.
	 * Performs basic email validation.
	 * @param {string} value - The debounced input value.
	 */
	const handleEmailChange = useCallback((value: string) => {
		setEmail(value);
		if (value && !isValidEmail(value)) {
			setEmailError("Please enter a valid email address.");
		} else {
			setEmailError(undefined);
		}
	}, []);

	/**
	 * Handles the form submission.
	 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
	 */
	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setIsSubmitting(true);
			setSubmissionMessage(undefined);

			// Final validation before submission
			if (!email || !isValidEmail(email)) {
				setEmailError("Please enter a valid email address.");
				setIsSubmitting(false);
				return;
			}

			// Simulate API call
			try {
				// In a real application, you would send 'email' to your backend here.
				// Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
				await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
				setSubmissionMessage("Thank you for subscribing!");
				setEmail(""); // Clear input on success
				setEmailError(undefined);
			} catch (error) {
				console.error("Newsletter subscription failed:", error);
				setSubmissionMessage("Subscription failed. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
		},
		[email], // Dependency on email state
	);

	return (
		<form
			className={styles.newsletter}
			onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
				void handleSubmit(event);
			}}
		>
			<div className={styles.inputGroup}>
				<Input
					type="email"
					placeholder="Enter your email address"
					onChange={handleEmailChange}
					error={emailError}
					className={styles.emailInput} // Custom class for styling the input element
					required
					disabled={isSubmitting}
				/>
				<div className={styles.subscribeButton}>
					<Button
						type="submit"
						disabled={isSubmitting || !email || !!emailError}
						style={ButtonStyle.link}
					>
						{isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
					</Button>
				</div>
			</div>
			{submissionMessage && (
				<p
					className={clsx(styles.submissionMessage, {
						[styles.success]: submissionMessage.includes("Thank you"),
						[styles.error]: submissionMessage.includes("failed"),
					})}
				>
					{submissionMessage}
				</p>
			)}
		</form>
	);
}
