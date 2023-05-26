import { createBlueBoard } from '../../CalicoBoard/BoardFactories';
import CalicoBoard from '../../CalicoBoard/CalicoBoard';
import CalicoGame, { StandardGame } from '../CalicoGame';

describe('Calico game status changes correctly', () => {
  const user = 'user';
  let game: CalicoGame;
  beforeEach(() => {
    game = new StandardGame();
    game.registerNewPlayer(user, createBlueBoard());
  });

  test('Game has correct status after start', () => {
    expect(game.getUserStates()['user'].status).toBe(
      'placing_projects',
    );
  });

  test('Game has correct status after projects are placed', () => {
    CalicoBoard.projectCoords.forEach((coord) =>
      game.placeProject(0, coord.key, user),
    );
    const status = game.getUserStates()['user'].status;
    expect(status).toBe('placing_tile');
  });
  test('Game has correct status after placing tile', () => {
    game.completeSettingUp();
    game.useTile(0, 'q0r0', user);
    expect(game.getUserStates()['user'].status).toBe(
      'choosing_from_market',
    );
  });
  test('Game has correct status after choosing from market', () => {
    game.completeSettingUp();
    game.useTile(0, 'q0r0', user);
    game.chooseFromMarket(0, user);
    expect(game.getUserStates()['user'].status).toBe(
      'placing_tile',
    );
  });

  test('Game has correct status after the end of the game', () => {
    game.completeSettingUp();
    game.useTile(0, 'q0r0', user);
    Object.values(
      game.getUserStates()['user'].board.fabricCells,
    ).forEach((cell) => {
      if (!cell.tile) {
        game.chooseFromMarket(0, user);
        game.useTile(0, cell.key, user);
      }
    });
    expect(game.getUserStates()['user'].status).toBe(
      'finished',
    );
  });
});
