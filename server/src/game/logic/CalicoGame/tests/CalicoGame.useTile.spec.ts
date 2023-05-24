import { createBlueBoard } from '../../CalicoBoard/BoardFactories';
import CalicoBoard from '../../CalicoBoard/CalicoBoard';
import FabricTile from '../../CalicoTile/FabricTile/FabricTile';
import Coord from '../../CubeCoordinate/CubeCoordinate';
import {
  CellIsTaken,
  UnallowedAction,
} from '../../exceptions';
import { getGameCell } from '../../testUtils';
import CalicoGame, { StandardGame } from '../CalicoGame';
import { DefaultUserSession } from '../UserSession';

describe('Tiles work as expected', () => {
  const user = 'user';
  let game: CalicoGame;
  beforeEach(() => {
    game = new StandardGame();
    game.registerNewPlayer(user, createBlueBoard());
  });
  describe('Before setting up is complete', () => {
    test('Use project', () => {
      const project =
        game.getUserStates()[user].projects[3];
      game.placeProject(
        3,
        Coord.fromOffset(2, 1).key,
        user,
      );
      const tile = getGameCell(game, 1, 1).tile;
      expect(tile).toEqual(project);
    });
    test('Randomizes hand and market on finishing placing projects', () => {
      CalicoBoard.projectCoords.forEach((coord) =>
        game.placeProject(0, coord.key, user),
      );
      expect(game.state().market).toHaveLength(
        CalicoGame.marketSize,
      );
      const market = game.state().market;
      market.forEach((tile) =>
        expect(tile).toBeInstanceOf(FabricTile),
      );
    });
  });
  describe('After setting up is complete', () => {
    beforeEach(() => {
      game.completeSettingUp();
    });
    test('draws two tiles in the start', () => {
      const tiles = game.getUserStates()[user].hand;
      expect(tiles).toHaveLength(
        DefaultUserSession.handSize,
      );
      expect(tiles[user]).not.toBeNull();
      expect(tiles[1]).not.toBeNull();
    });
    test('Cannot put tile on a nonempty cell', () => {
      const tile1 = game.getUserStates()[user].hand[0];
      game.useTile(0, 'q0r0', user);
      game.chooseFromMarket(0, user);
      const tile2 = game.getUserStates()[user].hand[0];
      expect(() => game.useTile(0, 'q0r0', user)).toThrow(
        CellIsTaken,
      );
      const cell = getGameCell(game, 0, 0);
      expect(game.getUserStates()[user].hand[0]).toBe(
        tile2,
      );
      expect(cell.tile).toBe(tile1);
    });

    test("Cannot use projects in 'ongoung' state", () => {
      expect(() =>
        game.placeProject(
          3,
          Coord.fromOffset(2, 1).key,
          user,
        ),
      ).toThrow(UnallowedAction);
    });

    describe('Choosing market tiles', () => {
      test('Choose tile from market after placing tile', () => {
        game.useTile(0, 'q0r0', user);
        const marketTile = game.state().market[0];
        const countTileType = () =>
          game
            .getUserStates()
            [user].hand.filter(
              (t) =>
                t.color === marketTile.color &&
                t.pattern === marketTile.pattern,
            ).length;
        const tileTypeCount1 = countTileType();
        game.chooseFromMarket(0, user);
        const tileTypeCount2 = countTileType();
        expect(tileTypeCount1 + 1).toStrictEqual(
          tileTypeCount2,
        );
      });
      test('Market tile is replace after choosing it', () => {
        game.useTile(0, 'q0r0', user);
        game.chooseFromMarket(0, user);
        expect(game.state().market[0]).not.toBeNull();
        expect(game.state().market[0]).toBeInstanceOf(
          FabricTile,
        );
      });
      test('Cannot choose market if hand is full', () => {
        expect(() =>
          game.chooseFromMarket(0, user),
        ).toThrow(UnallowedAction);
      });
    });
  });
});
