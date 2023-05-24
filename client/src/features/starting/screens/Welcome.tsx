import styled from "styled-components";
import { useAppSelector } from "../../../app/hooks";
import CopyButton from "../../../components/CopyButton";
import EnterRoom from "../../game/components/Roommates/EnterRoom";
import Roommates from "../../game/components/Roommates/Roommates";
import { selectRoomId } from "../../game/reducer/selectors";
import GameConfigurator from "./GameConfigurator";

const Welcome = () => {
  const roomId = useAppSelector(selectRoomId);
  return (
    <Container>
      <h1>Welcome to Calico.io</h1>
      <Row>
        Your room id: {roomId}
        {roomId && <CopyButton textToCopy={roomId} />}
      </Row>

      <LimitedWidth>
        <Roommates />
      </LimitedWidth>
      <EnterRoom />
      <GameConfigurator />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LimitedWidth = styled.div`
  width: 40%;
`;

const Row = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Welcome;
