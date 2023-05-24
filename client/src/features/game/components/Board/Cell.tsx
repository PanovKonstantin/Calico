import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/hooks";
import * as sizes from "../sizes";
import FabricTile from "../Tile/FabricTile";
import ProjectTile from "../Tile/ProjectTile";
import { RootState } from "../../../../app/store";
import { CellMap, CellPlacer } from "../../types/cell";

type Props = {
  cellKey: string;
  size?: number;
  cellsSelector: (state: RootState) => CellMap;
  cellPlacer: CellPlacer;
};
const StyledCell = styled.div<{
  top: number;
  left: number;
}>`
  position: absolute;
  left: ${({ left }) => left}${sizes.tileUnit};
  top: ${({ top }) => top}${sizes.tileUnit};
`;

const Cell = ({
  cellKey,
  size,
  cellsSelector,
  cellPlacer,
}: Props) => {
  const selectCell = createSelector(
    [cellsSelector],
    (cells) => cells[cellKey]
  );
  const cell = useAppSelector(selectCell);
  const [left, top] = cellPlacer(cell.coord);
  return (
    <StyledCell top={top} left={left}>
      {cell.type === "fabric" ? (
        <FabricTile
          size={size}
          tile={cell.tile ? cell.tile : {}}
        />
      ) : (
        <ProjectTile
          size={size}
          tile={cell.tile ? cell.tile : undefined}
        />
      )}
    </StyledCell>
  );
};

export default Cell;
