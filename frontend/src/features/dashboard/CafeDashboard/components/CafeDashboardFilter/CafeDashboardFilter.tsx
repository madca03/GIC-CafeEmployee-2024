import CafeDashboardFilterProps
    from "@/features/dashboard/CafeDashboard/components/CafeDashboardFilter/CafeDashboardFilterProps";
import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";


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
        <Grid container spacing={2} display="flex" alignItems="center">
            <Grid>
                <TextField id="location-filter"
                           label="Location"
                           variant="standard"
                           value={location ?? ''}
                           onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setLocation(e.target.value) }}/>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={onClickSearch}>Search</Button>
            </Grid>
            <Grid>
                <Button variant="outlined" onClick={props.onClickClear}>Clear</Button>
            </Grid>
        </Grid>
    )
}

export default CafeDashboardFilter;