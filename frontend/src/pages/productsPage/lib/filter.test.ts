import { describe, it, expect } from "vitest";
import { toFilterProducts } from "./filter.ts";
import type { ProductT } from "../../../entities/product/model/model.ts";
import type { FilterState } from "../store/productsFilterSlice.ts";
import {
	ProductSizeE,
	ProductStatusE,
} from "../../../entities/product/model/model.ts";

// A sample of 10 products from backend/data/products.json, with finalPrice added.
const testProducts: ProductT[] = [
	{
		id: "370b702e-3a73-493a-bfe8-710f28768c84",
		name: "Bespoke Bamboo Soap",
		price: 110788.2,
		finalPrice: 109680.318, // price * (1 - 1/100)
		status: { new: true, discount: 1, last: true, hot: true },
		category: "Dining & Kitchen",
		size: [ProductSizeE.XS, ProductSizeE.L],
		color: ["#fd58bf"],
	} as ProductT,
	{
		id: "d74d6cb8-f521-4292-9f45-9dec2956f4c8",
		name: "Frozen Bamboo Shirt",
		price: 56201.89,
		finalPrice: 8992.3024, // price * (1 - 84/100)
		status: { new: false, discount: 84, last: true, hot: true },
		category: "Lighting",
		size: [ProductSizeE.S, ProductSizeE.L],
		color: ["#9c8807", "#ac2cb3"],
	} as ProductT,
	{
		id: "b4974372-2ebf-4450-9b72-4539896554d0",
		name: "Unbranded Plastic Tuna",
		price: 156667.35,
		finalPrice: 133167.2475, // price * (1 - 15/100)
		status: { new: true, discount: 15, last: false, hot: true },
		category: "Rugs",
		size: [ProductSizeE.S, ProductSizeE.L],
		color: ["#8d38f4", "#fd58bf"],
	} as ProductT,
	{
		id: "3b33d14f-818a-496f-9a98-88e3215080fd",
		name: "Awesome Metal Cheese",
		price: 1992.57,
		finalPrice: 458.2911, // price * (1 - 77/100)
		status: { new: false, discount: 77, last: true, hot: false },
		category: "Rugs",
		size: [ProductSizeE.S, ProductSizeE.XS],
		color: ["#456f4d", "#4d67b9"],
	} as ProductT,
	{
		id: "c73c5ec8-87fe-4a31-b23e-9948a334ad6b",
		name: "Oriental Aluminum Ball",
		price: 127079.55,
		finalPrice: 12707.955, // price * (1 - 90/100)
		status: { new: true, discount: 90, last: false, hot: true },
		category: "Entryway",
		size: [ProductSizeE.L, ProductSizeE.XS, ProductSizeE.M, ProductSizeE.S],
		color: ["#e8c3f6", "#8d38f4"],
	} as ProductT,
	{
		id: "38af92bb-5135-4126-b016-d6c7daa56281",
		name: "Soft Steel Table",
		price: 140515.3,
		finalPrice: 136299.841, // price * (1 - 3/100)
		status: { new: false, discount: 3, last: true, hot: false },
		category: "Entryway",
		size: [ProductSizeE.S, ProductSizeE.L],
		color: ["#bbdedc", "#ac2cb3"],
	} as ProductT,
	{
		id: "34c0436b-723a-4a38-bfb9-d0cba495288a",
		name: "Bespoke Granite Shirt",
		price: 75643.29,
		finalPrice: 61271.0649, // price * (1 - 19/100)
		status: { new: true, discount: 19, last: false, hot: false },
		category: "Entryway",
		size: [ProductSizeE.L],
		color: ["#bbdedc", "#f42afc"],
	} as ProductT,
	{
		id: "84c550d9-1236-450d-935f-89e85886b704",
		name: "Licensed Bronze Cheese",
		price: 50371.75,
		finalPrice: 32237.92, // price * (1 - 36/100)
		status: { new: true, discount: 36, last: false, hot: false },
		category: "Kids & Nursery",
		size: [ProductSizeE.XS],
		color: ["#ac2cb3", "#fd58bf"],
	} as ProductT,
	{
		id: "a30287d7-3a33-4aa0-976a-91350063c4a4",
		name: "Frozen Silk Chips",
		price: 74778.49,
		finalPrice: 32902.5356, // price * (1 - 56/100)
		status: { new: true, discount: 56, last: false, hot: false },
		category: "Dining & Kitchen",
		size: [ProductSizeE.XS, ProductSizeE.S, ProductSizeE.M],
		color: ["#8d38f4"],
	} as ProductT,
	{
		id: "34d05a69-e834-4965-b59e-7413d3abec0b",
		name: "Gorgeous Bronze Tuna",
		price: 68197.79,
		finalPrice: 38190.7624, // price * (1 - 44/100)
		status: { new: true, discount: 44, last: true, hot: true },
		category: "Lighting",
		size: [ProductSizeE.XS, ProductSizeE.S],
		color: ["#fd58bf", "#ac2cb3"],
	} as ProductT,
];

