import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { getUserProfile } from "../store/selectors";
import { ProfileWrapper } from "./styles";
import { lazy, Suspense } from "react";
import { Loading } from "../layout/utils/AppLoading";
import PushNotification from "../components/Profile/PushNotification";

const BasicInfoSettings = lazy(() =>
  import("../components/Profile/BasicInfoSettings")
);

const { TabPane } = Tabs;

const Profile = () => {
  const profile = useSelector(getUserProfile);

  if (!profile) {
    return null;
  }

  return (
    <ProfileWrapper>
      <Tabs defaultActiveKey="basic-info-pane">
        <TabPane tab="Información Básica" key="basic-info-pane">
          <Suspense fallback={<Loading centered />}>
            <BasicInfoSettings profile={profile} />
          </Suspense>
        </TabPane>
        <TabPane tab="Notificaciones" key="notifications-pane">
          <PushNotification profile={profile}></PushNotification>
        </TabPane>
      </Tabs>
    </ProfileWrapper>
  );
};

export default Profile;
