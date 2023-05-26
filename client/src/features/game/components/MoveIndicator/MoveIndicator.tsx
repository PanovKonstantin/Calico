import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import { selectGameStatus } from "../../reducer/selectors";

const MoveIndicator = () => {
  const status = useAppSelector(selectGameStatus);
  const Move = () => {
    switch (status) {
      case "placing_projects":
        return <>Place projects.</>;
      case "placing_tile":
        return <>Your turn, place a tile on the board.</>;
      case "choosing_from_market":
        return (
          <>
            Choose a tile from market to put in your hand.
          </>
        );
      case "finished":
        return <>Game is finished!</>;
      default:
        return <></>;
    }
  };
  return (
    <Container>
      <Move />
    </Container>
  );
};

const Container = styled.div`
  font-size: 1em;
  font-family: Cambria, Cochin, Georgia, Times,
    "Times New Roman", serif;
`;

export default MoveIndicator;