// Base state with all filters inactive
const initialFilterState: FilterState = {
	categories: {},
	sizes: { XS: false, S: false, M: false, L: false },
	colors: {},
	price: { from: "", to: "" },
	status: { new: false, hot: false, last: false, discount: false },
	name: "",
};

describe("toFilterProducts", () => {
	it("should return all products when no filters are active", () => {
		const result = toFilterProducts(testProducts, initialFilterState);
		expect(result.length).toBe(10);
	});

	it("should filter by name (case-insensitive)", () => {
		const filter: FilterState = { ...initialFilterState, name: "bamboo" };
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(2);
		expect(result[0].name).toBe("Bespoke Bamboo Soap");
		expect(result[1].name).toBe("Frozen Bamboo Shirt");
	});

	it("should filter by a single category", () => {
		const filter: FilterState = {
			...initialFilterState,
			categories: { "Dining & Kitchen": true },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(2);
		expect(result.every(p => p.category === "Dining & Kitchen")).toBe(true);
	});

	it("should filter by a single size", () => {
		const filter: FilterState = {
			...initialFilterState,
			sizes: { ...initialFilterState.sizes, [ProductSizeE.M]: true },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(2);
		expect(result.every(p => p.size.includes(ProductSizeE.M))).toBe(true);
	});

	it("should filter by a single color", () => {
		const filter: FilterState = {
			...initialFilterState,
			colors: { "#8d38f4": true },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(3);
		expect(result.every(p => p.color.includes("#8d38f4"))).toBe(true);
	});

	it("should filter by price range (from) using finalPrice", () => {
		const filter: FilterState = {
			...initialFilterState,
			price: { from: "100000", to: "" },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(3);
		expect(result.every(p => (p.finalPrice ?? p.price) >= 100000)).toBe(true);
	});

	it("should filter by price range (to) using finalPrice", () => {
		const filter: FilterState = {
			...initialFilterState,
			price: { from: "", to: "10000" },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(2);
		expect(result.map(p => p.name)).toContain("Frozen Bamboo Shirt"); // finalPrice: 8992.3
		expect(result.map(p => p.name)).toContain("Awesome Metal Cheese"); // finalPrice: 458.29
	});

	it("should filter by a single status (e.g., only 'new')", () => {
		const filter: FilterState = {
			...initialFilterState,
			status: { ...initialFilterState.status, [ProductStatusE.NEW]: true },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(7);
		expect(result.every(p => p.status.new)).toBe(true);
	});

	it("should filter by multiple statuses (e.g., 'last' AND 'hot')", () => {
		const filter: FilterState = {
			...initialFilterState,
			status: {
				...initialFilterState.status,
				[ProductStatusE.LAST]: true,
				[ProductStatusE.HOT]: true,
			},
		};
		const result = toFilterProducts(testProducts, filter);
		const expected = testProducts.filter(p => p.status.last || p.status.hot);
		expect(result.length).toBe(expected.length);
	});

	it("should combine multiple filters correctly (category, size, and price)", () => {
		const filter: FilterState = {
			...initialFilterState,
			categories: { Entryway: true },
			sizes: { ...initialFilterState.sizes, [ProductSizeE.L]: true },
			price: { from: "100000", to: "150000" },
		};
		const result = toFilterProducts(testProducts, filter);
		expect(result.length).toBe(1);
		expect(result[0].name).toBe("Soft Steel Table");
	});
});
