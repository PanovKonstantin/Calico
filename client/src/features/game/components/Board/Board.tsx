import React from "react";
import Cell from "./Cell";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/hooks";
import { fabricCellSelected } from "../../reducer/actions";

import CellsContainer from "../CellsContainer/CellsContainer";
import {
  selectJoinedFabric,
  selectBoard,
} from "../../reducer/selectors";
import useCellsContainer, {
  useTileSize,
} from "../CellsContainer/useCellsContainer";
import ProjectCells from "./ProjectCells";
import styled from "styled-components";
import { tileSize } from "../sizes";
import { CellPlacer } from "../../types/cell";

const Container = styled.div`
  overflow: hidden;
  background-color: lightgrey;
  border-color: gray;
  border-width: 4;
  border-style: solid;
  border-radius: 5%;
  width: fit-content;
`;

const Board = () => {
  const dispatch = useAppDispatch();
  const fabricKeys = useAppSelector(selectJoinedFabric);
  const [width, height, cellPlacer] = useCellsContainer(
    selectBoard,
    tileSize
  );

  const [tileWidth, tileHeight] =
    useTileSize(tileSize);
  const boardCellPlacer: CellPlacer = ([x, y]) => {
    const [left, top, width, height] = cellPlacer([x, y]);
    return [
      left - width / 2,
      top - height / 2,
      width,
      height,
    ];
  };

  return (
    <Container>
      <CellsContainer
        width={width - tileWidth}
        height={height - tileHeight}
      >
        {fabricKeys
          ? fabricKeys.split(".").map((key) => (
              <div
                onMouseOver={() =>
                  dispatch(fabricCellSelected(key))
                }
                onMouseLeave={() =>
                  dispatch(fabricCellSelected(false))
                }
                key={key}
              >
                <Cell
                  cellKey={key}
                  cellsSelector={selectBoard}
                  cellPlacer={boardCellPlacer}
                />
              </div>
            ))
          : null}
        <ProjectCells cellPlacer={boardCellPlacer} />
      </CellsContainer>
    </Container>
  );
};

export default Board;
