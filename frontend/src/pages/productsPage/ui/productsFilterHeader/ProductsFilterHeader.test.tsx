import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ProductsFilterHeader } from "./ProductsFilterHeader.tsx";
import {
	SortOrderE,
	SortTypeE,
} from "../../../../shared/utils/sort/model/sort.ts";

describe("ProductFilterHeader Component", () => {
	const onToggleFilter = vi.fn();
	const onChangeElementsPerPage = vi.fn();
	const onChangeSort = vi.fn();

	const defaultProps = {
		itemsTotal: 32,
		itemsPerPage: 16,
		currentPage: 1,
		currentSort: { type: SortTypeE.DEFAULT, order: SortOrderE.ASC },
		onToggleFilter,
		onChangeElementsPerPage,
		onChangeSort,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all controls correctly", () => {
		render(<ProductsFilterHeader {...defaultProps} />);
		expect(screen.getByRole("button", { name: /Filter/i })).toBeInTheDocument();
		expect(screen.getByLabelText("Show")).toBeInTheDocument();
		expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
	});

	it("displays the correct results info text", () => {
		render(<ProductsFilterHeader {...defaultProps} />);
		expect(screen.getByText("Showing 1–16 of 32 results")).toBeInTheDocument();
	});

	it("calculates results info correctly for the second page", () => {
		render(<ProductsFilterHeader {...defaultProps} currentPage={2} />);
		expect(screen.getByText("Showing 17–32 of 32 results")).toBeInTheDocument();
	});

	it("calls onToggleFilter when the filter button is clicked", () => {
		render(<ProductsFilterHeader {...defaultProps} />);
		fireEvent.click(screen.getByRole("button", { name: /Filter/i }));
		expect(onToggleFilter).toHaveBeenCalledTimes(1);
	});

	it("calls onChangeElementsPerPage when the 'Show' input value changes", () => {
		render(<ProductsFilterHeader {...defaultProps} />);
		const showInput = screen.getByLabelText("Show");
		fireEvent.change(showInput, { target: { value: "20" } });
		// Note: This tests the immediate change. Debouncing is handled by the Input component itself.
		// A more complex test would involve `vi.useFakeTimers`.
		expect(onChangeElementsPerPage).toHaveBeenCalled();
	});

	it("calls onChangeSort when the sort dropdown value changes", () => {
		render(<ProductsFilterHeader {...defaultProps} />);
		const sortDropdown = screen.getByLabelText("Sort by");
		fireEvent.change(sortDropdown, { target: { value: "price-asc" } });
		expect(onChangeSort).toHaveBeenCalledWith("price-asc");
	});
});
