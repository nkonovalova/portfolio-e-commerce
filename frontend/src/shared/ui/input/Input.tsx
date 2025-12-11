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
import useDebounce from "../../hooks/useDebounce.ts";

type InputProps = {
	value?: string;
	label?: string;
	error?: string;
	className?: string;
	ref?: Ref<HTMLInputElement>;
	debounceDelay?: number;
	onChange?: (value: string) => void;
} & Omit<ComponentProps<"input">, "ref" | "onChange">;

function Input({
	value,
	label,
	error,
	className,
	ref,
	onChange = () => null,
	debounceDelay = 500,
	...props
}: InputProps) {
	const inputId = useId();
	const [inputValue, setInputValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(inputValue, debounceDelay);

	useEffect(() => {
		onChange(debouncedValue);
	}, [debouncedValue, onChange]);

	useEffect(() => {
		setInputValue(value?.toString() ?? "");
	}, [value]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
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
