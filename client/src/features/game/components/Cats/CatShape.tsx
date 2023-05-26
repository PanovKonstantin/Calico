import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../../app/hooks";
import { joinCellKeys } from "../../reducer/selectors";
import Cell from "../Board/Cell";
import CellsContainer from "../CellsContainer/CellsContainer";
import useCellsContainer from "../CellsContainer/useCellsContainer";
import { tileSize } from "../sizes";
import CatType from "../../types/cat";
import { RootState } from "../../../../app/store";

type Props = {
  cat: CatType;
};

const size = tileSize * 0.5;
const CatShape = ({ cat }: Props) => {
  const cellsSelector = (state: RootState) => cat.shape;
  const selectJoinedKeys = createSelector(
    [cellsSelector],
    joinCellKeys
  );
  const [width, height, cellPlacer] = useCellsContainer(
    cellsSelector,
    size
  );
  const cells = useAppSelector(selectJoinedKeys);

  return (
    <CellsContainer width={width} height={height}>
      {cells.split(".").map((key) => (
        <Cell
          size={size}
          key={key}
          cellKey={key}
          cellsSelector={cellsSelector}
          cellPlacer={cellPlacer}
        />
      ))}
    </CellsContainer>
  );
};

export default CatShape;
