import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../store/selectors";
import { CONNECTED, DISCONNECTED } from "../../constants";
import socket from "../../utils/Socket";

const Sockets = () => {
  const profile = useSelector(getUserProfile);

  useEffect(() => {
    if (profile) {
      /* SOCKET CONNECT AND DISCONNECT */
      socket(profile._id).emit(CONNECTED, profile._id);
      /* <---- SOCKET CONNECT AND DISCONNECT ----> */
      return () => {
        socket(profile._id).emit(DISCONNECTED, profile._id);
      };
    }
  }, [profile]);

  return null;
};

export default Sockets;
