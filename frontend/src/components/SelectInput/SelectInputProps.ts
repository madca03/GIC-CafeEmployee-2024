interface SelectInputProps {
    id: string,
    label: string,
    errorMessage?: string | null
    value: string,
    options: Array<{
        value: string,
        text: string
    }>
    onInput: (val: string) => void,
}

export default SelectInputProps;