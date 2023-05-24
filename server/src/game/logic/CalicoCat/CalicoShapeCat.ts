import CalicoCell from '../CalicoCell/CalicoCell';
import FabricCell from '../CalicoCell/FabricCell';
import { Pattern } from '../CalicoTile/FabricTile/FabricTile';
import Coord, {
  Rotation,
} from '../CubeCoordinate/CubeCoordinate';
import { IncorrectCatShape } from '../exceptions';
import { CalicoSingleCatState } from '../types';
import { every } from '../utils';
import CalicoCat, { CatLevel } from './CalicoCat';

export class CalicoShapeCat extends CalicoCat {
  public clone(): CalicoShapeCat {
    return new CalicoShapeCat(
      this.level,
      this.points,
      this.name,
      Object.values(this.shape).map((c) => c.coord()),
    );
  }

  private shape: { [key: string]: CalicoCell };
  constructor(
    level: CatLevel,
    points: number,
    name: string,
    shape: Array<Coord>,
  ) {
    if (shape.length === 0) throw new IncorrectCatShape();
    super(level, points, name);
    this.shape = {};
    shape.forEach(
      (c) => (this.shape[c.key] = new FabricCell(c)),
    );
  }

  public doesMatch(coords: Coord[], pattern: Pattern) {
    return (
      this.isPatternCorrect(pattern) &&
      this.isSizeCorrect(coords) &&
      this.isIspmorphicSubgroup(coords)
    );
  }

  private isPatternCorrect(pattern) {
    return this.patterns.includes(pattern);
  }

  private isSizeCorrect(coords) {
    return (
      coords.length >= Object.values(this.shape).length
    );
  }

  private isIspmorphicSubgroup(group: Coord[]): boolean {
    return this.getRotations(
      Object.values(this.shape).map((c) => c.coord()),
    ).some((rotation) =>
      group.some((anchor) =>
        this.isSubgroup(
          this.offset(rotation, anchor),
          group,
        ),
      ),
    );
  }

  private getRotations(group: Coord[]) {
    return every(Rotation).map((r) =>
      this.rotate(group, r),
    );
  }

  private offset(group: Coord[], anchor: Coord) {
    return group.map((c) => c.plus(anchor));
  }

  private rotate(group: Coord[], rotation: Rotation) {
    return group.map((c) => c.rotate(rotation));
  }

  private isSubgroup(subgroup: Coord[], group: Coord[]) {
    return subgroup.every((shapeCoord) =>
      this.isElementOf(shapeCoord, group),
    );
  }

  private isElementOf(searched: Coord, group: Coord[]) {
    return group.some((coord) => coord.isEqual(searched));
  }

  state(): CalicoSingleCatState {
    const shape = {};
    Object.values(this.shape).forEach(
      (c) => (shape[c.key()] = c.state()),
    );
    return {
      level: this.level,
      name: this.name,
      points: this.points,
      patterns: this.patterns,
      shape,
    };
  }
}
