import ProjectTile from './ProjectTile';
import { defaultProjects } from './project';
import { NotEnoughProjectsToDraw } from '../../exceptions';
import { DefaultProjectBank } from './ProjectBank';

describe('DefaultProjectBank draws projects corrctly', () => {
  test('Draws projects', () => {
    const bank = new DefaultProjectBank(defaultProjects);
    const projects = bank.state();
    expect(projects).toHaveLength(4);
    expect(projects).toBeInstanceOf(Array<ProjectTile>);
  });

  test('Throws if cant draw projects', () => {
    expect(
      () =>
        new DefaultProjectBank(
          defaultProjects,
          defaultProjects.length + 1,
        ),
    ).toThrow(NotEnoughProjectsToDraw);
  });

  test('Projects copies', () => {
    const bank = new DefaultProjectBank(defaultProjects);
    const myProjects = bank.state();
    myProjects.forEach((myProject) => {
      defaultProjects.forEach((project) => {
        expect(myProject).not.toBe(project);
      });
    });
    expect(defaultProjects).toHaveLength(6);
  });
});
