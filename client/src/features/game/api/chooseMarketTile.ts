import socket from "./socket";

export const chooseMarketTile = (tileId: number) => {
  socket.emit("chooseMarketTile", { tileId });
};
