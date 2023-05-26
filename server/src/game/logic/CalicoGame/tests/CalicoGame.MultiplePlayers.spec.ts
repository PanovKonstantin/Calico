import { createBlueBoard } from '../../CalicoBoard/BoardFactories';
import CalicoBoard from '../../CalicoBoard/CalicoBoard';
import FabricTile from '../../CalicoTile/FabricTile/FabricTile';
import { ZeroCoord } from '../../CubeCoordinate/CubeCoordinate';
import { MarketIsBlockedByAnotherPlayer } from '../../exceptions';
import { repeat } from '../../utils';
import CalicoGame, { StandardGame } from '../CalicoGame';
import { DefaultUserSession } from '../UserSession';

describe('Multiplayer', () => {
  let game: CalicoGame;

  beforeEach(() => {
    game = new StandardGame();
    repeat(4).forEach((_, id) => {
      game.registerNewPlayer(`${id}`, createBlueBoard());
    });
  });

  test('Game can be created with multiple players', () => {
    expect(
      Object.values(game.state().userStates),
    ).toHaveLength(4);
  });

  test('Every player can place projects', () => {
    placeProjectForPlayers(4, game);
    const states = game.getUserStates();
    Object.values(states).forEach((state) => {
      expect(state.status).toBe('placing_tile');
    });
  });

  test('Market and hands fill after projects are placed', () => {
    placeProjectForPlayers(4, game);
    expect(game.getMarket()).toHaveLength(
      CalicoGame.marketSize,
    );
    Object.values(game.getUserStates()).forEach((state) => {
      expect(state.hand).toHaveLength(
        DefaultUserSession.handSize,
      );
    });
  });

  test('Market and hands do not fill before every player placed projects', () => {
    placeProjectForPlayers(3, game);
    expect(game.getMarket()).not.toHaveLength(
      CalicoGame.marketSize,
    );
    Object.values(game.getUserStates()).forEach((state) => {
      expect(state.hand).not.toHaveLength(
        DefaultUserSession.handSize,
      );
    });
  });

  test('Every player can place fabric tiles', () => {
    placeProjectForPlayers(4, game);
    const keys = placeFabricTileForPlayers(4, game);
    keys.forEach((key, player) => {
      const state = game.getUserStates()[player];
      const tile = state.board.fabricCells[key].tile;
      const handLength = DefaultUserSession.handSize - 1;
      expect(tile).toBeInstanceOf(FabricTile);
      expect(state.hand).toHaveLength(handLength);
    });
  });

  test('Every player can choose from market', () => {
    placeProjectForPlayers(4, game);
    placeFabricTileForPlayers(4, game);
    chooseFromMarketForPlayers(4, game);
    const handLength = DefaultUserSession.handSize;
    const marketLength = CalicoGame.marketSize;
    const states = game.getUserStates();
    const market = game.getMarket();
    Object.values(states).forEach((s) => {
      expect(s.hand).toHaveLength(handLength);
      expect(s.status).toBe('placing_tile');
    });
    expect(market).toHaveLength(marketLength);
  });

  test('Every player can place fabric tiles after choosing from market', () => {
    placeProjectForPlayers(4, game);
    repeat(10).forEach(() => {
      placeFabricTileForPlayers(4, game);
      chooseFromMarketForPlayers(4, game);
    });
    const handLength = DefaultUserSession.handSize;
    const marketLength = CalicoGame.marketSize;
    const states = game.getUserStates();
    const market = game.getMarket();
    Object.values(states).forEach((s) => {
      expect(s.hand).toHaveLength(handLength);
      expect(s.status).toBe('placing_tile');
    });
    expect(market).toHaveLength(marketLength);
  });

  test('Every player can finish game', () => {
    placeProjectForPlayers(4, game);
    placeFabricTileForPlayers(4, game);
    Object.values(game.getUserStates()[0].board.fabricCells)
      .filter((c) => c.tile === null)
      .forEach(() => {
        chooseFromMarketForPlayers(4, game);
        placeFabricTileForPlayers(4, game);
      });
    Object.values(game.getUserStates()).forEach((s) => {
      expect(s.status).toBe('finished');
    });
  });

  test('Players can place projects in diffrent order', () => {
    const key = CalicoBoard.projectCoords[0].key;
    game.placeProject(0, key, '2');
    game.placeProject(0, key, '1');
    game.placeProject(0, key, '0');
    game.placeProject(0, key, '3');
  });

  test('Players can place fabric tiles in diffrent order', () => {
    placeProjectForPlayers(4, game);
    game.useTile(0, ZeroCoord.key, '2');
    game.useTile(0, ZeroCoord.key, '0');
    game.useTile(0, ZeroCoord.key, '3');
    game.useTile(0, ZeroCoord.key, '1');
  });

  test('Players cannot choose from market in a diffrent order', () => {
    placeProjectForPlayers(4, game);
    placeFabricTileForPlayers(4, game);
    expect(() => {
      game.chooseFromMarket(0, '3');
    }).toThrow(MarketIsBlockedByAnotherPlayer);
  });
});

const placeProjectForPlayers = (
  numOfPlayers: number,
  game: CalicoGame,
) => {
  CalicoBoard.projectCoords.forEach((c) => {
    repeat(numOfPlayers).forEach((_, player) =>
      game.placeProject(0, c.key, `${player}`),
    );
  });
};

const placeFabricTileForPlayers = (
  numOfPlayers: number,
  game: CalicoGame,
) => {
  return repeat(numOfPlayers).map((_, player) =>
    placeFabricTileUser(`${player}`, game),
  );
};

const placeFabricTileUser = (
  userId: string,
  game: CalicoGame,
) => {
  const key = Object.values(
    game.getUserStates()[userId].board.fabricCells,
  ).find((cell) => cell.tile === null).key;
  game.useTile(0, key, userId);
  return key;
};

const chooseFromMarketForPlayers = (
  numOfPlayers: number,
  game: CalicoGame,
) => {
  repeat(numOfPlayers).forEach((_, player) =>
    game.chooseFromMarket(0, `${player}`),
  );
};
