import PageLayout from "../pageLayout/PageLayout.tsx";
import Input from "../../shared/ui/input/Input.tsx";
import { Dropdown } from "../../shared/ui/dropdown/Dropdown.tsx";
import { Button } from "../../shared/ui/button/Button.tsx";
import { Checkbox } from "../../shared/ui/checkbox/Checkbox.tsx";

const SORT_OPTIONS = [
	{ value: "default", label: "Default" },
	{ value: "price-asc", label: "Price ↑" },
	{ value: "price-desc", label: "Price ↓" },
	{ value: "name-asc", label: "A-Z" },
	{ value: "name-desc", label: "Z-A" },
];

function UIPage() {
	return (
		<PageLayout>
			<div>
				<h1>Inputs</h1>
				<Input label={"Text input"} />
				<Input label={"Number input"} type={"number"} min={1} value={15} />
			</div>
			<div>
				<h1>Dropdown</h1>
				<Dropdown
					label={"Sort by"}
					value={"default"}
					options={SORT_OPTIONS}
					onChange={e => {
						console.log(e);
					}}
				/>
			</div>
			<div>
				<h1>Buttons</h1>
				<Button>Hey!</Button>
			</div>
			<div>
				<h1>Checkbox</h1>
				<Checkbox label={1} />
				<h2>Checkbox with color</h2>
				<Checkbox color={"red"} />
			</div>
		</PageLayout>
	);
}
export default UIPage;
