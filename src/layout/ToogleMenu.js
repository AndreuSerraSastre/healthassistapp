import React from "react";
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { SET_SIDE_MENU_STATE } from '../constants';
import { MenuIcon } from '../constants/icons';
import { getSideMenuState } from '../store/selectors';

const ToogleSideMenu = () => {

    const dispatch = useDispatch();
    const open = useSelector(getSideMenuState)

    const toogle = () => {
        dispatch({ type: SET_SIDE_MENU_STATE, payload: !open })
    }

    return (
        <ToogleWrapper
            onClick={toogle}
            icon={<MenuIcon isCollapsed={open} />}
            type="link" />
    )
};

export default ToogleSideMenu;

const ToogleWrapper = styled(Button)`
    margin-right: 15px;
    color: #fff;
    & > :focus {
        color: unset !important;
    }
`;