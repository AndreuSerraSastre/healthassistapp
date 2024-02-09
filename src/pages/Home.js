import React from "react";
import { Suspense } from "react";
import { Loading } from "../layout/utils/AppLoading";
import { HomeWrapper } from "./styles";
import Chat from "../components/Chats/Chat";

const Home = () => {
  return (
    <HomeWrapper>
      <Suspense fallback={<Loading centered />}>
        <Chat></Chat>
      </Suspense>
    </HomeWrapper>
  );
};

export default Home;
