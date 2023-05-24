export const Colors = {
  Blue: "Blue",
  LightBlue: "LightBlue",
  Pink: "Pink",
  Purple: "Purple",
  Green: "Green",
  Yellow: "Yellow",
} as const;
export type Color = typeof Colors[keyof typeof Colors];
export const AllColors: Color[] = Object.values(Colors);

export const Patterns = {
  First: "First",
  Second: "Second",
  Third: "Third",
  Forth: "Forth",
  Fifth: "Fifth",
  Sixth: "Sixth",
} as const;

export type Pattern =
  typeof Patterns[keyof typeof Patterns];

export const AllPatterns: Pattern[] =
  Object.values(Patterns);

type TileType = {
  color: Color;
  pattern: Pattern;
  isSelected?: boolean;
};

export type ProjectTileType = {
  points: [number, number];
  requirement: number[];
};

export default TileType;
