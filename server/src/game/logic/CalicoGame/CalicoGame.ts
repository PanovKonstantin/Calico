import FabricTile, {
  Colors,
  Pattern,
  Patterns,
} from '../CalicoTile/FabricTile/FabricTile';
import {
  CalicoSingleCatState,
  GameScore,
  GameStateType,
} from '../types';
import { CatSet } from '../CalicoCat/CatSet';
import {
  DefaultFabricSet,
  FabricSet,
} from '../CalicoTile/FabricTile/FabricSet';
import {
  DefaultUserSession,
  UserSession,
  UserSessionState,
} from './UserSession';
import { MarketIsBlockedByAnotherPlayer } from '../exceptions';
import { Bank, RandomBank } from '../Bank/Bank';
import { StandardCatSet } from '../CalicoCat/CatSet';
import {
  DefaultProjectBank,
  ProjectBank,
} from '../CalicoTile/ProjectTile/ProjectBank';
import CalicoBoard from '../CalicoBoard/CalicoBoard';
import {
  BoardPool,
  DefaultBoardPool,
} from '../CalicoBoard/BoardFactories';
import CalicoCat from '../CalicoCat/CalicoCat';
import { Callie, Coconut, Leo } from '../CalicoCat/cats';
import { popAt } from '../utils';
import {
  AAABBC,
  AABBCC,
  AABBCD,
  AllDiffrent,
} from '../CalicoTile/ProjectTile/project';
export default abstract class CalicoGame {
  static marketSize = 3;
  private bank: Bank;
  private market: FabricSet;
  private cats: CatSet;
  private boardPool: BoardPool;
  private userSessions = new Map<string, UserSession>();
  private userToUseMarket = 0;
  private projectFactory: () => ProjectBank;

  constructor() {
    this.factory();
  }
  protected abstract factory(): void;

  setCats(cats: CatSet) {
    this.cats = cats;
    this.cats.draw();
    return this;
  }

  setBank(bank: Bank) {
    this.bank = bank;
    return this;
  }

  setMarket(market: FabricSet) {
    this.market = market;
    return this;
  }

  setBoardPool(boardPool: BoardPool) {
    this.boardPool = boardPool;
    return this;
  }

  setProjectFactory(factory: () => ProjectBank) {
    this.projectFactory = factory;
    return this;
  }

  registerNewPlayer(
    player: string,
    board: CalicoBoard = null,
  ) {
    const session = new DefaultUserSession()
      .setProjects(this.projectFactory())
      .setBoard(board ? board : this.boardPool.get(player))
      .setBank(this.bank)
      .setMarket(this.market)
      .setCats(this.cats);
    this.userSessions.set(player, session);
  }

  getCats(): CalicoSingleCatState[] {
    return this.cats.state();
  }
  getMarket(): FabricTile[] {
    return this.market.state();
  }
  getUserStates(): { [user: string]: UserSessionState } {
    const userStates = {};
    this.userSessions.forEach((session, user) => {
      userStates[user] = session.state();
    });
    return userStates;
  }
  state(): GameStateType {
    return {
      cats: this.cats.state(),
      market: this.market.state(),
      userStates: this.getUserStates(),
    };
  }

  completeSettingUp() {
    this.fillTilesInMarket();
    this.userSessions.forEach((s) => s.completeSettingUp());
  }

  fillTilesInMarket() {
    while (
      this.market.state().length < CalicoGame.marketSize
    ) {
      const tile = this.bank.pull();
      this.market.push(tile);
    }
  }

  placeProject(
    projectId: number,
    key: string,
    user: string,
  ) {
    this.userSessions
      .get(user)
      .placeProjectTile(projectId, key);
    if (
      [...this.userSessions.values()].every(
        (s) => s.state().status !== 'placing_projects',
      )
    ) {
      this.completeSettingUp();
    }
  }

  useTile(tileId: number, cellKey: string, user: string) {
    this.userSessions
      .get(user)
      .placeFabricTile(tileId, cellKey);
  }

  chooseFromMarket(marketTileId: number, user: string) {
    const users = [...this.userSessions.keys()];
    const userBlockingMarket = users[this.userToUseMarket];
    if (user !== userBlockingMarket)
      throw new MarketIsBlockedByAnotherPlayer();
    this.userSessions.get(user).addToHand(marketTileId);
    if (users.length === 1) {
      this.market.pull(0);
    }
    this.fillTilesInMarket();
    this.userToUseMarket =
      (this.userToUseMarket + 1) % this.userSessions.size;
  }

  score(): { [user: string]: GameScore } {
    const scores = {};
    this.userSessions.forEach(
      (session, user) => (scores[user] = session.score()),
    );
    return scores;
  }
}

export class StandardGame extends CalicoGame {
  protected factory() {
    this.setCats(new StandardCatSet())
      .setBoardPool(new DefaultBoardPool())
      .setBank(new RandomBank())
      .setMarket(new DefaultFabricSet([]))
      .setProjectFactory(() => new DefaultProjectBank());
  }
}

export class ExampleBank2 implements Bank {
  private pool = [
    new FabricTile(Colors.Purple, Patterns.Second),
    new FabricTile(Colors.Purple, Patterns.Forth),
    new FabricTile(Colors.Green, Patterns.Third),
    new FabricTile(Colors.LightBlue, Patterns.Sixth),
    new FabricTile(Colors.LightBlue, Patterns.Second),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Green, Patterns.Fifth),
    new FabricTile(Colors.Green, Patterns.Forth),
    new FabricTile(Colors.Green, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.First),
    new FabricTile(Colors.Yellow, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.LightBlue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Fifth),
    new FabricTile(Colors.Pink, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Yellow, Patterns.First),
  ];
  pull(): FabricTile {
    return popAt(this.pool, 0);
  }
}

export class ExampleBank3 implements Bank {
  private pool = [
    new FabricTile(Colors.Purple, Patterns.Second),
    new FabricTile(Colors.Purple, Patterns.Second),
    new FabricTile(Colors.Purple, Patterns.Forth),
    new FabricTile(Colors.LightBlue, Patterns.Sixth),
    new FabricTile(Colors.LightBlue, Patterns.Second),
    new FabricTile(Colors.LightBlue, Patterns.Sixth),
    new FabricTile(Colors.LightBlue, Patterns.Second),
    new FabricTile(Colors.Purple, Patterns.Forth),
    new FabricTile(Colors.Green, Patterns.Third),
    new FabricTile(Colors.Green, Patterns.Third),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Green, Patterns.Fifth),
    new FabricTile(Colors.Green, Patterns.Fifth),
    new FabricTile(Colors.Green, Patterns.Forth),
    new FabricTile(Colors.Green, Patterns.Forth),
    new FabricTile(Colors.Green, Patterns.Sixth),
    new FabricTile(Colors.Green, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.First),
    new FabricTile(Colors.Pink, Patterns.First),
    new FabricTile(Colors.Yellow, Patterns.Forth),
    new FabricTile(Colors.Yellow, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.LightBlue, Patterns.Fifth),
    new FabricTile(Colors.LightBlue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Fifth),
    new FabricTile(Colors.Pink, Patterns.Fifth),
    new FabricTile(Colors.Pink, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Yellow, Patterns.First),
  ];
  pull(): FabricTile {
    return popAt(this.pool, 0);
  }
}
