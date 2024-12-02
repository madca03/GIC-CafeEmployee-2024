import React from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import AlertDialog from "@/components/AlertDialog/AlertDialog";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            <Link to="/">Cafe</Link>
                        </Typography>

                        <Typography variant="h6" component="div">
                            <Link to="/employees">Employees</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <main>
                <Outlet/>
            </main>

            <AlertDialog/>
        </div>
    )
}

export default RootLayout;