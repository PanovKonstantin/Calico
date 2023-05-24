import { GameCreator } from './GameCreator';

let gc: GameCreator;
beforeEach(() => {
  gc = new GameCreator();
});

it('creates beginner game', () => {
  gc.changeConfig({ setup: 'beginner' });
  gc.addPlayer('playerOne');
  const game = gc.create();
  const catNames = game.state().cats.map((c) => c.name);
  expect(
    Object.values(game.state().userStates),
  ).toHaveLength(1);
  const projects =
    game.state().userStates['playerOne'].projects;
  const projectReqs = projects.map((p) => p.getReqs());
  expect(catNames).toContain('Millie');
  expect(catNames).toContain('Tibbit');
  expect(catNames).toContain('Coconut');
  expect(projectReqs).toContainEqual([3, 3]);
  expect(projectReqs).toContainEqual([2, 2, 2]);
  expect(projectReqs).toContainEqual([1, 1, 1, 1, 1, 1]);
  expect(projectReqs).toContainEqual([2, 4]);
});

it('creates standard game', () => {
  gc.changeConfig({ setup: 'standard' });
  const game = gc.create();
  const catLevels = game.state().cats.map((c) => c.level);
  expect(catLevels).toContain(0);
  expect(catLevels).toContain(1);
  expect(catLevels).toContain(2);
});

it('creates with one player in standard setup', () => {
  gc.changeConfig({ setup: 'standard' });
  gc.addPlayer('playOne');
  const game = gc.create();
  const players = Object.values(game.state().userStates);
  expect(players).toHaveLength(1);
});

it('creates with one player in beginner setup', () => {
  gc.changeConfig({ setup: 'beginner' });
  gc.addPlayer('playOne');
  const game = gc.create();
  const players = Object.values(game.state().userStates);
  expect(players).toHaveLength(1);
});

it('creates with two players', () => {
  gc.changeConfig({ setup: 'standard' });
  gc.addPlayer('playOne');
  gc.addPlayer('playTwo');
  const game = gc.create();
  const players = Object.values(
    game.state().userStates,
  ).map((p) => p.status);
  expect(players).toHaveLength(2);
});
