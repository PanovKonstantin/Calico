import { createBlueBoard } from '../../CalicoBoard/BoardFactories';
import ProjectTile from '../../CalicoTile/ProjectTile/ProjectTile';
import Coord from '../../CubeCoordinate/CubeCoordinate';
import CalicoGame, { StandardGame } from '../CalicoGame';

describe('Draws projects correctly', () => {
  const user = 'user';
  let game: CalicoGame;
  beforeEach(() => {
    game = new StandardGame();
    game.registerNewPlayer(user, createBlueBoard());
  });

  test('Draws projects', () => {
    const projects = game.getUserStates()[user].projects;
    expect(projects).not.toBeNull();
    expect(projects).toBeInstanceOf(Array<ProjectTile>);
    expect(projects).toHaveLength(4);
  });

  test('Puts project', () => {
    const state = game.getUserStates()[user];
    const project = state.projects;
    const expectedProject = project[3];
    game.placeProject(3, new Coord(1, 1).key, user);
    const board = game.getUserStates()[user].board;
    const cell = board.projectCells['q1r1'];
    expect(cell.tile).toBe(expectedProject);
  });
});
