import CalicoBoard from '../CalicoBoard/CalicoBoard';
import {
  Pattern,
  Patterns,
} from '../CalicoTile/FabricTile/FabricTile';
import { CalicoSingleCatState } from '../types';
import { getAtRandom } from '../utils';
import CalicoCat, { CatLevel } from './CalicoCat';
import {
  Coconut,
  Millie,
  Tibbit,
  defaultCats,
} from './cats';

export type CatMap = Map<CatLevel, CalicoCat>;

export abstract class CatSet {
  protected cats: CalicoCat[] = [];

  abstract draw(): void;
  state(): CalicoSingleCatState[] {
    const state = this.cats.map((c) => c.state());
    return state;
  }

  scoreOnBoard(board: CalicoBoard): number {
    return board
      .groupByPattern()
      .map((group) => {
        const coords = group.map((c) => c.coord());
        const pattern = group[0].get().pattern;
        const cat = [...this.cats]
          .sort((a, b) => b.getLevel() - a.getLevel())
          .find((cat) => cat.doesMatch(coords, pattern));
        return cat ? cat.getPoints() : 0;
      })
      .reduce((sum, curr) => sum + curr, 0);
  }
}

export class StandardCatSet extends CatSet {
  constructor(
    private pool: CalicoCat[] = defaultCats,
    private patterns: Pattern[] = Object.values(Patterns),
  ) {
    super();
  }

  draw() {
    this.drawCats();
    this.assignPatterns();
  }

  private drawCats() {
    const catsByLevel = new Map();
    this.pool.forEach((cat) => {
      const level = cat.getLevel();
      if (catsByLevel.has(level)) {
        catsByLevel.get(level).push(cat.clone());
      } else {
        catsByLevel.set(level, [cat.clone()]);
      }
    });
    this.cats = [];
    catsByLevel.forEach((levelPool) => {
      this.cats.push(getAtRandom(levelPool));
    });
  }

  private assignPatterns() {
    for (const cat of this.cats) {
      cat.assignPatternsFromPool(this.patterns);
    }
  }
}

export class BeginnerCatSet extends CatSet {
  draw(): void {
    const millie = Millie.clone();
    const tibbit = Tibbit.clone();
    const coconut = Coconut.clone();
    millie.assignPatternsFromPool([
      Patterns.Second,
      Patterns.Sixth,
    ]);
    tibbit.assignPatternsFromPool([
      Patterns.Forth,
      Patterns.First,
    ]);
    coconut.assignPatternsFromPool([
      Patterns.Fifth,
      Patterns.Third,
    ]);
    this.cats = [millie, tibbit, coconut];
  }
}
