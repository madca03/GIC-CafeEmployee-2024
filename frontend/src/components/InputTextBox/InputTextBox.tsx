import {FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import React from "react";
import StringUtil from "@/common/utils/StringUtil";
import InputTextBoxProps from "@/components/InputTextBox/InputTextBoxProps";

const InputTextBox = (props: InputTextBoxProps) => {
    const hasError = !StringUtil.isNullOrEmpty(props.errorMessage);

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onInput) props.onInput(e.target.value);
    }

    return (
        <FormControl error={hasError} variant="standard">
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <Input
                id={props.id}
                value={props.value ?? ''}
                onInput={onInput}
            />
            {hasError && <FormHelperText>{props.errorMessage}</FormHelperText>}
        </FormControl>
    )
}

InputTextBox.defaultProps = {
    id: StringUtil.generateUUID()
}

export default InputTextBox;