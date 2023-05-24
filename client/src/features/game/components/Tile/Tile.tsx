import React from "react";
import styled from "styled-components";
import * as sizes from "../sizes";

const Hexagon = styled.div<{ size: number }>`
  padding: 0;
  aspect-ratio: ${Math.sqrt(3)} / 2;
  height: ${({ size }) => 2 * size}${sizes.tileUnit};
  clip-path: polygon(
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%,
    50% 0%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Outer = styled(Hexagon)`
  background-color: lightgray;
  :hover {
    background-color: darkgray;
  }
`;

type Props = {
  children: React.ReactNode;
  size?: number;
};
const Tile = ({
  children,
  size = sizes.tileSize,
}: Props) => {
  return (
    <Outer size={size}>
      <Hexagon size={size * 0.9}>{children}</Hexagon>
    </Outer>
  );
};

export default Tile;
