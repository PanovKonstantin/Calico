import CalicoCell from './CalicoCell/CalicoCell';
import { Pattern } from './CalicoTile/FabricTile/FabricTile';
import Coord from './CubeCoordinate/CubeCoordinate';

export class CoordsSumMustBeZero extends Error {
  constructor(q: number, r: number, s: number) {
    super(
      `Cube coordinates ${q}, ${r}, ${s} must sum up to zero`,
    );
  }
}

export class CellDoesNotExist extends Error {
  constructor(coord: string) {
    super(`There is no cell by coordinates ${coord}.`);
  }
}

export class FabricCellDoesNotExist extends Error {
  constructor(coord: string) {
    super(
      `There is no fabric cell by coordinates ${coord}.`,
    );
  }
}

export class ProjectCellDoesNotExist extends Error {
  constructor(coord: string) {
    super(
      `There is no project cell by coordinates ${coord}.`,
    );
  }
}

export class NoSuchTileAvailable extends Error {
  constructor(id: number) {
    super(`There is no tile available with id ${id}.`);
  }
}
export class NoTilesLeft extends Error {
  constructor() {
    super('No tiles left in the bank');
  }
}

export class NotEnoughTilesToDraw extends Error {
  constructor(needToDraw: number, left: number) {
    super(
      `Cannot draw ${needToDraw} tiles, onlut ${left} tiles left.`,
    );
  }
}

export class CellIsTaken extends Error {
  constructor(public cell: CalicoCell) {
    super(
      `Cannot put tile on a taken cell (${cell.coord()})`,
    );
  }
}

export class PatternPoolSize extends Error {
  constructor(patternPool: Array<Pattern>) {
    super(
      `Cannot assign patterns to cat with this pattern pool ${patternPool}`,
    );
  }
}

export class NotEnoughProjectsToDraw extends Error {
  constructor(trysToDraw: number, haveProjects: number) {
    super(
      `Cannot draw ${trysToDraw} projects from ${haveProjects} existing projects`,
    );
  }
}

export class CantPutProjectOnANonprojectCell extends Error {
  constructor(coord: Coord) {
    super(
      `Cannot put project on a cell with coordinates ${coord.array()}`,
    );
  }
}
export class CantPutFabricTileOnAProjectCell extends Error {
  constructor(coord: Coord) {
    super(
      `Cannot put fabric tile on a project cell with coordinates ${coord.array()}`,
    );
  }
}

export class IncorrectCatShape extends Error {
  constructor() {
    super('Cat shape must contain atleast one coordinate');
  }
}

export class UnallowedAction extends Error {
  constructor(action, state) {
    super(
      `Cannot perform ${action} in game state ${state}`,
    );
  }
}

export class HandIsFull extends Error {}

export class MarketIsBlockedByAnotherPlayer extends Error {}
