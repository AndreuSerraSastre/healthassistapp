import { UsersSelect } from "../FormComponents";
import { BasicInput } from "../FormComponents";
import React from "react";
import status from "http-status";
import { Modal, Form } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIconX } from "../../constants/icons";
import { getChatsForm, getUserProfile } from "../../store/selectors";
import { formatFormInitialData } from "../../utils";
import { SubmitButton, IdInput } from "../FormComponents";
import { CLOSE_CHAT_FORM } from "../../constants";
import { createChat, updateChat } from "../../actions/ChatsActions";

const ChatsForm = () => {
    const dispatch = useDispatch();

    const profile = useSelector(getUserProfile);

    const { loading, show, data } = useSelector(getChatsForm) || {};

    const [form] = Form.useForm();

    const onFinish = async (dataPost) => {
        const response = await (data && data._id
            ? dispatch(updateChat(dataPost))
            : dispatch(createChat(dataPost)));
        if (status[`${response}_CLASS`] === status.classes.SUCCESSFUL) {
            onCancel();
        }
    };

    const onCancel = () => {
        resetForm();
        dispatch({ type: CLOSE_CHAT_FORM });
    };

    const resetForm = useCallback(() => {
        form.resetFields();
    }, [form]);

    useEffect(() => {
        if (data) {
            const fields = formatFormInitialData(data);
            form.setFields(fields);
        }
        return () => resetForm();
    }, [form, data, resetForm, profile]);

    return (
        <Modal maskClosable={false}
            open={show}
            onCancel={onCancel}
            title={data ? "EDITAR CHAT" : "NUEVO CHAT"}
            {...mdlProps}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <IdInput />
                <UsersSelect form={form} rule name="user" placeholder="Usuario"></UsersSelect>
                <BasicInput  name="messages" placeholder="Mensajes"></BasicInput>
                <SubmitButton
                    block
                    loading={loading}
                    text={data ? "GUARDAR CAMBIOS" : "CREAR CHAT"}
                />
            </Form>
        </Modal>
    );
};

export default ChatsForm;

const mdlProps = {
    closable: true,
    closeIcon: <CloseIconX />,
    forceRender: true,
    style: { top: 40 },
    footer: null,
};
