import Coord, { Rotation } from './CubeCoordinate';

describe('CubeCoordinate', () => {
  test('Constructs from offset', () => {
    const c = Coord.fromOffset(2, 2);
    expect(c.array()).toStrictEqual([1, 2]);
  });

  test('Constructs from -0', () => {
    const c = new Coord(-0, -0);
    expect(c.array()).toStrictEqual([0, 0]);
  });
  test('hashes', () => {
    const coord = new Coord(1, 2);
    expect(coord.hash()).toBe('q1r2');
  });

  test('equals', () => {
    expect(
      new Coord(0, 0).isEqual(new Coord(0, 0)),
    ).toBeTruthy();
    expect(
      new Coord(1, 2).isEqual(new Coord(-2, 1)),
    ).toBeFalsy();
  });

  test('plus', () => {
    const c1 = new Coord(1, 0);
    const c2 = new Coord(4, 1);
    expect(c1.plus(c2)).toStrictEqual(new Coord(5, 1));
  });
  test('Get neighbors', () => {
    const c1 = new Coord(1, 1);
    expect(c1.neighbors()).toStrictEqual([
      new Coord(2, 1),
      new Coord(0, 1),
      new Coord(2, 0),
      new Coord(1, 0),
      new Coord(0, 2),
      new Coord(1, 2),
    ]);
  });

  test('Rotate', () => {
    const c1 = new Coord(1, 0);
    expect(c1.rotate(Rotation.d0).hash()).toBe('q1r0');
    expect(c1.rotate(Rotation.d60).hash()).toBe('q0r1');
    expect(c1.rotate(Rotation.d240).hash()).toBe('q0r-1');
    expect(
      new Coord(1, -3).rotate(Rotation.d180).hash(),
    ).toBe('q-1r3');
  });
});
