import CalicoGame, {
  StandardGame,
} from '../CalicoGame/CalicoGame';
import { createBeginnerGame } from '../CalicoGame/ExampleGameFactory';
import { UnkownGameSetup } from './GameCreator.exceptions';

type Setup = 'beginner' | 'standard';
export class GameCreator {
  private setup: Setup = 'standard';
  private players = new Set<string>();

  changeConfig(config: { setup: Setup }) {
    this.setup = config.setup;
  }

  addPlayer(player: string) {
    this.players.add(player);
    return this;
  }

  removePlayer(player: string) {
    this.players.delete(player);
  }

  getConfig() {
    return {
      setup: this.setup,
      players: this.players,
    };
  }

  create() {
    const game = this.initGame();
    this.registerPlayers(game);
    return game;
  }

  private initGame(): CalicoGame {
    switch (this.setup) {
      case 'standard':
        return new StandardGame();
      case 'beginner':
        return createBeginnerGame();
      default:
        throw new UnkownGameSetup(this.setup);
    }
  }

  private registerPlayers(game: CalicoGame) {
    for (const player of this.players) {
      game.registerNewPlayer(player);
    }
  }
}
