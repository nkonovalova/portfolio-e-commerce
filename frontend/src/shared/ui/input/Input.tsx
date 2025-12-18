import type { ChangeEvent } from "react";
import {
	useId,
	type ComponentProps,
	type Ref,
	useEffect,
	useState,
} from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

type InputProps = {
	value?: string | number;
	label?: string;
	error?: string;
	className?: string;
	ref?: Ref<HTMLInputElement>;
	onChange?: (value: string) => void;
} & Omit<ComponentProps<"input">, "ref" | "onChange">;

function Input({
	value,
	label,
	error,
	className,
	ref,
	onChange = () => null,
	...props
}: InputProps) {
	const inputId = useId();
	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		setInputValue(value?.toString() ?? "");
	}, [value]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<label htmlFor={inputId} className={clsx(styles.wrapper, className)}>
			<span className={styles.labelText}>{label}</span>
			<input
				id={inputId}
				ref={ref}
				value={inputValue}
				className={clsx(styles.input, error && styles.inputError)}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				onChange={handleChange}
				{...props}
			/>
			{error && (
				<p id={`${inputId}-error`} className={styles.errorMessage} role="alert">
					{error}
				</p>
			)}
		</label>
	);
}

export default Input;
