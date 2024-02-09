import React from 'react';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCookie } from "../utils";
import { Button, Form, Input, Checkbox, message, Modal } from "antd";
import { OPEN_USERS_FORM, PASS_COOKIE_NAME, USER_COOKIE_NAME } from "../constants";
import { scheme } from "../constants/colors";
import { check2FA, login } from "../actions/authActions";
import { LogInIcon } from "../constants/icons";
import AppLogo from "../layout/AppLogo";
import UsersForm from "../components/Users/Form";

const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState();
  const [credentials, setCredentials] = useState();

  const checkRemember = useCallback(async () => {
    Promise.all([
      getCookie(USER_COOKIE_NAME),
      getCookie(PASS_COOKIE_NAME),
    ]).then((credentials) => {
      if (credentials[0] && credentials[1]) {
        form.setFields([
          { name: "loginUsername", value: credentials[0] },
          { name: "loginPassword", value: credentials[1] },
        ]);
      }
    });
  }, [form]);

  const onFinish = async (credentials) => {
    setLoading(true);
    const { loginUsername, loginPassword, remember } = credentials;
    const response = await dispatch(login(loginUsername, loginPassword, remember));
    if (
      (response && response.status !== 200) ||
      (!response && response !== 200)
    ) {
      switch (response) {
        case 300:
          setVisible(true);
          setCredentials(credentials);
          message.warning(<strong>ES NECESARIO EL CÓDIGO DE 2FA.</strong>);
          break;
        case 401:
          message.warning(<strong>CREDENCIALES INVÁLIDAS.</strong>);
          break;
        case 500:
          message.warning(<strong>CREDENCIALES INVÁLIDAS.</strong>);
          break;
        default:
          if (response && response.message) {
            message.warning(<strong>{response.message}</strong>);
          } else {
            message.warning(
              <strong>HA OCURRIDO UN ERROR DURANTE EL LOGIN.</strong>
            );
          }
          break;
      }
    }
    setLoading(false);
  };

  const on2FAFinish = async (data) => {
    setLoading(true);
    const response = await dispatch(check2FA({ username: credentials.loginUsername, password: credentials.loginPassword, ...credentials, ...data }));
    if (response.status !== 200) {
      switch (response) {
        default:
          if (response.message) {
            message.warning(<strong>{response.message}</strong>);
          } else {
            message.warning(<strong>DATOS INCORRECTOS.</strong>);
          }
          break;
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    checkRemember();
  }, [checkRemember]);

  const handleRegistration = () => {
    dispatch({ type: OPEN_USERS_FORM });
  }

  return (
    <LoginWrapper>
      <AppLogo />
      <LoginForm
        form={form}
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item name="loginUsername">
          <Input placeholder="Usuario" autoComplete="username" />
        </Form.Item>
        <Form.Item name="loginPassword" >
          <Input.Password placeholder="Contraseña" autoComplete="current-password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <RememberBox>Recordar credenciales</RememberBox>
        </Form.Item>
        <Form.Item>
          <Button {...btnProps} loading={loading}>
            ENTRAR
          </Button>
        </Form.Item>
        <div style={{ color: 'white', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>¿No tienes cuenta?</div>
          <Button type="link" onClick={handleRegistration}>Registrate</Button>
        </div>
      </LoginForm>
      <Modal
        maskClosable={false}
        open={visible}
        onCancel={() => setVisible(false)}
        title="Introduzca el código de 2FA"
        footer={null}
      >
        <Form onFinish={on2FAFinish}>
          <Form.Item name="dobleFA">
            <Input placeholder="Código" />
          </Form.Item>
          <Button {...btnProps} loading={loading}>
            ENTRAR
          </Button>
        </Form>
      </Modal>
      <UsersForm />
    </LoginWrapper>
  );
};

export default Login;

const btnProps = {
  style: { fontWeight: "bold" },
  block: true,
  htmlType: "submit",
  icon: <LogInIcon />,
};

const LoginWrapper = styled.div`
  height: 100vh;
  color: ${scheme.light};
  background: ${scheme.dark};
  padding: 50px 0px;
  & > :first-child {
    justify-content: center;
    width: 100% !important;
  }
`;

const LoginForm = styled(Form)`
  max-width: 250px;
  margin: 30px auto;
`;

const RememberBox = styled(Checkbox)`
  color: ${scheme.light};
`;
