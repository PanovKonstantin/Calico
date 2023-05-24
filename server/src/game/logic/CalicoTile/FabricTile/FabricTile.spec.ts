import FabricTile from './FabricTile';

describe('Calico tiles work as expected', () => {
  test('Tiles with same properties are equal', () => {
    const tile1 = new FabricTile('Blue', 'First');
    const tile2 = new FabricTile('Blue', 'First');
    expect(tile1).toStrictEqual(tile2);
  });

  test('Tile with diffetent properties are not equal', () => {
    const tile1 = new FabricTile('Blue', 'First');
    const tile2 = new FabricTile('Green', 'Second');
    expect(tile1).not.toStrictEqual(tile2);
  });
});
