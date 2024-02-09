import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/usersActions";
import {
  EmailInput,
  ProfileNameInput,
  SubmitButton,
  SurnameInput,
  UsernameInput,
  IdInput,
  PasswordInput,
  BasicCheckbox,
} from "../FormComponents";
import ProfileAvatar from "./ProfileAvatar";
import { BasicInfoSettingsWrapper, ProfileFormWrapper } from "./styles";

const BasicInfoSettings = ({ profile }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (data) => {
    setLoading(true);
    delete profile.password;
    if (!data.password || data.password === "") {
      delete data.password;
    }
    const response = await dispatch(updateUser({ ...profile, ...data }));
    response && setLoading(false);
  };

  return (
    <BasicInfoSettingsWrapper>
      <ProfileFormWrapper
        onFinish={onFinish}
        initialValues={{ ...profile, password: undefined }}
        layout="vertical"
      >
        <IdInput />
        <ProfileNameInput />
        <SurnameInput />
        <EmailInput />
        <UsernameInput />
        <BasicCheckbox
          name="DOBLEFA"
          text="Doble autentificación"
        ></BasicCheckbox>
        <PasswordInput label="Cambiar contraseña" />
        <SubmitButton text="GUARDAR CAMBIOS" loading={loading} />
      </ProfileFormWrapper>
      <ProfileAvatar profile={profile} />
    </BasicInfoSettingsWrapper>
  );
};

export default BasicInfoSettings;
