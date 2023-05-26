import { Tile } from '../CalicoTile';
import { Color, Pattern } from '../FabricTile/FabricTile';

export default class ProjectTile extends Tile {
  private requirement: number[];
  private points: [number, number];
  constructor(
    requirement: number[],
    points: [number, number],
  ) {
    super();
    this.requirement = requirement.sort();
    this.points = points;
  }

  getReqs() {
    return JSON.parse(JSON.stringify(this.requirement));
  }

  clone() {
    return new ProjectTile(this.requirement, this.points);
  }

  getPoints(id) {
    return this.points[id];
  }

  scoresOn(colors: Array<Color>, patterns: Array<Pattern>) {
    const satisfyPattern = this.doesSatisfy(patterns);
    const satisfyColor = this.doesSatisfy(colors);
    return satisfyPattern && satisfyColor
      ? this.points[1]
      : satisfyPattern || satisfyColor
      ? this.points[0]
      : 0;
  }

  private doesSatisfy(group: Color[] | Pattern[]): boolean {
    const repeats = new Map<number, number>();

    group.forEach((e) => {
      if (repeats.has(e))
        repeats.set(e, repeats.get(e) + 1);
      else repeats.set(e, 1);
    });
    const found = Array.from(repeats.values()).sort();

    if (found.length !== this.requirement.length)
      return false;
    return found.every(
      (element, id) => this.requirement[id] === element,
    );
  }
}
