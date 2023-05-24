import {
  Bank,
  PullFirstBank,
  RandomBank,
} from '../Bank/Bank';
import { DefaultBoardPool } from '../CalicoBoard/BoardFactories';
import { BeginnerCatSet } from '../CalicoCat/CatSet';
import { DefaultFabricSet } from '../CalicoTile/FabricTile/FabricSet';
import FabricTile, {
  Colors,
  Patterns,
} from '../CalicoTile/FabricTile/FabricTile';
import { BeginnerProjectBank } from '../CalicoTile/ProjectTile/ProjectBank';
import { popAt } from '../utils';
import CalicoGame, { StandardGame } from './CalicoGame';

export function createBeginnerGame(): CalicoGame {
  return new BeginnerGame();
}

export class BeginnerGame extends CalicoGame {
  protected factory(): void {
    this.setBoardPool(new DefaultBoardPool())
      .setBank(new RandomBank())
      .setMarket(new DefaultFabricSet([]))
      .setProjectFactory(() => new BeginnerProjectBank())
      .setCats(new BeginnerCatSet());
  }
}

export class ExampleBank implements Bank {
  private pool = [
    new FabricTile(Colors.Purple, Patterns.Second), //3
    new FabricTile(Colors.Purple, Patterns.Second), //3-
    new FabricTile(Colors.Purple, Patterns.First), //4
    new FabricTile(Colors.LightBlue, Patterns.First), //1
    new FabricTile(Colors.LightBlue, Patterns.Second), //2
    new FabricTile(Colors.Purple, Patterns.First), //4-
    new FabricTile(Colors.Green, Patterns.Third), //5
    new FabricTile(Colors.Green, Patterns.Third), //5-
    new FabricTile(Colors.Blue, Patterns.First), //6
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Green, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Green, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Green, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Blue, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Pink, Patterns.First),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Yellow, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.LightBlue, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Purple, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Pink, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Blue, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Blue, Patterns.Fifth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Purple, Patterns.Sixth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Pink, Patterns.Forth),
    new FabricTile(Colors.Blue, Patterns.First), //-
    new FabricTile(Colors.Yellow, Patterns.First),
    new FabricTile(Colors.Blue, Patterns.First), //-
  ];
  pull(): FabricTile {
    return popAt(this.pool, 0);
  }
}
