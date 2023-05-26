import FabricTile from '../CalicoTile/FabricTile/FabricTile';
import ProjectTile from '../CalicoTile/ProjectTile/ProjectTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { CellIsTaken } from '../exceptions';
import { CellState } from '../types';
import CalicoCell from './CalicoCell';

export default class ProjectCell extends CalicoCell {
  constructor(
    coords: Coord,
    private projectTile: ProjectTile | null = null,
  ) {
    super(coords);
  }

  put(tile: ProjectTile) {
    if (this.projectTile !== null) {
      throw new CellIsTaken(this);
    }
    this.projectTile = tile;
  }

  get(): ProjectTile | null {
    return this.projectTile;
  }

  scoresOn(tiles: Array<FabricTile>): number {
    if (!this.projectTile) return 0;
    const colors = tiles.map((t) => t.color);
    const patterns = tiles.map((t) => t.pattern);
    return this.projectTile.scoresOn(colors, patterns);
  }

  state(): CellState {
    return {
      ...super.state(),
      type: 'project',
      tile: this.projectTile,
    };
  }
}
