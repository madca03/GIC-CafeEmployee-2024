import {MenuItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import NavItemProps from "@/components/NavItem/NavItemProps";
import "./NavItem.scss";

const NavItem = (props: NavItemProps) => {
    return (
        <MenuItem className="nav-item">
            <Typography variant="h6" component="div">
                <Link to={props.linkTo}>{props.text}</Link>
            </Typography>
        </MenuItem>
    )
}

export default NavItem;