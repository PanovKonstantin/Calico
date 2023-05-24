import socket from "./socket";

export const placeProject = (
  tileId: number,
  cellKey: string
) => {
  socket.emit("placeProject", { tileId, cellKey });
};
