import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import { Pagination } from "./Pagination.tsx";

const DOTS = RegExp(/^\.{3}$/);

describe("Pagination Component", () => {
	const onClickPage = vi.fn();
	const onClickNext = vi.fn();
	const onClickPrev = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly with multiple pages", () => {
		render(
			<Pagination
				total={5}
				active={3}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "5" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
		expect(screen.queryAllByText(DOTS)).toHaveLength(0);
	});

	it("case: 1 2 ... 10, active page 1, total pages 10", () => {
		render(
			<Pagination
				total={10}
				active={1}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "5" })).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
		expect(screen.queryAllByText(DOTS)).toHaveLength(1);
	});

	it("case: 1 ... 3 4 5 ... 10, active page 4, total pages 10", () => {
		render(
			<Pagination
				total={10}
				active={4}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "2" })).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "6" })).not.toBeInTheDocument();

		expect(screen.queryAllByText(DOTS)).toHaveLength(2);
	});

	it("case: 1 ... 8 9 10, active page 9, total pages 10", () => {
		render(
			<Pagination
				total={10}
				active={9}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "9" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();

		expect(screen.queryAllByText(DOTS)).toHaveLength(1);
	});

	it.skip("disables the active page button and sets aria-current", () => {
		render(
			<Pagination
				total={5}
				active={3}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		const activeButton = screen.getByRole("button", { name: "3" });
		expect(activeButton).toBeDisabled();
		expect(activeButton).toHaveAttribute("aria-current", "page");
	});

	it("disables the 'Prev' button on the first page", () => {
		render(
			<Pagination
				total={5}
				active={1}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
	});

	it("disables the 'Next' button on the last page", () => {
		render(
			<Pagination
				total={5}
				active={5}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Prev" })).not.toBeDisabled();
	});

	it("calls the correct handlers on button click", () => {
		render(
			<Pagination
				total={5}
				active={3}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "4" }));
		expect(onClickPage).toHaveBeenCalledWith(4);

		fireEvent.click(screen.getByRole("button", { name: "Prev" }));
		expect(onClickPrev).toHaveBeenCalled();

		fireEvent.click(screen.getByRole("button", { name: "Next" }));
		expect(onClickNext).toHaveBeenCalled();
	});

	it("does not render if total pages is 1 or less", () => {
		const { rerender } = render(
			<Pagination
				total={1}
				active={1}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);

		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

		rerender(
			<Pagination
				total={0}
				active={1}
				onClickPage={onClickPage}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
			/>,
		);
		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
	});
});
