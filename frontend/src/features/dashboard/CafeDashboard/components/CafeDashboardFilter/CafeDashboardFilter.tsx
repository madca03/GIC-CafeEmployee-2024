import CafeDashboardFilterProps
    from "@/features/dashboard/CafeDashboard/components/CafeDashboardFilter/CafeDashboardFilterProps";
import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Box, Button, Stack, TextField} from "@mui/material";


const CafeDashboardFilter = (props: CafeDashboardFilterProps) => {
    const [location, setLocation] = useState<string | null>('');

    const onClickSearch = () => {
        if (props.onClickSearch) {
            props.onClickSearch({
                location: location
            })
        }
    }

    return (
        <Stack direction="row" spacing={2}>
            <TextField id="location-filter"
                       label="Location"
                       variant="standard"
                       value={location ?? ''}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setLocation(e.target.value) }}
                       style={{ width: "400px" }}/>
            <Button variant="contained" onClick={onClickSearch}>Search</Button>
            <Button variant="outlined" onClick={props.onClickClear}>Clear</Button>
        </Stack>
    )
}

export default CafeDashboardFilter;