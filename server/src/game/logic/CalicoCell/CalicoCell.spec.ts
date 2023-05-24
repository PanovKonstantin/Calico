import FabricTile from '../CalicoTile/FabricTile/FabricTile';
import { defaultProjects } from '../CalicoTile/ProjectTile/project';
import Coord from '../CubeCoordinate/CubeCoordinate';
import { CellIsTaken } from '../exceptions';
import FabricCell from './FabricCell';
import ProjectCell from './ProjectCell';

describe('Calico cell works as expected', () => {
  test('Cannot put tile on a taken fabric cell', () => {
    const cell = new FabricCell(new Coord(0, 0));
    const tile1 = new FabricTile();
    const tile2 = new FabricTile();
    cell.put(tile1);
    expect(() => cell.put(tile2)).toThrow(CellIsTaken);
  });

  test('Cannot put tile on a taken project cell', () => {
    const cell = new ProjectCell(new Coord(0, 0));
    const tile1 = defaultProjects[0].clone();
    const tile2 = defaultProjects[1].clone();
    cell.put(tile1);
    expect(() => cell.put(tile2)).toThrow(CellIsTaken);
  });
});
