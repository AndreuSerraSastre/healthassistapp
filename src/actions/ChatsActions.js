import { axios } from "../connection/ConnectionHandler";
import { API } from "../constants/api";
import { keyBy } from "lodash";
import {
    ADD_NEW_CHAT,
    DELETE_CHAT,
    CHAT_FORM_TOOGLE_LOADING,
    SET_CHAT_LIST,
    SHOW_NOTIFICATION,
    UPDATE_CHAT,
} from "../constants";
import { formatChats } from "./settingsActionsUtils";

/* CHAT LIST */
export const fetchChats = () => {
    return async (dispatch) => {
        const response = await axios
            .get(API.Chats.list)
            .then((response) => {
                const Chats = formatChats(response.data);
                dispatch({
                    type: SET_CHAT_LIST,
                    payload: keyBy(Chats, "_id"),
                });
                return response;
            })
            .catch((err) => err);
        return response;
    };
};

// CHATS
export const createChat = (newChat) => {
    return async (dispatch) => {
        dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
        const response = await axios
            .post(API.Chats.create, newChat)
            .then((response) => {
                const Chat = formatChats(response.data);
                dispatch({ type: ADD_NEW_CHAT, payload: Chat });
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                return response;
            })
            .catch((err) => {
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                return err;
            });
        return response;
    };
};

export const updateChat = (updatedChat) => {
    return async (dispatch) => {
        dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
        const response = await axios
            .put(`${API.Chats.edit}${updatedChat && updatedChat._id}`, updatedChat)
            .then((response) => {
                const Chat = formatChats(response.data);
                dispatch({ type: UPDATE_CHAT, payload: Chat });
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                return response;
            })
            .catch((err) => {
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                return err;
            });
        return response;
    };
};

export const deleteChats = (Ids) => {
    return async (dispatch) => {
        dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
        const response = await axios
            .delete(`${API.Chats.delete}`, { data: Ids })
            .then((response) => {
                dispatch({ type: DELETE_CHAT, payload: Ids });
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: {
                        show: true,
                        status: "info",
                        message: Ids.length > 1 ? "Chats eliminados." : "Chat eliminado.",
                    },
                });
                return response && response.status;
            })
            .catch((err) => {
                dispatch({ type: CHAT_FORM_TOOGLE_LOADING });
                return err;
            });
        return response;
    };
};
