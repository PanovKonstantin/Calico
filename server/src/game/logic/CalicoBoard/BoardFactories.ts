import FabricCell from '../CalicoCell/FabricCell';
import FabricTile, {
  Color,
  Pattern,
} from '../CalicoTile/FabricTile/FabricTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { popAt, popAtRandom } from '../utils';
import CalicoBoard from './CalicoBoard';
export interface BoardPool {
  get(user: string): CalicoBoard;
}

export class DefaultBoardPool implements BoardPool {
  private pool: CalicoBoard[];
  constructor() {
    this.pool = [
      createBlueBoard(),
      createGreenBoard(),
      createPurpleBoard(),
      createYellowBoard(),
    ];
  }
  get(): CalicoBoard {
    return popAtRandom(this.pool);
  }
}

export class CustomBoardPool implements BoardPool {
  constructor(private pool: CalicoBoard[]) {}
  get(): CalicoBoard {
    return popAt(this.pool, 0);
  }
}

const cell = (
  xy: [number, number],
  color: Color,
  pattern: Pattern,
) =>
  new FabricCell(
    Coord.fromOffset(...xy),
    new FabricTile(color, pattern),
  );
export function createBlueBoard() {
  return new CalicoBoard(
    [
      cell([-1, -1], 'Pink', 'Third'),
      cell([0, -1], 'Yellow', 'First'),
      cell([1, -1], 'LightBlue', 'Third'),
      cell([2, -1], 'Pink', 'Second'),
      cell([3, -1], 'Purple', 'Forth'),
      cell([4, -1], 'Yellow', 'Fifth'),
      cell([5, -1], 'Green', 'First'),
      cell([-1, 0], 'Green', 'Fifth'),
      cell([5, 0], 'Blue', 'Sixth'),
      cell([-1, 1], 'Blue', 'Forth'),
      cell([5, 1], 'Purple', 'Third'),
      cell([-1, 2], 'LightBlue', 'Second'),
      cell([5, 2], 'Yellow', 'Second'),
      cell([-1, 3], 'Purple', 'First'),
      cell([5, 3], 'Green', 'Forth'),
      cell([-1, 4], 'Yellow', 'Sixth'),
      cell([5, 4], 'Blue', 'Fifth'),
      cell([-1, 5], 'Purple', 'Fifth'),
      cell([0, 5], 'LightBlue', 'Forth'),
      cell([1, 5], 'Pink', 'Fifth'),
      cell([2, 5], 'Blue', 'Second'),
      cell([3, 5], 'Green', 'Third'),
      cell([4, 5], 'Pink', 'Sixth'),
      cell([5, 5], 'LightBlue', 'First'),
    ],
    'blue',
  );
}

export function createGreenBoard() {
  return new CalicoBoard(
    [
      cell([-1, -1], 'Blue', 'Second'),
      cell([0, -1], 'Yellow', 'Third'),
      cell([1, -1], 'Green', 'Second'),
      cell([2, -1], 'Blue', 'First'),
      cell([3, -1], 'Purple', 'Forth'),
      cell([4, -1], 'Yellow', 'Sixth'),
      cell([5, -1], 'LightBlue', 'Third'),
      cell([-1, 0], 'Purple', 'Sixth'),
      cell([5, 0], 'Pink', 'Fifth'),
      cell([-1, 1], 'Pink', 'Forth'),
      cell([5, 1], 'Purple', 'Second'),
      cell([-1, 2], 'LightBlue', 'First'),
      cell([5, 2], 'Yellow', 'First'),
      cell([-1, 3], 'Yellow', 'Fifth'),
      cell([5, 3], 'LightBlue', 'Forth'),
      cell([-1, 4], 'Purple', 'Third'),
      cell([5, 4], 'Pink', 'Sixth'),
      cell([-1, 5], 'Green', 'First'),
      cell([0, 5], 'Blue', 'Sixth'),
      cell([1, 5], 'Green', 'Forth'),
      cell([2, 5], 'Pink', 'First'),
      cell([3, 5], 'LightBlue', 'Second'),
      cell([4, 5], 'Blue', 'Fifth'),
      cell([5, 5], 'Green', 'Third'),
    ],
    'green',
  );
}

export function createYellowBoard() {
  return new CalicoBoard(
    [
      cell([-1, -1], 'Green', 'Forth'),
      cell([0, -1], 'Blue', 'Fifth'),
      cell([1, -1], 'Yellow', 'First'),
      cell([2, -1], 'Purple', 'Sixth'),
      cell([3, -1], 'Blue', 'Third'),
      cell([4, -1], 'Green', 'Second'),
      cell([5, -1], 'Pink', 'Forth'),
      cell([-1, 0], 'Pink', 'Second'),
      cell([5, 0], 'LightBlue', 'Fifth'),
      cell([-1, 1], 'Purple', 'Third'),
      cell([5, 1], 'Blue', 'First'),
      cell([-1, 2], 'Yellow', 'Sixth'),
      cell([5, 2], 'Green', 'Sixth'),
      cell([-1, 3], 'Green', 'Fifth'),
      cell([5, 3], 'Pink', 'Third'),
      cell([-1, 4], 'Blue', 'Forth'),
      cell([5, 4], 'LightBlue', 'Second'),
      cell([-1, 5], 'LightBlue', 'Third'),
      cell([0, 5], 'Purple', 'Second'),
      cell([1, 5], 'Yellow', 'Third'),
      cell([2, 5], 'LightBlue', 'Sixth'),
      cell([3, 5], 'Pink', 'First'),
      cell([4, 5], 'Purple', 'Fifth'),
      cell([5, 5], 'Yellow', 'Forth'),
    ],
    'yellow',
  );
}

export function createPurpleBoard() {
  return new CalicoBoard(
    [
      cell([-1, -1], 'Yellow', 'Fifth'),
      cell([0, -1], 'Pink', 'Sixth'),
      cell([1, -1], 'Purple', 'Fifth'),
      cell([2, -1], 'Yellow', 'Second'),
      cell([3, -1], 'LightBlue', 'First'),
      cell([4, -1], 'Pink', 'Forth'),
      cell([5, -1], 'Green', 'Sixth'),
      cell([-1, 0], 'LightBlue', 'Forth'),
      cell([5, 0], 'Blue', 'Third'),
      cell([-1, 1], 'Blue', 'First'),
      cell([5, 1], 'LightBlue', 'Fifth'),
      cell([-1, 2], 'Green', 'Second'),
      cell([5, 2], 'Pink', 'Second'),
      cell([-1, 3], 'Pink', 'Third'),
      cell([5, 3], 'Green', 'First'),
      cell([-1, 4], 'LightBlue', 'Sixth'),
      cell([5, 4], 'Blue', 'Forth'),
      cell([-1, 5], 'Purple', 'Second'),
      cell([0, 5], 'Yellow', 'Forth'),
      cell([1, 5], 'Purple', 'First'),
      cell([2, 5], 'Blue', 'Second'),
      cell([3, 5], 'Green', 'Fifth'),
      cell([4, 5], 'Yellow', 'Third'),
      cell([5, 5], 'Purple', 'Sixth'),
    ],
    'purple',
  );
}
