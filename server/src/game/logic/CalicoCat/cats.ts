import Coord from '../CubeCoordinate/CubeCoordinate';
import CalicoCat, { CatLevel } from './CalicoCat';
import { CalicoShapeCat } from './CalicoShapeCat';
import { CalicoSizeCat } from './CalicoSizeCat';

export const Millie = new CalicoSizeCat(
  CatLevel.Easy,
  3,
  'Millie',
  3,
);

export const Tibbit = new CalicoSizeCat(
  CatLevel.Easy,
  5,
  'Tibbit',
  4,
);

export const Coconut = new CalicoSizeCat(
  CatLevel.Medium,
  7,
  'Coconut',
  5,
);

export const Cira = new CalicoSizeCat(
  CatLevel.Medium,
  9,
  'Cira',
  6,
);

export const Gwenivere = new CalicoSizeCat(
  CatLevel.Hard,
  11,
  'Gwenivere',
  7,
);

export const Callie = new CalicoShapeCat(
  CatLevel.Easy,
  3,
  'Callie',
  [new Coord(0, 0), new Coord(1, 0), new Coord(0, 1)],
);

export const Rumi = new CalicoShapeCat(
  CatLevel.Easy,
  5,
  'Rumi',
  [new Coord(0, 0), new Coord(1, 0), new Coord(2, 0)],
);

export const Tecolote = new CalicoShapeCat(
  CatLevel.Medium,
  7,
  'Tecolote',
  [
    new Coord(0, 0),
    new Coord(1, 0),
    new Coord(2, 0),
    new Coord(3, 0),
  ],
);

export const Almond = new CalicoShapeCat(
  CatLevel.Medium,
  9,
  'Almond',
  [
    new Coord(0, 0),
    new Coord(1, 0),
    new Coord(-1, 1),
    new Coord(0, 1),
    new Coord(1, 1),
  ],
);

export const Leo = new CalicoShapeCat(
  CatLevel.Hard,
  11,
  'Leo',
  [
    new Coord(0, 0),
    new Coord(1, 0),
    new Coord(2, 0),
    new Coord(3, 0),
    new Coord(4, 0),
  ],
);

export const easyCats: Array<CalicoCat> = [
  Millie,
  Tibbit,
  Callie,
  Rumi,
];
export const mediumCats: Array<CalicoCat> = [
  Coconut,
  Cira,
  Tecolote,
  Almond,
];
export const hardCats: Array<CalicoCat> = [Gwenivere, Leo];
export const CatsByLevel = new Map<CatLevel, CalicoCat[]>([
  [CatLevel.Easy, easyCats],
  [CatLevel.Medium, mediumCats],
  [CatLevel.Hard, hardCats],
]);

export const defaultCats = [
  Millie,
  Tibbit,
  Coconut,
  Cira,
  Gwenivere,
  Callie,
  Rumi,
  Tecolote,
  Almond,
  Leo,
];
