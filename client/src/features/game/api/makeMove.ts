import socket from "./socket";

export const makeMove = (
  tileId: number,
  cellKey: string
) => {
  socket.emit("makeMove", { tileId, cellKey });
};
