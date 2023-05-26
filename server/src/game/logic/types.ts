import CalicoCat, { CatLevel } from './CalicoCat/CalicoCat';
import ProjectCell from './CalicoCell/ProjectCell';
import FabricTile, {
  Pattern,
} from './CalicoTile/FabricTile/FabricTile';
import ProjectTile from './CalicoTile/ProjectTile/ProjectTile';

export type GameStatus =
  | 'not_started'
  | 'placing_projects'
  | 'placing_tile'
  | 'choosing_from_market'
  | 'finished';
export type OffsetCoordsinates = [number, number];
export type UserState = {
  status: GameStatus;
  board: BoardState;
  projects: Array<ProjectTile> | null;
  hand: FabricTile[];
  score: GameScore;
};
export type GameStateType = {
  userStates: { [user: string]: UserState };
  cats: CalicoSingleCatState[];
  market: FabricTile[];
};
export type GameScore = {
  cats: number;
  projects: number;
  colors: number;
  total: number;
};

export type BoardState = {
  fabricCells: { [key: string]: CellState };
  projectCells: { [key: string]: CellState };
};
export type CellState =
  | {
      type: 'fabric';
      key: string;
      coord: OffsetCoordsinates;
      tile: FabricTile;
    }
  | {
      type: 'project';
      key: string;
      coord: OffsetCoordsinates;
      tile: ProjectTile;
    };

export type TileState = {
  color: number;
  pattern: number;
};

export type CalicoBankState = {
  unused: number;
  used: number;
  available: Array<TileState>;
};

export type CalicoCatState = {
  easy: CalicoCat;
  medium: CalicoCat;
  hard: CalicoCat;
} | null;

export type CalicoSingleCatState = {
  level: CatLevel;
  points: number;
  patterns: Pattern[];
  name: string;
} & (
  | { shape: { [key: string]: CellState } }
  | { size: number }
);

export class ProjectMap extends Map<string, ProjectCell> {
  constructor(...args) {
    super(...args);
  }
}
