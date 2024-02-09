import React from "react";
import { Button } from "antd";
import { Navigate, Route, useNavigate } from "react-router";
import { GoBackIcon } from "../constants/icons";

export const RedirectHome = () => <Route render={() => <Navigate from="/" to="/home" push />} />;

export const GoBackButton = ({ onlyIcon }) => {
    const history = useNavigate();
    const go = () => history.goBack();
    return (
        <Button icon={<GoBackIcon />}
            shape={onlyIcon && 'circle'}
            onClick={go} type="primary">
            {!onlyIcon && 'VOLVER'}
        </Button>
    )
}