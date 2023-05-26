import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import GameScreen from "./features/game/screens/GameScreen";
import Welcome from "./features/starting/screens/Welcome";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "game",
        element: <GameScreen />,
      },
    ],
  },
]);

export default router;
