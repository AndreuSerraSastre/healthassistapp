import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SET_SIDE_MENU_STATE } from '../constants';
import { getSideMenuState } from '../store/selectors';
import { Backdrop } from './Styles';

const AppBackdrop = () => {

    const dispatch = useDispatch();
    const handleHide = () => dispatch({ type: SET_SIDE_MENU_STATE, payload: true });
    const hide = useSelector(getSideMenuState);

    return !hide && <Backdrop onClick={handleHide} />
};
export default AppBackdrop