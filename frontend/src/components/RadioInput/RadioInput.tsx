import RadioInputProps from "@/components/RadioInput/RadioInputProps";
import StringUtil from "@/common/utils/StringUtil";
import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";

const RadioInput = (props: RadioInputProps) => {
    const hasError = !StringUtil.isNullOrEmpty(props.errorMessage);

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onInput) props.onInput(e.target.value);
    }

    return (
        <FormControl error={hasError}>
            <FormLabel id={props.id}>{props.label}</FormLabel>
            <RadioGroup
                row
                value={props.value}
                name={`${props.id}-radio-buttons-group`}
                onChange={onInput}
            >
                {props.options.map(x => (
                    <FormControlLabel value={x.value} control={<Radio />} label={x.text} />
                ))}

            </RadioGroup>
            {hasError && <FormHelperText>{props.errorMessage}</FormHelperText>}
        </FormControl>
    )
}

RadioInput.defaultProps = {
    id: StringUtil.generateUUID()
}

export default RadioInput;