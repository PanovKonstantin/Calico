import {
  AllPatterns,
  Patterns,
} from '../CalicoTile/FabricTile/FabricTile';
import {
  BL,
  BR,
  R,
  ZeroCoord,
} from '../CubeCoordinate/CubeCoordinate';
import {
  createBoard,
  mockRandom,
  unmockRandom,
  withMockedMathRandom,
} from '../testUtils';
import { popAtRandom } from '../utils';
import CalicoCat, { CatLevel } from './CalicoCat';
import { CalicoShapeCat } from './CalicoShapeCat';
import { CatSet } from './CatSet';
import { StandardCatSet } from './CatSet';
import { Callie, Leo, Millie, Tecolote } from './cats';

describe('CalicoCat works correctly', () => {
  let cat: CalicoCat;
  beforeEach(() => {
    cat = Millie.clone();
  });
  test('Randoms diffrent cats', () => {
    mockRandom(0);
    const cats1 = new StandardCatSet();
    cats1.draw();

    mockRandom(0.99);
    const cats2 = new StandardCatSet();
    cats2.draw();
    unmockRandom();
    expect(cats1.state()).not.toStrictEqual(cats2.state());
  });

  test('Asign patterns', () => {
    withMockedMathRandom(() => {
      const testPatternPool = [...AllPatterns];
      const expectedPattern1 = popAtRandom(testPatternPool);
      const expectedPattern2 = popAtRandom(testPatternPool);
      const patternPool = [...AllPatterns];
      cat.assignPatternsFromPool(patternPool);
      const pattern1 = cat.getPaterns()[0];
      const pattern2 = cat.getPaterns()[1];
      expect(pattern1).toStrictEqual(expectedPattern1);
      expect(pattern2).toStrictEqual(expectedPattern2);
    });
  });

  describe('Size cats', () => {
    test('Size cat matches', () => {
      const catSet = new StandardCatSet(
        [Millie.clone()],
        [Patterns.First, Patterns.Second],
      );
      catSet.draw();
      const board = createBoard([
        { coord: ZeroCoord },
        { coord: R },
        { coord: R.times(2) },
      ]);
      expect(catSet.scoreOnBoard(board)).toBe(3);
    });
  });
  describe('Shape cats', () => {
    test('One tile shape cat matches', () => {
      const testCat = new CalicoShapeCat(
        CatLevel.Easy,
        1,
        'test',
        [ZeroCoord],
      );
      const catSet = new StandardCatSet(
        [testCat.clone()],
        [Patterns.First, Patterns.Second],
      );
      catSet.draw();
      const board = createBoard(
        [{ coord: ZeroCoord }],
        [],
        [],
      );
      expect(catSet.scoreOnBoard(board)).toBe(1);
    });

    test('Two tile shape cat matches', () => {
      const testCat = new CalicoShapeCat(
        CatLevel.Easy,
        1,
        'test',
        [ZeroCoord, R],
      );
      const catSet = new StandardCatSet(
        [testCat.clone()],
        [Patterns.First, Patterns.Second],
      );
      catSet.draw();
      const board = createBoard([
        { coord: ZeroCoord },
        { coord: R },
      ]);
      expect(catSet.scoreOnBoard(board)).toBe(1);
    });
    test('Tecolote cat matched upsidedown', () => {
      const catSet = new StandardCatSet(
        [Tecolote.clone()],
        [Patterns.First, Patterns.Second],
      );
      catSet.draw();
      const board = createBoard([
        { coord: ZeroCoord },
        { coord: R },
        { coord: R.times(2) },
        { coord: R.times(3) },
      ]);
      expect(catSet.scoreOnBoard(board)).toBe(
        Tecolote.getPoints(),
      );
    });
    describe('Callie', () => {
      let catSet: CatSet;
      beforeEach(() => {
        catSet = new StandardCatSet(
          [Callie.clone()],
          [Patterns.First, Patterns.Second],
        );
        catSet.draw();
      });
      test('Callie doesnt matched to line of 3', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: R },
          { coord: R.times(2) },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(0);
      });
      test('Callie cat does not matched for length less than needed', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: BL },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(0);
      });
      test('Callie cat matched', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: BR },
          { coord: R },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(
          Callie.getPoints(),
        );
      });
      test('Callie cat matched upsidedown', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: BR },
          { coord: BL },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(
          Callie.getPoints(),
        );
      });
    });
    describe('Leo', () => {
      let catSet: CatSet;
      beforeEach(() => {
        catSet = new StandardCatSet(
          [Leo.clone()],
          [Patterns.First, Patterns.Second],
        );
        catSet.draw();
      });

      test('Leo cat matched upsidedown', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: R },
          { coord: R.times(2) },
          { coord: R.times(3) },
          { coord: R.times(4) },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(
          Leo.getPoints(),
        );
      });
      test('Leo cat did not match for pattern mix', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: R },
          { coord: R.times(2) },
          { coord: R.times(3), pattern: Patterns.Sixth },
          { coord: R.times(4) },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(0);
      });
      test('Leo cat doesnt match wrong shape', () => {
        const board = createBoard([
          { coord: ZeroCoord },
          { coord: BR },
          { coord: BR.times(2) },
          { coord: BR.times(2).plus(R) },
          { coord: BR.times(3).plus(R) },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(0);
      });
      test('Leo doesnt match to wrong pattern', () => {
        const board = createBoard([
          { coord: ZeroCoord, pattern: Patterns.Fifth },
          { coord: R, pattern: Patterns.Fifth },
          { coord: R.times(2), pattern: Patterns.Fifth },
          { coord: R.times(3), pattern: Patterns.Fifth },
          { coord: R.times(4), pattern: Patterns.Fifth },
        ]);
        expect(catSet.scoreOnBoard(board)).toBe(0);
      });
    });
  });
});
