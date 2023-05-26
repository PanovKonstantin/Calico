import FabricTile from './FabricTile';

export interface FabricSet {
  pull(index: number): FabricTile;
  push(tile: FabricTile): void;
  pushAtIndex(tile: FabricTile, index: number): void;
  state(): FabricTile[];
}

export class DefaultFabricSet implements FabricSet {
  constructor(private tiles: FabricTile[]) {}
  pull(index: number) {
    return this.tiles.splice(index, 1)[0];
  }

  push(tile: FabricTile): void {
    this.tiles.push(tile);
  }

  pushAtIndex(tile: FabricTile, index: number) {
    this.tiles = [
      ...this.tiles.slice(0, index),
      tile,
      ...this.tiles.slice(index),
    ];
  }

  state(): FabricTile[] {
    return this.tiles;
  }
}
