import { SortOrderE } from "./model/sort.ts";

/**
 * Sorts an array of objects by a specified key in a specified order.
 * This function is generic and works with keys that have string or number values.
 * It returns a new, sorted array without modifying the original.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} array - The array of objects to sort.
 * @param {keyof T} key - The key of the object to sort by.
 * @param {'asc' | 'desc'} [order='asc'] - The sort order.
 * @returns {T[]} A new array with the sorted objects.
 */
export function sortObjectsByKey<T>({
	array,
	key,
	order = SortOrderE.ASC,
}: {
	array: T[];
	key: keyof T;
	order: SortOrderE;
}): T[] {
	return [...array].sort((a, b) => {
		const valA = a[key];
		const valB = b[key];

		const modifier = order === SortOrderE.ASC ? 1 : -1;

		if (typeof valA === "number" && typeof valB === "number") {
			return (valA - valB) * modifier;
		}

		if (typeof valA === "string" && typeof valB === "string") {
			return valA.localeCompare(valB) * modifier;
		}

		// Fallback for other comparable types
		if (valA < valB) return -1 * modifier;
		if (valA > valB) return 1 * modifier;
		return 0;
	});
}
