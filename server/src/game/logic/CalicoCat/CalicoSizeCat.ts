import { Pattern } from '../CalicoTile/FabricTile/FabricTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { CalicoSingleCatState } from '../types';
import CalicoCat, { CatLevel } from './CalicoCat';

export class CalicoSizeCat extends CalicoCat {
  constructor(
    level: CatLevel,
    points: number,
    name: string,
    private size: number,
  ) {
    super(level, points, name);
  }

  public doesMatch(
    group: Coord[],
    pattern: Pattern,
  ): boolean {
    return (
      this.patterns.includes(pattern) &&
      group.length >= this.size
    );
  }

  state(): CalicoSingleCatState {
    return {
      level: this.level,
      name: this.name,
      points: this.points,
      size: this.size,
      patterns: this.patterns,
    };
  }

  public clone(): CalicoSizeCat {
    return new CalicoSizeCat(
      this.level,
      this.points,
      this.name,
      this.size,
    );
  }
}
