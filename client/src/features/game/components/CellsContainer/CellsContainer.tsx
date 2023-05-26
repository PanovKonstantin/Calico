import React from "react";
import styled from "styled-components";
import { tileUnit } from "../sizes";

type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
};

const CellsContainer = (props: Props) => {
  return (
    <StyledCellsContainer
      height={props.height}
      width={props.width}
    >
      {props.children}
    </StyledCellsContainer>
  );
};

const StyledCellsContainer = styled.div<{
  width: number;
  height: number;
}>`
  position: relative;
  width: ${(props) => props.width}${tileUnit};
  height: ${(props) => props.height }${tileUnit};
  /* aspect-ratio: ${Math.sqrt(3)} / 1; */
`;
export default CellsContainer;
