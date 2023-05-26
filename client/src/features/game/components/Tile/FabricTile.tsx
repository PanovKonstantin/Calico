import React from "react";
import styled from "styled-components";
import TileType, {
  Colors,
  Patterns,
} from "../../types/tile";
import Tile from "./Tile";
import pattern1 from "../../../../assets/game/tilePatterns/pattern1.svg";
import pattern2 from "../../../../assets/game/tilePatterns/pattern2.svg";
import pattern3 from "../../../../assets/game/tilePatterns/pattern3.svg";
import pattern4 from "../../../../assets/game/tilePatterns/pattern4.svg";
import pattern5 from "../../../../assets/game/tilePatterns/pattern5.svg";
import pattern6 from "../../../../assets/game/tilePatterns/pattern6.svg";

type Props = {
  tile: Partial<TileType>;
  size?: number;
};
const Fabric = styled.div<{
  color: string;
  pattern: string;
}>`
  background: url(${[(props) => props.pattern]}),
    ${(props) => (props.color ? props.color : "#e4e4e4")};
  background-size: 25%;
  background-repeat: repeat;
  ${(props) =>
    props.color ? "background-blend-mode: soft-light;" : ""}
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FabricTile = ({ tile, size }: Props) => {
  const colors = {
    [Colors.Blue]: "#303e92",
    [Colors.LightBlue]: "#6ed1d8",
    [Colors.Pink]: "#d362d7",
    [Colors.Green]: "#a4d362",
    [Colors.Purple]: "#7f49a0",
    [Colors.Yellow]: "#ffc84c",
  };

  const patterns = {
    [Patterns.First]: pattern1,
    [Patterns.Second]: pattern2,
    [Patterns.Third]: pattern3,
    [Patterns.Forth]: pattern4,
    [Patterns.Fifth]: pattern5,
    [Patterns.Sixth]: pattern6,
  };

  return (
    <Tile size={size}>
      <Fabric
        color={tile.color ? colors[tile.color] : ""}
        pattern={tile.pattern ? patterns[tile.pattern] : ""}
      />
    </Tile>
  );
};

export default FabricTile;
