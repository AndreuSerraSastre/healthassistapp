import React from "react";
import { Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/usersActions";
import { FlexSpace } from "../../../styles";
import {
  BasicCheckbox,
  CustomNotification,
  SubmitButton,
} from "./../../FormComponents";
import { TasksSettingsWrapper } from "./styles";

const FormNotification = ({ profile }) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = async (data) => {
    setLoading(true);
    delete profile.password;
    const response = await dispatch(updateUser({ ...profile, ...data }));
    response && setLoading(false);
  };

  useEffect(() => {
    if (profile && profile.notifications) {
      profile.notifications = profile.notifications.map((notification) => ({
        ...notification,
        time: moment(notification.time),
      }));
      form.setFieldsValue({ notifications: profile.notifications, ...profile });
    }
  }, [form, profile]);

  return (
    <TasksSettingsWrapper>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <FlexSpace>
          <BasicCheckbox
            name="pushNotifications"
            text="Notificación push"
          ></BasicCheckbox>
          <BasicCheckbox
            name="mailNotifications"
            text="Notificación por correo"
          ></BasicCheckbox>
          <BasicCheckbox
            name="webNotifications"
            text="Notificación web"
          ></BasicCheckbox>
        </FlexSpace>
        <CustomNotification></CustomNotification>
        <SubmitButton text="GUARDAR CAMBIOS" loading={loading} />
      </Form>
    </TasksSettingsWrapper>
  );
};

export default FormNotification;
