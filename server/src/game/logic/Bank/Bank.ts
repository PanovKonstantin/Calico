import FabricTile, {
  getDefaultTiles,
} from '../CalicoTile/FabricTile/FabricTile';
import { popAt, popAtRandom } from '../utils';

export interface Bank {
  pull(): FabricTile;
}

export class RandomBank implements Bank {
  constructor(
    private pool: FabricTile[] = getDefaultTiles(),
  ) {}
  pull(): FabricTile {
    return popAtRandom(this.pool);
  }
}

export class PullFirstBank implements Bank {
  constructor(
    private pool: FabricTile[] = getDefaultTiles(),
  ) {}
  pull(): FabricTile {
    return popAt(this.pool, 0);
  }
}
