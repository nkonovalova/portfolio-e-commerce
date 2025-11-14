/**
 * Validates an email address using a simple regex pattern.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
	// A common regex for email validation.
	// Note: Comprehensive email validation is complex and often best handled server-side.
	// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};
