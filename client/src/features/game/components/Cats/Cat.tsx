import React from "react";
import catLogo from "../../../../assets/game/cat_logo.svg";
import styled from "styled-components";
import FabricTile from "../Tile/FabricTile";
import { tileSize } from "../sizes";
import CatShape from "./CatShape";
import CatType from "../../types/cat";

type Props = {
  cat: CatType;
};

const Cat = ({ cat }: Props) => {
  return (
    <Container>
      <UpperPart>
        <InfoColumn>
          <NameRow>
            <CatLogo src={catLogo} />
            <div>{cat.name}</div>
          </NameRow>
          <div>Level: {cat.level + 1}</div>
          <div>Points: {cat.points}</div>
        </InfoColumn>
        <FabricColumn>
          {cat.patterns.map((p, i) => (
            <FabricTile
              tile={{ pattern: p }}
              size={tileSize * 0.5}
              key={i}
            />
          ))}
        </FabricColumn>
      </UpperPart>
      <div>
        {cat.size ? "Group size: " + cat.size + "+" : null}
      </div>
      <div>{cat.shape ? <CatShape cat={cat} /> : null}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
`;

const InfoColumn = styled.div`
  padding-right: 1vw;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
`;

const FabricColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

const CatLogo = styled.img`
  width: 2vw;
  alt: "";
`;

const NameRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const UpperPart = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export default Cat;
