import React from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import {
  handListEntered,
  handListLeft,
} from "../../reducer/actions";
import {
  selectGameStatus,
  selectHand,
  selectSelectedMarketTile,
} from "../../reducer/selectors";
import HandTile from "./HandTile";

type Props = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const StyledHandList = styled.div<{
  isMarketTileSelected: boolean;
  isOn: boolean;
}>`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.isOn ? "#c1c1c1" : "gray"};
  border-radius: 10px;
  border-style: dotted;
  border-color: ${(props) =>
    props.isMarketTileSelected ? "white" : "gray"};
  :hover {
    ${({ isMarketTileSelected }) =>
      isMarketTileSelected
        ? "border-color: lightgreen;"
        : ""}
  }
`;
const HandList = (props: Props) => {
  const dispatch = useAppDispatch();
  const hand = useAppSelector(selectHand);
  const status = useAppSelector(selectGameStatus);
  const marketTile = useAppSelector(
    selectSelectedMarketTile
  );

  return (
    <Container>
      Your hand:
      <StyledHandList
        isOn={status === "placing_tile"}
        isMarketTileSelected={marketTile !== undefined}
        onPointerEnter={() => dispatch(handListEntered())}
        onPointerLeave={() => dispatch(handListLeft())}
      >
        {hand.map((tile, i) =>
          tile ? (
            <HandTile tile={tile} i={i} key={i}></HandTile>
          ) : null
        )}
      </StyledHandList>
    </Container>
  );
};

export default HandList;
