import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { CellMap, CellPlacer } from "../../types/cell";
import { tileSize } from "../sizes";
export const useTileSize = (
  size: number
): [number, number, number] => {
  return [size * Math.sqrt(3), size * 2, 0];
};

export default function useCellsContainer(
  cellsSelector: (state: RootState) => CellMap,
  size: number = tileSize
): [number, number, CellPlacer] {
  const [tileWidth, tileHeight, tileMargin] =
    useTileSize(size);

  const leftPerTile = tileWidth + tileMargin;
  const topPerTile = tileHeight * 0.75 + tileMargin;

  const getLeft = ([x, y]: [number, number]) =>
    x * leftPerTile + ((1 - (y & 1)) * leftPerTile) / 2;
  const getTop = ([x, y]: [number, number]) =>
    y * topPerTile;

  const extractXY = (cells: CellMap) =>
    Object.values(cells).map(({ coord }) => coord);
  const lefts = (cells: CellMap) =>
    extractXY(cells).map(getLeft);
  const tops = (cells: CellMap) =>
    extractXY(cells).map(getTop);
  const selectMaxLeft = createSelector(
    [cellsSelector],
    (cells: CellMap) => Math.max(0, ...lefts(cells))
  );
  const selectMinLeft = createSelector(
    [cellsSelector],
    (cells: CellMap) => Math.min(0, ...lefts(cells))
  );
  const selectMaxTop = createSelector(
    [cellsSelector],
    (cells: CellMap) => Math.max(0, ...tops(cells))
  );
  const selectMinTop = createSelector(
    [cellsSelector],
    (cells: CellMap) => Math.min(0, ...tops(cells))
  );
  const maxLeft = useAppSelector(selectMaxLeft);
  const minLeft = useAppSelector(selectMinLeft);
  const maxTop = useAppSelector(selectMaxTop);
  const minTop = useAppSelector(selectMinTop);

  return [
    maxLeft - minLeft + tileWidth,
    maxTop - minTop + tileHeight,
    ([x, y]) => [
      getLeft([x, y]) - minLeft,
      getTop([x, y]) - minTop,
      tileWidth,
      tileHeight,
    ],
  ];
}

// return [
//   maxLeft - minLeft,
//   maxTop - minTop,
//   ([x, y]) => [
//     getLeft([x, y]) - minLeft / 2,
//     getTop([x, y]) - minTop / 3,
//     tileWidth,
//     tileHeight,
//   ],
// ];
