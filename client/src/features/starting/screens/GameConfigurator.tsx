import React from "react";
import styled, { css } from "styled-components";
import socket from "../../game/api/socket";
import { startGame } from "../api/startGame";

type Props = {};

type GameConfig = {
  setup: "beginner" | "standard";
};
const GameConfigurator = (props: Props) => {
  const [config, setConfig] = React.useState<GameConfig>({
    setup: "standard",
  });
  const setStandard = () => {
    config.setup = "standard";
    socket.emit("setGameConfig", config);
  };
  const setBeginner = () => {
    config.setup = "beginner";
    socket.emit("setGameConfig", config);
  };

  React.useEffect(() => {
    const event = "gameConfig";
    socket.on(event, (config) => setConfig(config));
    return () => {
      socket.off(event);
    };
  }, []);

  return (
    <Container>
      <Row>
        <Button
          isSet={config.setup === "standard"}
          onClick={setStandard}
        >
          Standard Setup
        </Button>
        <Button
          isSet={config.setup === "beginner"}
          onClick={setBeginner}
        >
          Beginner Setup
        </Button>
      </Row>
      <Row>
        <button onClick={startGame}>Start Game</button>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.button<{ isSet: boolean }>`
  border-color: grey;
  border-radius: 10pt;
  border-style: solid;
  min-width: fit-content;
  padding: 5%;
  ${({ isSet }) =>
    isSet
      ? css`
          background-color: #b8dfb8;
        `
      : css`
          background-color: transparent;
        `}
`;
export default GameConfigurator;
