import type { ChangeEvent, ComponentProps, JSX } from "react";
import { useEffect, useState } from "react";
import { useId } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";

type DropdownOption = {
	value: string;
	label: string;
};

type DropdownProps = {
	label?: string;
	value?: string;
	options: DropdownOption[];
	onChange: (value: string) => void;
} & Omit<ComponentProps<"select">, "value" | "onChange">;

export function Dropdown({
	label,
	value,
	options,
	onChange,
	className,
	...props
}: DropdownProps): JSX.Element {
	const [dropdownValue, setDropdownValue] = useState("");

	const id = useId();

	useEffect(() => {
		setDropdownValue(value?.toString() ?? "");
	}, [value]);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setDropdownValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<label htmlFor={id} className={clsx(styles.wrapper, className)}>
			<span className={styles.labelText}>{label}</span>
			<div className={styles.selectContainer}>
				<select
					id={id}
					value={dropdownValue}
					onChange={handleChange}
					className={styles.select}
					{...props}
				>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</label>
	);
}
