import FabricTileType, { ProjectTileType } from "./tile";

type BaseCellType = {
  key: string;
  coord: [number, number];
  isSelected: boolean;
};
type ProjectCellType = {
  type: "project";
  tile: ProjectTileType;
};
type FabricCellType = {
  type: "fabric";
  tile: FabricTileType;
};
type CellType = BaseCellType &
  (ProjectCellType | FabricCellType);
export type CellMap = {
  [key: string]: CellType;
};
export default CellType;
export type CellPlacer = ([x, y]: [number, number]) => [
  number,
  number,
  number,
  number
];
