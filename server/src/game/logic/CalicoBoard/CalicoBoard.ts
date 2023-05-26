import FabricCell from '../CalicoCell/FabricCell';
import ProjectCell from '../CalicoCell/ProjectCell';
import FabricTile from '../CalicoTile/FabricTile/FabricTile';
import ProjectTile from '../CalicoTile/ProjectTile/ProjectTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import {
  FabricCellDoesNotExist,
  ProjectCellDoesNotExist,
} from '../exceptions';
import { FabricMap } from '../CalicoCell/FabricCell';
import { BoardState, ProjectMap } from '../types';

export default class CalicoBoard {
  static projectCoords = [
    new Coord(1, 1),
    new Coord(2, 2),
    new Coord(-1, 3),
  ];
  private fabricCells: FabricMap;
  private projectCells: ProjectMap;

  constructor(
    cells: FabricCell[] = [],
    private type = 'not given',
  ) {
    this.setProjectCells();
    this.setFabricCells(cells);
  }

  putFabricOn(key: string, fabric: FabricTile) {
    if (!this.fabricCells.has(key)) {
      throw new FabricCellDoesNotExist(key);
    }
    this.fabricCells.get(key).put(fabric);
  }

  placeProjectOn(key: string, project: ProjectTile) {
    if (!this.projectCells.has(key)) {
      throw new ProjectCellDoesNotExist(key);
    }
    this.projectCells.get(key).put(project);
  }

  areProjectCellsFilled() {
    return [...this.projectCells.values()].every((v) =>
      v.get(),
    );
  }

  emptyFabricCells() {
    return [...this.fabricCells.values()].filter(
      (v) => !v.get(),
    ).length;
  }

  state(): BoardState {
    const fc = {};
    const pc = {};
    this.fabricCells.forEach((v, k) => (fc[k] = v.state()));
    this.projectCells.forEach(
      (v, k) => (pc[k] = v.state()),
    );
    return {
      fabricCells: fc,
      projectCells: pc,
    };
  }

  groupByColor(): Array<Array<FabricCell>> {
    const copy = new FabricMap(this.fabricCells);
    return copy.getConnected('color');
  }

  groupByPattern(): Array<Array<FabricCell>> {
    const copy = new FabricMap(this.fabricCells);
    return copy.getConnected('pattern');
  }

  projectScore(): number {
    return Array.from(this.projectCells.values())
      .map((project) => this.getScoreForProject(project))
      .reduce((sum, curr) => sum + curr);
  }

  private getScoreForProject(cell: ProjectCell): number {
    const tiles = this.fabricCells
      .cellsAround(cell)
      .map((c) => c.get())
      .filter((c) => c);
    return cell.scoresOn(tiles);
  }

  private setProjectCells() {
    this.projectCells = new ProjectMap();
    CalicoBoard.projectCoords.forEach((c: Coord) => {
      this.projectCells.set(c.hash(), new ProjectCell(c));
    });
  }

  private setFabricCells(cells: FabricCell[]) {
    this.fabricCells = new FabricMap();
    const [width, height] = [5, 5];
    for (let r = 0; r < width; r++) {
      const offset = (r + 1) >> 1;
      for (let q = -offset; q < height - offset; q++) {
        const c = new Coord(q, r);
        if (!this.projectCells.has(c.hash())) {
          this.fabricCells.set(c.hash(), new FabricCell(c));
        }
      }
    }
    cells.forEach((cell) =>
      this.fabricCells.set(cell.key(), cell),
    );
  }
}
