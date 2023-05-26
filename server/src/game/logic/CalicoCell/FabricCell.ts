import FabricTile from '../CalicoTile/FabricTile/FabricTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { CellIsTaken } from '../exceptions';
import { CellState } from '../types';
import CalicoCell from './CalicoCell';

export default class FabricCell extends CalicoCell {
  constructor(
    coords: Coord,
    private fabricTile: FabricTile | null = null,
  ) {
    super(coords);
  }

  put(tile: FabricTile) {
    if (this.fabricTile !== null) {
      throw new CellIsTaken(this);
    }
    this.fabricTile = tile;
  }

  get(): FabricTile | null {
    return this.fabricTile;
  }

  state(): CellState {
    return {
      ...super.state(),
      type: 'fabric',
      tile: this.fabricTile,
    };
  }
}

export class FabricMap extends Map<string, FabricCell> {
  cellsAround(cell: CalicoCell) {
    return cell
      .coord()
      .neighbors()
      .filter(({ key }) => this.get(key))
      .map(({ key }) => this.get(key));
  }

  getConnected(
    by: 'color' | 'pattern',
  ): Array<Array<FabricCell>> {
    const groups: Array<Array<FabricCell>> = [];
    this.forEach((c) => {
      if (!c.get()) this.delete(c.key());
    });
    this.forEach((cell) => {
      groups.push(this.popGroup(cell, by));
    });
    return groups;
  }

  private popGroup(
    cell: FabricCell,
    by: 'color' | 'pattern',
    group: FabricCell[] = [],
  ) {
    if (!this.has(cell.key())) return;
    this.delete(cell.key());
    group.push(cell);
    this.cellsAround(cell)
      .filter((c) => this.isEdge(c, cell, by))
      .forEach((c) => this.popGroup(c, by, group));
    return group;
  }

  private isEdge(c1, c2, by) {
    return c1.get()[by] === c2.get()[by];
  }
}
