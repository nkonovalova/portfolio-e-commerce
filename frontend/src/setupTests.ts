import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/**
 * A map to hold all active IntersectionObserver instances,
 * allowing tests to interact with them.
 */
const intersectionObserverInstances = new Map<
	Element,
	IntersectionObserverCallback
>();

/**
 * A more powerful and controllable mock for the IntersectionObserver API.
 * It allows tests to manually trigger intersection events.
 */
class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | null = null;
	readonly rootMargin: string = "";
	readonly thresholds: readonly number[] = [];
	private callback: IntersectionObserverCallback;

	constructor(
		callback: IntersectionObserverCallback,
		// options?: IntersectionObserverInit,
	) {
		this.callback = callback;
		// You can expand this to use options if needed for more complex tests
	}

	observe(target: Element): void {
		intersectionObserverInstances.set(target, this.callback);
	}

	unobserve(target: Element): void {
		intersectionObserverInstances.delete(target);
	}

	disconnect(): void {
		// In this simplified mock, we don't need to clear all,
		// as 'unobserve' will be called on cleanup.
	}

	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
}

/**
 * Helper function to be used in tests to simulate an element intersecting the viewport.
 * @param element The DOM element that should trigger an intersection.
 * @param isIntersecting Whether the element is intersecting or not.
 */
export function mockIntersection(element: Element, isIntersecting: boolean) {
	const callback = intersectionObserverInstances.get(element);
	if (callback) {
		const entry: Partial<IntersectionObserverEntry> = {
			target: element,
			isIntersecting,
		};
		callback([entry as IntersectionObserverEntry], {} as IntersectionObserver);
	}
}

// Stub the global IntersectionObserver
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
