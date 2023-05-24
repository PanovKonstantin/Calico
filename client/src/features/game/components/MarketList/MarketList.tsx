import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import {
  selectGameStatus,
  selectMarket,
} from "../../reducer/selectors";
import MarketTile from "./MarketTile";

type Props = {};

const MarketList = (props: Props) => {
  const market = useAppSelector(selectMarket);
  const status = useAppSelector(selectGameStatus);
  return (
    <Container>
      Market:
      <StyledMarketList isOn={status === "choosing_from_market"}>
        {market.map((tile, i) => (
          <MarketTile key={i} tile={tile} i={i} />
        ))}
      </StyledMarketList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMarketList = styled.div<{ isOn: boolean }>`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  background-color: ${props => props.isOn ? "#c1c1c1" :"gray" };
  border-radius: 10px;
  border-style: dotted;
  border-color: gray;
`;

export default MarketList;
