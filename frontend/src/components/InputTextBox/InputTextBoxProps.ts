interface InputTextBoxProps {
    id: string,
    label: string,
    errorMessage?: string | null,
    value: string,
    onInput: (val: string) => void;
}

export default InputTextBoxProps;