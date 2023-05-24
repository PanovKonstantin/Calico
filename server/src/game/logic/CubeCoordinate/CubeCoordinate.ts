import { OffsetCoordsinates } from '../types';
import { repeat } from '../utils';
export enum Rotation {
  d0 = 0,
  d60,
  d120,
  d180,
  d240,
  d300,
}

export default class Coord {
  private q: number;
  private r: number;
  public readonly key: string;
  static fromOffset(col: number, row: number): Coord {
    const q = col - (row + (row & 1)) / 2;
    const r = row;
    return new Coord(q, r);
  }
  constructor(q: number, r: number) {
    this.q = q === -0 ? 0 : q;
    this.r = r === -0 ? 0 : r;
    this.key = this.hash();
  }

  array(): [number, number] {
    return [this.q, this.r];
  }

  hash() {
    return `q${this.q}r${this.r}`;
  }

  isEqual(coordinate: Coord): boolean {
    const [q, r] = coordinate.array();
    return this.q === q && this.r === r;
  }

  toOffset(): OffsetCoordsinates {
    return [this.q + (this.r + (this.r & 1)) / 2, this.r];
  }

  plus(coord: Coord): Coord {
    const [q, r] = coord.array();
    return new Coord(this.q + q, this.r + r);
  }

  times(n: number): Coord {
    return new Coord(this.q * n, this.r * n);
  }

  neighbors(): Array<Coord> {
    return Directions.map((direct) => this.plus(direct));
  }

  rotate(times: Rotation): Coord {
    let [q, r] = [this.q, this.r];
    repeat(times).forEach(() => ([q, r] = [-r, q + r]));
    return new Coord(q, r);
  }
}

export const ZeroCoord = new Coord(0, 0);
export const R = new Coord(1, 0);
export const L = new Coord(-1, 0);
export const TR = new Coord(1, -1);
export const TL = new Coord(0, -1);
export const BR = new Coord(0, 1);
export const BL = new Coord(-1, 1);

export const Directions = Object.freeze([
  R,
  L,
  TR,
  TL,
  BL,
  BR,
]);
