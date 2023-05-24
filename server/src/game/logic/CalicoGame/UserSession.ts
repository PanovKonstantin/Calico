import { Bank } from '../Bank/Bank';
import { createBlueBoard } from '../CalicoBoard/BoardFactories';
import CalicoBoard from '../CalicoBoard/CalicoBoard';
import { CatSet } from '../CalicoCat/CatSet';
import {
  DefaultFabricSet,
  FabricSet,
} from '../CalicoTile/FabricTile/FabricSet';
import FabricTile from '../CalicoTile/FabricTile/FabricTile';
import {
  DefaultProjectBank,
  ProjectBank,
} from '../CalicoTile/ProjectTile/ProjectBank';
import ProjectTile from '../CalicoTile/ProjectTile/ProjectTile';
import {
  CellIsTaken,
  UnallowedAction,
} from '../exceptions';
import { BoardState, GameStatus } from '../types';

type UserSessionScore = {
  cats: number;
  projects: number;
  colors: number;
  total: number;
};

export type UserSessionState = {
  status: GameStatus;
  board: BoardState;
  projects: ProjectTile[];
  hand: FabricTile[];
  score: UserSessionScore;
};

export interface UserSession {
  setBoard(board: CalicoBoard): UserSession;
  setBank(bank: Bank): UserSession;
  setMarket(market: FabricSet): UserSession;
  setCats(cats: CatSet): UserSession;
  setProjects(projects: ProjectBank): UserSession;

  state(): UserSessionState;
  score(): UserSessionScore;
  addToHand(id: number): void;
  placeFabricTile(id: number, cellKey: string): void;
  placeProjectTile(id: number, cellKey: string): void;
  completeSettingUp(): void;
}

export class DefaultUserSession implements UserSession {
  static handSize = 2;
  private projects: ProjectBank;
  private hand: FabricSet;
  private status: GameStatus;
  private board: CalicoBoard;
  private bank: Bank;
  private market: FabricSet;
  private cats: CatSet;

  constructor() {
    this.status = 'placing_projects';
    this.hand = new DefaultFabricSet([]);
    this.projects = new DefaultProjectBank();
  }

  setBoard(board: CalicoBoard): UserSession {
    this.board = board;
    return this;
  }

  setBank(bank: Bank): UserSession {
    this.bank = bank;
    return this;
  }

  setMarket(market: FabricSet): UserSession {
    this.market = market;
    return this;
  }

  setCats(cats: CatSet): UserSession {
    this.cats = cats;
    return this;
  }

  setProjects(projects: ProjectBank): UserSession {
    if (projects) {
      this.projects = projects;
    }
    return this;
  }

  state(): UserSessionState {
    return {
      status: this.status,
      board: this.board.state(),
      projects: this.projects.state(),
      hand: this.hand.state(),
      score: this.score(),
    };
  }

  completeSettingUp(): void {
    this.status = 'placing_tile';
    this.fillHand();
  }

  private fillHand(): void {
    while (!this.isHandFull()) {
      const tile = this.bank.pull();
      this.hand.push(tile);
    }
  }

  isHandFull(): boolean {
    const handSize = this.hand.state().length;
    return handSize >= DefaultUserSession.handSize;
  }

  addToHand(id: number): void {
    if (this.status !== 'choosing_from_market') {
      const action = 'choosing tile from market';
      this.throwUnallowedAction(action);
    }
    this.hand.push(this.market.pull(id));
    this.status = 'placing_tile';
  }

  placeFabricTile(id: number, cellKey: string): void {
    if (this.status !== 'placing_tile')
      this.throwUnallowedAction('placing tile');
    const tile = this.hand.pull(id);
    try {
      this.board.putFabricOn(cellKey, tile);
      if (this.board.emptyFabricCells())
        this.status = 'choosing_from_market';
      else this.status = 'finished';
    } catch (error) {
      if (error instanceof CellIsTaken) {
        this.hand.pushAtIndex(tile, id);
      }
      throw error;
    }
  }

  placeProjectTile(id: number, cellKey: string): void {
    if (this.status !== 'placing_projects')
      this.throwUnallowedAction('placing project');
    const project = this.projects.pull(id);
    this.board.placeProjectOn(cellKey, project);
    if (this.board.areProjectCellsFilled()) {
      this.status = 'placing_tile';
    }
  }

  private throwUnallowedAction(during: string) {
    throw new UnallowedAction(during, this.status);
  }

  score(): UserSessionScore {
    const colors = this.colorScore();
    const cats = this.catScore();
    const projects = this.projectScore();
    const total = cats + projects + colors;
    return {
      cats,
      projects,
      colors,
      total,
    };
  }

  colorScore() {
    const groups = this.board.groupByColor();
    const scoringGroups = groups.filter(
      (g) => g.length >= 3,
    );
    const colors = new Set<string>(
      scoringGroups.map((g) => g[0].get().color),
    );
    const score = scoringGroups.length * 3;
    if (colors.size === 6) return score + 3;
    return score;
  }

  catScore(): number {
    return this.cats.scoreOnBoard(this.board);
  }

  projectScore(): number {
    return this.board.projectScore();
  }
}

export interface UserSessionFactory {
  create(): UserSession;
}

export class DefaultUserSessionFactory
  implements UserSessionFactory
{
  create(): UserSession {
    return new DefaultUserSession()
      .setBoard(createBlueBoard())
      .setProjects(new DefaultProjectBank());
  }
}

export interface AddToHandBehavior {
  addToHand(
    hand: FabricSet,
    market: FabricSet,
    id: number,
  ): void;
}

export class DefaultAddToHandBehavior
  implements AddToHandBehavior
{
  addToHand(
    hand: FabricSet,
    market: FabricSet,
    id: number,
  ): void {
    hand.push(market.pull(id));
  }
}
