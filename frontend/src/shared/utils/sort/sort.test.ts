import { describe, it, expect } from "vitest";
import { sortObjectsByKey } from "./sort.ts";
import { SortOrderE } from "../../model/sort.ts";
import type { ProductT } from "../../../entities/product/model/model.ts";

const testProducts: ProductT[] = [
	{
		id: "be493296-9e32-4347-b291-122649b58b34",
		name: "Luxurious Bamboo Ball",
		price: 190124.99,
		// ...other properties are not needed for this test
	} as ProductT,
	{
		id: "6feea3d0-5f06-45cd-b101-dd259bb02225",
		name: "Electronic Marble Pizza",
		price: 178757.79,
	} as ProductT,
	{
		id: "6775ca9f-29ba-4628-8333-0768c9225555",
		name: "Generic Silk Pants",
		price: 128151.05,
	} as ProductT,
	{
		id: "dc4a081a-d522-43a3-a0df-56619e710ee2",
		name: "Sleek Steel Chips",
		price: 153838.2,
	} as ProductT,
	{
		id: "f48d3417-2a8b-446c-a4f1-0276a510208b",
		name: "Tasty Bronze Bacon",
		price: 22831.09,
	} as ProductT,
	{
		id: "6868245c-4bce-40a6-ad0b-d15e2eb468de",
		name: "Gorgeous Steel Chips",
		price: 178722.89,
	} as ProductT,
	{
		id: "e13c6c09-7694-498c-ab49-4bfabedf23fa",
		name: "Refined Granite Keyboard",
		price: 55817.45,
	} as ProductT,
	{
		id: "7fc9a30a-b523-44ea-9ecc-6d1ec008375c",
		name: "Gorgeous Rubber Shoes",
		price: 9439.19,
	} as ProductT,
	{
		id: "729c30ef-ef9c-4571-998d-b639a519c930",
		name: "Gorgeous Metal Sausages",
		price: 6425.2,
	} as ProductT,
	{
		id: "1952f940-9d2c-41b1-91d7-94d2d2509ebb",
		name: "Fantastic Bamboo Pants",
		price: 42322.19,
	} as ProductT,
];

describe("sortObjectsByKey", () => {
	it("should sort objects by a number field (price) in ascending order", () => {
		const sorted = sortObjectsByKey({
			array: testProducts,
			key: "price",
			order: SortOrderE.ASC,
		});

		expect(sorted[0].price).toBe(6425.2);
		expect(sorted[sorted.length - 1].price).toBe(190124.99);
		expect(sorted[1].price).toBeGreaterThanOrEqual(sorted[0].price);
	});

	it("should sort objects by a number field (price) in descending order", () => {
		const sorted = sortObjectsByKey({
			array: testProducts,
			key: "price",
			order: SortOrderE.DESC,
		});

		console.log(sorted);

		expect(sorted[0].price).toBe(190124.99);
		expect(sorted[sorted.length - 1].price).toBe(6425.2);
		expect(sorted[1].price).toBeLessThanOrEqual(sorted[0].price);
	});

	it("should sort objects by a string field (name) in ascending order", () => {
		const sorted = sortObjectsByKey({
			array: testProducts,
			key: "name",
			order: SortOrderE.ASC,
		});

		expect(sorted[0].name).toBe("Electronic Marble Pizza");
		expect(sorted[sorted.length - 1].name).toBe("Tasty Bronze Bacon");
	});

	it("should sort objects by a string field (name) in descending order", () => {
		const sorted = sortObjectsByKey({
			array: testProducts,
			key: "name",
			order: SortOrderE.DESC,
		});

		expect(sorted[0].name).toBe("Tasty Bronze Bacon");
		expect(sorted[sorted.length - 1].name).toBe("Electronic Marble Pizza");
	});

	it("should not mutate the original array", () => {
		const originalArray = [...testProducts];
		sortObjectsByKey({
			array: originalArray,
			key: "price",
			order: SortOrderE.ASC,
		});
		expect(originalArray).toEqual(testProducts);
	});
});
