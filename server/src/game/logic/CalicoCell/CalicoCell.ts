import { Tile } from '../CalicoTile/CalicoTile';
import Coord from '../CubeCoordinate/CubeCoordinate';

export default abstract class CalicoCell {
  constructor(private _coord: Coord) {}

  coord(): Coord {
    return this._coord;
  }
  key(): string {
    return this._coord.hash();
  }
  state() {
    return {
      key: this._coord.key,
      coord: this._coord.toOffset(),
    };
  }
  abstract put(tile: Tile): void;
  abstract get(): Tile;
}
