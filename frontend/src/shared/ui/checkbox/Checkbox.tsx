import type { ChangeEvent, ComponentProps, JSX, ReactNode } from "react";
import { useState } from "react";
import { useId } from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";
import { IconCheck } from "../icons/Icon.tsx";

type CheckboxProps = {
	label?: string | ReactNode;
	value?: boolean;
	color?: string;
	onChange?: (checked: boolean) => void;
} & Omit<ComponentProps<"input">, "value" | "onChange" | "type">;

export function Checkbox({
	label,
	color,
	value = false,
	onChange = () => null,
	className,
	...props
}: CheckboxProps): JSX.Element {
	const [checked, setChecked] = useState(value);
	const id = useId();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		onChange(event.target.checked);
	};

	return (
		<label htmlFor={id} className={clsx(styles.wrapper, className)}>
			<input
				id={id}
				type="checkbox"
				className={styles.input}
				checked={checked}
				onChange={handleChange}
				{...props}
			/>
			<span
				className={clsx(styles.customCheckbox, checked && styles.checked)}
				aria-hidden="true"
				style={{ backgroundColor: color }}
			>
				<IconCheck className={styles.checkIcon} />
			</span>
			{label && <span className={styles.labelText}>{label}</span>}
		</label>
	);
}
