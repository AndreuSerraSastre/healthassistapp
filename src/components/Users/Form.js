import React from "react";
import status from "http-status";
import { Modal, Form, Divider, message } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../actions/usersActions";
import { CLOSE_USERS_FORM } from "../../constants";
import { CloseIconX } from "../../constants/icons";
import { getUserProfile, getUsersForm } from "../../store/selectors";
import { formatFormInitialData } from "../../utils";
import {
  UsernameInput,
  SurnameInput,
  EmailInput,
  ProfileNameInput,
  PasswordInput,
  SubmitButton,
  PhoneNumberInput,
  IdInput,
  RoleSelector,
} from "../FormComponents";
import { PasswordChange } from "./Components";

const UsersForm = () => {
  const dispatch = useDispatch();

  const { loading, show, data } = useSelector(getUsersForm) || {};

  const profile = useSelector(getUserProfile);

  const [form] = Form.useForm();

  const onFinish = async (data) => {
    const response = await (data._id
      ? dispatch(updateUser(data))
      : dispatch(createUser(data)));
    if (status[`${response}_CLASS`] === status.classes.SUCCESSFUL) {
      onCancel();
      if (!data._id && !profile._id) {
        message.info("Ahora ya puede iniciar sessión con el usuario creado.")
      }
    }
  };

  const onCancel = () => {
    resetForm();
    dispatch({ type: CLOSE_USERS_FORM });
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
  }, [form, data, resetForm]);

  return (
    <Modal
      maskClosable={false}
      open={show}
      onCancel={onCancel}
      title={data ? "EDITAR USUARIO" : "NUEVO USUARIO"}
      {...mdlProps}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <IdInput />
        <ProfileNameInput />
        <SurnameInput />
        <PhoneNumberInput />
        {data && data._id && <RoleSelector form={form} label="Tipo de usuario" />}
        <Divider dashed />
        <UsernameInput />
        <EmailInput />
        <Divider dashed />
        {data && <PasswordChange userId={data._id} />}
        {!data && (
          <PasswordInput
            rules={[
              { required: data ? false : true, message: "Campo requerido" },
            ]}
          />
        )}
        <SubmitButton
          block
          loading={loading}
          text={data ? "GUARDAR CAMBIOS" : "CREAR USUARIO"}
        />
      </Form>
    </Modal>
  );
};

export default UsersForm;

const mdlProps = {
  closable: true,
  closeIcon: <CloseIconX />,
  footer: null,
  forceRender: true,
  style: { top: 40 },
};
