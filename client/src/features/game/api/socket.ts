// import { env } from "process";
import { io } from "socket.io-client";
const socket = io("localhost");
export default socket;
