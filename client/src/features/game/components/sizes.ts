export const tileUnit = "vw";
export const tileSize = 3;
export const tileMargin = 0;

export const getTileWidth = (size = tileSize) =>
  Math.sqrt(3) * size;
export const getTileHeight = (size = tileSize) => 2 * size;
