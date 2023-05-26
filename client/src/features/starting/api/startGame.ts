import socket from "../../game/api/socket";
export type GameConfig = {
  setup: "beginner" | "standard";
};

export const startGame = () => {
  socket.emit("startGame");
};
