import {
  AAAABB,
  defaultProjects,
} from '../CalicoTile/ProjectTile/project';
import FabricTile, {
  Colors,
  Patterns,
} from '../CalicoTile/FabricTile/FabricTile';
import {
  FabricCellDoesNotExist,
  ProjectCellDoesNotExist,
} from '../exceptions';
import CalicoBoard from './CalicoBoard';
import Coord, {
  BL,
  BR,
  R,
  ZeroCoord,
} from '../CubeCoordinate/CubeCoordinate';
import {
  getBoardCell,
  setColors,
  setPatterns,
} from '../testUtils';

describe('Calico board works as expected', () => {
  let board: CalicoBoard;
  beforeEach(() => {
    board = new CalicoBoard();
  });

  test('Has empty cell 0, 0, 0 on construction', () => {
    expect(getBoardCell(board, 0, 0).tile).toBeNull();
    expect(getBoardCell(board, 1, 2).tile).toBeNull();
  });

  test('Does not create wrongs cells', () => {
    expect(getBoardCell(board, -10, -10)).toBeUndefined();
  });

  test('Counts empty tiles', () => {
    expect(board.emptyFabricCells()).toBe(22);
    board.putFabricOn('q0r0', new FabricTile());
    expect(board.emptyFabricCells()).toBe(21);
    Object.values(board.state().fabricCells).forEach(
      (v) => {
        if (!v.tile)
          board.putFabricOn(v.key, new FabricTile());
      },
    ),
      expect(board.emptyFabricCells()).toBe(0);
  });

  test('Puts tile on a cell', () => {
    const tile = new FabricTile();
    const coord = ZeroCoord;
    board.putFabricOn(coord.key, tile);
    expect(getBoardCell(board, 0, 0).tile).toStrictEqual(
      tile,
    );
  });

  test('Put project on a cell', () => {
    const project = defaultProjects[0].clone();
    const coord = R.plus(BR);
    board.placeProjectOn(coord.key, project);
    expect(getBoardCell(board, ...coord.array()).tile).toBe(
      project,
    );
  });

  test('Cannot put on nonexisting cell', () => {
    expect(() => {
      board.putFabricOn(
        new Coord(10, 10).key,
        new FabricTile(),
      );
    }).toThrow(FabricCellDoesNotExist);
  });

  test('Doesnt put project on not project cell', () => {
    const project = defaultProjects[0].clone();
    const coord = new Coord(0, 0);
    expect(() =>
      board.placeProjectOn(coord.key, project),
    ).toThrow(ProjectCellDoesNotExist);
  });

  test('Cant put fabric tile on a project cell', () => {
    const coord = new Coord(1, 1);
    expect(() =>
      board.putFabricOn(coord.key, new FabricTile()),
    ).toThrow(FabricCellDoesNotExist);
  });
  test('Checks if project cells are not filled', () => {
    expect(board.areProjectCellsFilled()).toBeFalsy();
  });
  test('Checks if project cells are filled, when filled partialy', () => {
    board.placeProjectOn(
      CalicoBoard.projectCoords[1].key,
      AAAABB.clone(),
    );
    expect(board.areProjectCellsFilled()).toBeFalsy();
  });

  test('Checks if project cells are filled', () => {
    CalicoBoard.projectCoords.forEach((cell) => {
      board.placeProjectOn(cell.key, AAAABB.clone());
    });
    expect(board.areProjectCellsFilled()).toBeTruthy();
  });

  describe('Grouping', () => {
    test('Groups by color with one tile', () => {
      const [c1] = setColors(board, [
        [ZeroCoord, Colors.Blue],
      ]);
      const groups = board.groupByColor();
      expect(groups).toStrictEqual([[c1]]);
    });
    test('Groups by pattern with one tile', () => {
      const [c1] = setPatterns(board, [
        [ZeroCoord, Patterns.First],
      ]);
      const groups = board.groupByPattern();
      expect(groups).toStrictEqual([[c1]]);
    });

    test('Groups by color with two diffrent color tiles', () => {
      const [c1, c2] = setColors(board, [
        [ZeroCoord, Colors.Blue],
        [R, Colors.Green],
      ]);
      const groups = board.groupByColor();
      expect(groups).toStrictEqual([[c1], [c2]]);
    });

    test('Groups by pattern with two diffrent pattern tiles', () => {
      const [c1, c2] = setPatterns(board, [
        [ZeroCoord, Patterns.First],
        [R, Patterns.Second],
      ]);
      const groups = board.groupByPattern();
      expect(groups).toStrictEqual([[c1], [c2]]);
    });

    test('Groups by color with two same-color tiles', () => {
      const [c1, c2] = setColors(board, [
        [ZeroCoord, Colors.Blue],
        [R, Colors.Blue],
      ]);
      const groups = board.groupByColor();
      expect(groups).toStrictEqual([[c1, c2]]);
    });

    test('Groups by pattern with two same-pattern tiles', () => {
      const [c1, c2] = setPatterns(board, [
        [ZeroCoord, Patterns.First],
        [R, Patterns.First],
      ]);
      const groups = board.groupByPattern();
      expect(groups).toStrictEqual([[c1, c2]]);
    });

    test('Groups by color with three same-color tiles in a row', () => {
      const [c1, c2, c3] = setColors(board, [
        [ZeroCoord, Colors.Blue],
        [R, Colors.Blue],
        [R.times(2), Colors.Blue],
      ]);
      const groups = board.groupByColor();
      expect(groups).toStrictEqual([[c1, c2, c3]]);
    });

    test('Groups by pattern with three same-pattern tiles in a row', () => {
      const [c1, c2, c3] = setPatterns(board, [
        [ZeroCoord, Patterns.First],
        [R, Patterns.First],
        [R.times(2), Patterns.First],
      ]);
      const groups = board.groupByPattern();
      expect(groups).toStrictEqual([[c1, c2, c3]]);
    });

    test(
      'Groups by color with two same-color tiles' +
        'separated by a diffrent color tile',
      () => {
        const [c1, c2, c3] = setColors(board, [
          [ZeroCoord, Colors.Blue],
          [R, Colors.Green],
          [R.times(2), Colors.Blue],
        ]);
        const groups = board.groupByColor();
        expect(groups).toStrictEqual([[c1], [c2], [c3]]);
      },
    );

    test(
      'Groups by pattern with two same-pattern tiles' +
        'separated by a diffrent pattern tile',
      () => {
        const [c1, c2, c3] = setPatterns(board, [
          [ZeroCoord, Patterns.First],
          [R, Patterns.Second],
          [R.times(2), Patterns.First],
        ]);
        const groups = board.groupByPattern();
        expect(groups).toStrictEqual([[c1], [c2], [c3]]);
      },
    );

    test('Groups by color two separate same-color groups', () => {
      const BR3 = BR.times(3);
      const R2 = R.times(2);
      const c = setColors(board, [
        [ZeroCoord, Colors.Blue],
        [R, Colors.Blue],
        [R2, Colors.Blue],
        [BR3, Colors.Blue],
        [R.plus(BR3), Colors.Blue],
        [R2.plus(BR3), Colors.Blue],
      ]);
      const groups = board.groupByColor();
      expect(groups).toStrictEqual([
        [c[0], c[1], c[2]],
        [c[3], c[4], c[5]],
      ]);
    });
    test('Groups by pattern two separate same-pattern groups', () => {
      const BR3 = BR.times(3);
      const R2 = R.times(2);
      const c = setPatterns(board, [
        [ZeroCoord, Patterns.First],
        [R, Patterns.First],
        [R2, Patterns.First],
        [BR3, Patterns.First],
        [R.plus(BR3), Patterns.First],
        [R2.plus(BR3), Patterns.First],
      ]);
      const groups = board.groupByPattern();
      expect(groups).toStrictEqual([
        [c[0], c[1], c[2]],
        [c[3], c[4], c[5]],
      ]);
    });

    test('Groups by color two color groups separated by diffrent color group', () => {
      const BLBR = BL.plus(BR);
      const cells = setColors(board, [
        [ZeroCoord, Colors.Blue],
        [R, Colors.Blue],
        [BL, Colors.Blue],
        [BR, Colors.Green],
        [BLBR, Colors.Green],
        [BLBR.plus(R), Colors.Green],
        [BLBR.plus(BL), Colors.Blue],
        [BLBR.times(2), Colors.Blue],
        [BLBR.times(2).plus(R), Colors.Blue],
      ]);
      const coords = cells.map((c) => c.coord());
      const [g1, g2, g3] = board
        .groupByColor()
        .map((g) => g.map((cell) => cell.coord().hash()));
      [...coords.slice(0, 3)].forEach((c) => {
        expect(g1).toContain(c.hash());
      });
      [...coords.slice(3, 6)].forEach((c) => {
        expect(g2).toContain(c.hash());
      });
      [...coords.slice(6)].forEach((c) => {
        expect(g3).toContain(c.hash());
      });
    });

    test('Groups by pattern two pattern groups separated by diffrent pattern group', () => {
      const BLBR = BL.plus(BR);
      const cells = setPatterns(board, [
        [ZeroCoord, Patterns.First],
        [R, Patterns.First],
        [BL, Patterns.First],
        [BR, Patterns.Second],
        [BLBR, Patterns.Second],
        [BLBR.plus(R), Patterns.Second],
        [BLBR.plus(BL), Patterns.First],
        [BLBR.times(2), Patterns.First],
        [BLBR.times(2).plus(R), Patterns.First],
      ]);
      const coords = cells.map((c) => c.coord());
      const [g1, g2, g3] = board
        .groupByPattern()
        .map((g) => g.map((cell) => cell.coord().hash()));
      [...coords.slice(0, 3)].forEach((c) => {
        expect(g1).toContain(c.hash());
      });
      [...coords.slice(3, 6)].forEach((c) => {
        expect(g2).toContain(c.hash());
      });
      [...coords.slice(6)].forEach((c) => {
        expect(g3).toContain(c.hash());
      });
    });
  });
});
