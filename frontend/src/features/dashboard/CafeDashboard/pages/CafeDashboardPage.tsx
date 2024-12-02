import {Box, Button, Container, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import CafeFilter, {initialCafeFilter} from "../models/CafeFilter";
import CafeDashboardFilter from "../components/CafeDashboardFilter/CafeDashboardFilter";
import CafeDashboardTable from "../components/CafeDashboardTable/CafeDashboardTable";
import CafeDatabaseModel from "@/services/models/databaseModels/CafeDatabaseModel";
import CafeService from "@/services/CafeService";
import GetCafeRequestModel from "@/services/models/requestModels/GetCafeRequestModel";
import StringUtil from "@/common/utils/StringUtil";
import {useNavigate} from "react-router-dom";

const CafeDashboardPage = () => {
    const [filter, setFilter] = useState<CafeFilter>(initialCafeFilter);
    const [cafes, setCafes] = useState<CafeDatabaseModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const req: GetCafeRequestModel = {};

        if (!StringUtil.isNullOrEmpty(filter.location)) req.location = filter.location!;

        CafeService.getCafes(req)
            .then((res) => {
                setCafes(res.data);
            })
    }, [filter]);

    /***** EVENT HANDLERS *****/

    const onClickSearch = (filter: CafeFilter) => {
        setFilter((prevState) => ({...prevState, ...filter}));
    }

    const onClickClear = () => {
        setFilter(initialCafeFilter);
    }

    const onAddCafe = () => {
        navigate("/cafe/add");
    }

    const onDeleteCafe = (cafeId: number) => {
        CafeService.deleteCafe(cafeId)
            .then(() => {
               setCafes((prevState) => (prevState.filter(x => x.id !== cafeId)));
            });
    }

    return (
        <Box className="cafe-dashboard-page" sx={{ p: 2 }}>
            <Paper elevation={5} sx={{ p: 2, mb: 4 }}>
                <Button variant="contained" onClick={onAddCafe}>Add Cafe</Button>
                <CafeDashboardFilter filter={filter}
                                     onClickSearch={onClickSearch}
                                     onClickClear={onClickClear}/>
            </Paper>

            <Paper elevation={5}>
                <CafeDashboardTable cafes={cafes} onDeleteCafe={onDeleteCafe}/>
            </Paper>
        </Box>
    )
}

export default CafeDashboardPage;