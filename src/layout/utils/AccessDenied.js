import React from "react";
import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteCookie } from "../../utils";
import { APP_COOKIE_NAME, LOGOUT } from "../../constants";
import { useNavigate } from "react-router";

const { Paragraph, Text } = Typography;

const AccessDenied = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const goLogin = () => {
        deleteCookie(APP_COOKIE_NAME);
        dispatch({ type: LOGOUT });
    };

    const goHome = () => {
        history("");
    };

    const reload = () => window.location.reload();

    return (
        <Result
            status="error"
            title="Acceso denegado"
            subTitle="Está intentando acceder a una página para la que no tiene los permisos necesarios."
            extra={[
                <Button onClick={goHome} type="primary" key="home">
                    Ir al inicio
                </Button>,
                <Button onClick={goLogin} key="login">
                    Ir a login
                </Button>,
                <Button onClick={reload} key="reload">
                    Recargar
                </Button>,
            ]}
        >
            <div className="desc">
                <Paragraph>
                    <Text strong style={{ fontSize: 16 }}>
                        Es posible que haya llegado a esta página debido a:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined /> No tiene permisos para ver esta página.
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined /> Su cuenta ha sido suspendida.
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined /> La aplicación se encuentra en mantenimiento.
                </Paragraph>
            </div>
        </Result>
    );
};

export default AccessDenied;
