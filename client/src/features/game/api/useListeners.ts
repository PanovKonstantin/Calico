import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  gameStateUpdated,
  roomIdSet,
  roommatesUpdated,
  socketConnected,
  viewedSocketChanged,
} from "../reducer/actions";
import socket from "./socket";

export default function useSocketListeners() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      dispatch(socketConnected(socket.id));
      dispatch(viewedSocketChanged(socket.id));
    });
    socket.on("room", (id) => {
      dispatch(roomIdSet(id));
    });
    socket.on("state", (data) => {
      dispatch(gameStateUpdated(data));
    });
    socket.on("roommates", (data) => {
      dispatch(roommatesUpdated(data));
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch]);
}
