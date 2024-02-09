import React from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Input, Tag, Typography } from "antd";
import { ROLE_OPTS } from "../../constants/permissions";
import { useState } from "react";
import { updateUser } from "../../actions/usersActions";
import { PasswordChangeWrapper } from "./styles";
import { CaretRightFilled } from "@ant-design/icons";
import { scheme } from "../../constants/colors";

const { Text } = Typography;

export const UserRole = ({ role, onlyText }) => {
  let opt = ROLE_OPTS.find((r) => r.value === role);
  if (!opt) return "";
  opt = opt.label
  const optLabel = opt.label
  if (onlyText) {
    return optLabel || "";
  }

  const fontWeight = (opt) => {
    if (opt === "Admin mantenimiento" || opt === "Admin laboratorio" || opt === "Admin") return "bold";
    return "normal";
  };

  const colorOpt = (opt) => {
    if (opt === "Admin mantenimiento") return "green";
    if (opt === "Admin laboratorio") return "blue";
    if (opt === "Admin") return "gold";
    return "";
  };

  return (
    <Tag style={{ fontWeight: fontWeight(opt) }} color={colorOpt(opt)}>
      {opt}
    </Tag>
  );
};

export const PasswordChange = ({ userId }) => {
  const dispatch = useDispatch();

  const [pwdA, setPwdA] = useState("");
  const [pwdB, setPwdB] = useState("");
  const [loading, setLoading] = useState(false);

  const changeUserPassword = async () => {
    setLoading(true);
    const response = await dispatch(
      updateUser({ _id: userId, password: pwdA })
    );
    response && setLoading(false);
  };

  const disbledBtn = () => {
    if (!pwdA || !pwdB) {
      return true;
    }
    if (pwdA !== pwdB) {
      return true;
    }
    return false;
  };

  if (!userId) {
    return null;
  }

  return (
    <PasswordChangeWrapper
      ghost
      expandIcon={({ isActive }) => (
        <CaretRightFilled
          rotate={isActive ? 90 : 0}
          style={{ color: scheme["color-danger-500"] }}
        />
      )}
    >
      <PasswordChangeWrapper.Panel
        header={
          <Text type="danger" strong>
            CAMBIAR CONTRASEÑA
          </Text>
        }
      >
        <Input.Password
          value={pwdA}
          onChange={(e) => setPwdA(e.target.value)}
          placeholder="Nueva contraseña"
        />

        <Input.Password
          value={pwdB}
          onChange={(e) => setPwdB(e.target.value)}
          placeholder="Repita la contraseña"
        />

        <Button
          danger
          size="small"
          type="primary"
          loading={loading}
          onClick={changeUserPassword}
          disabled={disbledBtn()}
        >
          CAMBIAR CONTRASEÑA
        </Button>

        {pwdA !== pwdB && (
          <Alert
            type="error"
            showIcon
            message="Las contraseñas deben coincidir."
          />
        )}
      </PasswordChangeWrapper.Panel>
    </PasswordChangeWrapper>
  );
};
