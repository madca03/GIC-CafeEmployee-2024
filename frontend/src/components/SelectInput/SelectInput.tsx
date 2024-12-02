import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import StringUtil from "@/common/utils/StringUtil";
import SelectInputProps from "@/components/SelectInput/SelectInputProps";
import RadioInput from "@/components/RadioInput/RadioInput";

const SelectInput = (props: SelectInputProps) => {
    const hasError = !StringUtil.isNullOrEmpty(props.errorMessage);

    const onInput = (e: SelectChangeEvent) => {
        if (props.onInput) props.onInput(e.target.value as string);
    }

    return (
        <FormControl fullWidth error={hasError}>
            <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
            <Select
                labelId={`${props.id}-label`}
                id={props.id}
                value={props.value}
                label={props.label}
                onChange={onInput}
            >
                {props.options.map(x => (
                    <MenuItem value={x.value}>{x.text}</MenuItem>
                ))}
            </Select>
            {hasError && <FormHelperText>{props.errorMessage}</FormHelperText>}
        </FormControl>
    )
}

SelectInput.defaultProps = {
    id: StringUtil.generateUUID()
}

export default SelectInput;