import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { APP_COOKIE_NAME, LOGOUT } from "../constants";
import AppLoading from "../layout/utils/AppLoading";
import { deleteCookie } from "../utils";

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        deleteCookie(APP_COOKIE_NAME)
        dispatch({ type: LOGOUT });
        navigate("/login");
    }, [dispatch, navigate]);

    return <AppLoading />
};

export default Logout;