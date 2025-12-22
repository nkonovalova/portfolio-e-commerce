import { isValidEmail } from "./isValidEmail.ts";

describe("isValidEmail", () => {
	// Test suite for valid email formats
	describe("valid emails", () => {
		it.each([
			"test@example.com",
			"firstname.lastname@example.co.uk",
			"email+alias@domain.com",
			"12345@example.com",
			"email@subdomain.example.com",
			"_______@domain.com",
			"email@domain-one.com",
			"email@domain.name",
		])("should return true for %s", email => {
			expect(isValidEmail(email)).toBe(true);
		});
	});

	// Test suite for invalid email formats
	describe("invalid emails", () => {
		it.each([
			// General invalid formats
			"plainaddress",
			"#@%^%#$@#$@#.com",
			"email.domain.com",
			"email@domain@domain.com",
			// Missing parts
			"@example.com", // Missing local part
			"test@", // Missing domain and TLD
			"test@domain", // Missing TLD
			"test@.com", // Missing domain name
			// Invalid characters
			"test with spaces@domain.com", // Contains spaces
			"test@domain with spaces.com", // Contains spaces
		])("should return false for %s", email => {
			expect(isValidEmail(email)).toBe(false);
		});
	});

	// Test for empty or whitespace strings
	it("should return false for empty or whitespace strings", () => {
		expect(isValidEmail("")).toBe(false);
		expect(isValidEmail(" ")).toBe(false);
	});
});
