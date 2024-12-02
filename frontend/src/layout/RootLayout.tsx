import React from "react";
import {AppBar, Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import NavItem from "@/components/NavItem/NavItem";
import "./RootLayout.scss";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <NavItem linkTo="/" text="Cafe"/>
                        <NavItem linkTo="/employees" text="Employees"/>
                    </Toolbar>
                </AppBar>
            </Box>

            <main className="root-layout__content">
                <Outlet/>
            </main>

            <AlertDialog/>
        </div>
    )
}

export default RootLayout;