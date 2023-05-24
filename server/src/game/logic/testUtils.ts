import CalicoBoard from './CalicoBoard/CalicoBoard';
import FabricCell from './CalicoCell/FabricCell';
import CalicoGame from './CalicoGame/CalicoGame';
import FabricTile, {
  Color,
  Colors,
  Pattern,
  Patterns,
} from './CalicoTile/FabricTile/FabricTile';
import ProjectTile from './CalicoTile/ProjectTile/ProjectTile';
import Coord from './CubeCoordinate/CubeCoordinate';
import { BoardState, CellState } from './types';

export function mockRandom(result: number) {
  jest.spyOn(global.Math, 'random').mockReturnValue(result);
}
export function unmockRandom() {
  jest.spyOn(global.Math, 'random').mockRestore();
}

export function withMockedMathRandom(
  callback: (random: number) => void,
) {
  const randomNumber = Math.random();
  jest
    .spyOn(global.Math, 'random')
    .mockReturnValue(randomNumber);
  callback(randomNumber);
  jest.spyOn(global.Math, 'random').mockRestore();
}
export function getGameCell(
  game: CalicoGame,
  q: number,
  r: number,
  user = 'user',
): CellState {
  return getCell(game.getUserStates()[user].board, q, r);
}

export function getBoardCell(
  board: { state: () => any },
  q: any,
  r: any,
) {
  return getCell(board.state(), q, r);
}

function getCell(
  cells: BoardState,
  q: number,
  r: number,
): CellState {
  const key = new Coord(q, r).hash();
  const fabric = cells.fabricCells[key];
  if (fabric) {
    return fabric;
  }
  return cells.projectCells[key];
}

export function setTilesAround(
  board: CalicoBoard,
  tiles: [[Coord, Array<[Color, Pattern]>]],
) {
  tiles.forEach(([coord, props]) => {
    coord.neighbors().forEach((neighbor, id) => {
      board.putFabricOn(
        neighbor.key,
        new FabricTile(...props[id]),
      );
    });
  });
}

export function setColors(
  board: CalicoBoard,
  cells: Array<[Coord, Color]>,
): Array<FabricCell> {
  const expected = [];
  cells.forEach(([coord, color]) => {
    const f1 = new FabricTile(color);
    board.putFabricOn(coord.key, f1);
    expected.push(new FabricCell(coord, f1));
  });
  return expected;
}

export function setPatterns(
  board,
  cells: Array<[Coord, Pattern]>,
): Array<FabricCell> {
  const expected = [];
  cells.forEach(([coord, pattern]) => {
    const f1 = new FabricTile('Blue', pattern);
    board.putFabricOn(coord.key, f1);
    expected.push(new FabricCell(coord, f1));
  });
  return expected;
}

export function createBoard(
  cells: {
    coord: Coord;
    color?: Color;
    pattern?: Pattern;
  }[],
  proj: ProjectTile[] = [],
  preset: FabricCell[] = [],
) {
  const board = new CalicoBoard([
    ...preset,
    ...cells.map(
      ({
        coord,
        color = Colors.Blue,
        pattern = Patterns.First,
      }) =>
        new FabricCell(
          coord,
          new FabricTile(color, pattern),
        ),
    ),
  ]);
  proj.forEach((p, i) =>
    board.placeProjectOn(
      CalicoBoard.projectCoords[i].key,
      p,
    ),
  );
  return board;
}
