import CalicoBoard from '../../CalicoBoard/CalicoBoard';
import CalicoCat from '../../CalicoCat/CalicoCat';
import {
  Colors,
  Patterns,
} from '../../CalicoTile/FabricTile/FabricTile';
import {
  BL,
  BR,
  R,
  ZeroCoord,
} from '../../CubeCoordinate/CubeCoordinate';
import {
  createBoard,
  mockRandom,
  unmockRandom,
} from '../../testUtils';
import CalicoGame, {
  ExampleBank2,
  StandardGame,
} from '../CalicoGame';
import {
  Callie,
  Tecolote,
  Leo,
} from '../../CalicoCat/cats';
import {
  AAAABB,
  AAABBB,
  AABBCD,
  AllDiffrent,
} from '../../CalicoTile/ProjectTile/project';
import {
  ExampleBank,
  createBeginnerGame,
} from '../ExampleGameFactory';
import { StandardCatSet } from '../../CalicoCat/CatSet';
import {
  CustomBoardPool,
  DefaultBoardPool,
  createBlueBoard,
} from '../../CalicoBoard/BoardFactories';
import { DefaultProjectBank } from '../../CalicoTile/ProjectTile/ProjectBank';

describe('Calico games counts score correctly', () => {
  test('Counts one color group', () => {
    const board = createBoard([
      { coord: ZeroCoord },
      { coord: R },
      { coord: R.times(2) },
    ]);
    const game = createGame({ board });
    expect(game.score()['1'].colors).toBe(3);
  });
  test('Does not counts incomplete group', () => {
    const board = createBoard([
      { coord: ZeroCoord },
      { coord: R },
    ]);
    const game = createGame({ board });
    expect(game.score()['1'].colors).toBe(0);
  });
  test('Count correctly complete and incomplete groups', () => {
    const BLBR = BL.plus(BR);
    const color = Colors.Green;
    const board = createBoard([
      { coord: ZeroCoord },
      { coord: R },
      { coord: BR, color },
      { coord: BLBR, color },
      { coord: BLBR.plus(R), color },
      { coord: BLBR.plus(BL) },
      { coord: BLBR.times(2) },
      { coord: BLBR.times(2).plus(R) },
    ]);
    const game = createGame({ board });
    expect(game.score()['1'].colors).toBe(6);
  });

  test('Project AAABBB counts completion by pattern', () => {
    const pattern = Patterns.Second;
    const coord = CalicoBoard.projectCoords[0];
    const coords = coord.neighbors();
    const board = createBoard([
      ...coords.slice(0, 3).map((coord) => ({ coord })),
      ...coords
        .slice(3)
        .map((coord) => ({ coord, pattern })),
    ]);
    const p = AAABBB.clone();
    const game = createGame({
      board,
      projects: [p],
    });
    game.placeProject(0, coord.key, '1');
    const score = getScore(game);
    expect(score.projects).toBe(p.getPoints(0));
  });

  test('Project AAAABB counts completion by colors', () => {
    const color = Colors.Green;
    const coord = CalicoBoard.projectCoords[0];
    const coords = coord.neighbors();
    const board = createBoard([
      ...coords.slice(0, 4).map((coord) => ({ coord })),
      ...coords.slice(4).map((coord) => ({ coord, color })),
    ]);
    const p = AAAABB.clone();
    const game = createGame({ board, projects: [p] });
    game.placeProject(0, coord.key, '1');
    const score = getScore(game);
    expect(score.projects).toBe(p.getPoints(0));
  });

  test('Project AllDiffrent counts completion by colors and patterns', () => {
    const coord = CalicoBoard.projectCoords[0];
    const c = coord.neighbors();
    const board = createBoard([
      { coord: c[0], color: 'Blue', pattern: 'First' },
      { coord: c[1], color: 'Green', pattern: 'Second' },
      { coord: c[2], color: 'LightBlue', pattern: 'Third' },
      { coord: c[3], color: 'Pink', pattern: 'Forth' },
      { coord: c[4], color: 'Purple', pattern: 'Fifth' },
      { coord: c[5], color: 'Yellow', pattern: 'Sixth' },
    ]);
    const p = AllDiffrent.clone();
    const game = createGame({ board, projects: [p] });
    game.placeProject(0, coord.key, '1');
    const score = getScore(game);
    expect(score.projects).toBe(p.getPoints(1));
  });

  test('Project AABBCD doesnot count without completion', () => {
    const coord = CalicoBoard.projectCoords[0];
    const c = coord.neighbors();
    const board = createBoard([
      { coord: c[0] },
      { coord: c[1] },
      { coord: c[2] },
      { coord: c[3] },
      { coord: c[4] },
      { coord: c[5] },
    ]);
    const p = AABBCD.clone();
    const game = createGame({ board, projects: [p] });
    game.placeProject(0, coord.key, '1');
    const score = getScore(game);
    expect(score.projects).toBe(0);
  });

  test('Gets full game score correctly', () => {
    const game = createBeginnerGame()
      .setBank(new ExampleBank())
      .setBoardPool(
        new CustomBoardPool([createBlueBoard()]),
      );
    const user = 'user';
    game.registerNewPlayer(user, createBlueBoard());
    const projCoords = CalicoBoard.projectCoords.map(
      (c) => c.key,
    );
    game.placeProject(0, projCoords[2], user);
    game.placeProject(0, projCoords[1], user);
    game.placeProject(0, projCoords[0], user);
    const [firstCell, ...cells] = Object.values(
      game.state().userStates[user].board.fabricCells,
    ).filter((c) => c.tile === null);
    game.useTile(0, firstCell.key, user);
    for (const cell of cells) {
      game.chooseFromMarket(0, user);
      game.useTile(0, cell.key, user);
    }
    const score = game.score()[user];
    expect(score.cats).toBe(23);
    expect(score.colors).toBe(21);
    expect(score.projects).toBe(29);
  });
});

const createGameCats: CalicoCat[] = [Callie, Tecolote, Leo];
const createGame = ({
  cats = createGameCats,
  patterns = [
    Patterns.First,
    Patterns.Second,
    Patterns.Third,
    Patterns.Forth,
    Patterns.Fifth,
    Patterns.Sixth,
  ],
  board = new CalicoBoard(),
  projects = [],
}) => {
  mockRandom(0);
  const catSet = new StandardCatSet(
    cats.map((c) => c.clone()),
    patterns,
  );
  const game = new StandardGame();
  game.setProjectFactory(
    () =>
      new DefaultProjectBank(
        projects,
        Math.min(projects.length, 3),
      ),
  );
  game.registerNewPlayer('1', board);
  game.setCats(catSet);
  game.registerNewPlayer('1', board);
  unmockRandom();
  return game;
};

const getScore = (game: CalicoGame) => {
  return game.getUserStates()['1'].score;
};
