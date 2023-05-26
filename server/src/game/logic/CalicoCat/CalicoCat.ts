import { Pattern } from '../CalicoTile/FabricTile/FabricTile';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { PatternPoolSize } from '../exceptions';
import { CalicoSingleCatState } from '../types';
import { popAtRandom, repeat } from '../utils';
export enum CatLevel {
  Easy,
  Medium,
  Hard,
}

export default abstract class CalicoCat {
  protected patterns: Array<Pattern> = [];
  constructor(
    protected level: CatLevel,
    protected points: number,
    protected name: string,
  ) {}

  assignPatternsFromPool(patternPool: Pattern[]) {
    if (this.getPaterns().length) return;
    if (patternPool.length < 2) {
      throw new PatternPoolSize(patternPool);
    }
    repeat(2).forEach(() => {
      this.patterns.push(popAtRandom(patternPool));
    });
  }

  getPaterns() {
    return [...this.patterns];
  }

  getPoints() {
    return this.points;
  }

  getLevel() {
    return this.level;
  }

  isLevel(level: CatLevel) {
    return level === this.level;
  }

  abstract doesMatch(
    group: Array<Coord>,
    pattern: Pattern,
  ): boolean;
  abstract clone(): CalicoCat;
  abstract state(): CalicoSingleCatState;
}
