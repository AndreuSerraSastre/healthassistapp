import io from "socket.io-client";
import { BASE_URL } from "../connection/ConnectionHandler";

const socket = (_id) =>
  io(BASE_URL, {
    auth: {
      _id: _id,
    },
  });

export default socket;
