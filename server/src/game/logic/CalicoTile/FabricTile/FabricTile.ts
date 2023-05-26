import { repeat } from '../../utils';
import { Tile } from '../CalicoTile';

export const Colors = {
  Blue: 'Blue',
  LightBlue: 'LightBlue',
  Pink: 'Pink',
  Purple: 'Purple',
  Green: 'Green',
  Yellow: 'Yellow',
} as const;
export type Color = typeof Colors[keyof typeof Colors];
export const AllColors: Color[] = Object.values(Colors);

export const Patterns = {
  First: 'First',
  Second: 'Second',
  Third: 'Third',
  Forth: 'Forth',
  Fifth: 'Fifth',
  Sixth: 'Sixth',
} as const;
export type Pattern =
  typeof Patterns[keyof typeof Patterns];
export const AllPatterns: Pattern[] =
  Object.values(Patterns);

export default class FabricTile extends Tile {
  constructor(
    public color: Color = 'Blue',
    public pattern: Pattern = 'First',
  ) {
    super();
  }
}

export const getDefaultTiles = (repeats = 3) => {
  const tiles = [];
  AllColors.forEach((color) => {
    AllPatterns.forEach((pattern) => {
      repeat(repeats).forEach(() =>
        tiles.push(new FabricTile(color, pattern)),
      );
    });
  });
  return tiles;
};
