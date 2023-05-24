import socket from "./socket";

export default function connectToRoom(room: string) {
  socket.emit("setRoom", room);
}
