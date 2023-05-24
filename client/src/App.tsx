import "./App.css";
import useSocketListeners from "./features/game/api/useListeners";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectGameStatus } from "./features/game/reducer/selectors";
import { useEffect } from "react";

function App() {
  useSocketListeners();
  const navigate = useNavigate();
  const status = useAppSelector(selectGameStatus);
  useEffect(() => {
    switch (status) {
      case "choosing_from_market":
      case "finished":
      case "placing_projects":
      case "placing_tile":
        navigate("/game");
        break;
      default:
        navigate("/");
        break;
    }
  }, [navigate, status]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
