import ProjectTile from './ProjectTile';
import {
  AAAABB,
  AAABBB,
  AABBCC,
  AllDiffrent,
  defaultProjects,
} from './project';
import { NotEnoughProjectsToDraw } from '../../exceptions';
import { popAt, popAtRandom, repeat } from '../../utils';

export interface ProjectBank {
  state(): ProjectTile[];
  pull(index: number): ProjectTile;
}

export class BeginnerProjectBank implements ProjectBank {
  private projects: ProjectTile[] = [
    AAABBB.clone(),
    AABBCC.clone(),
    AllDiffrent.clone(),
    AAAABB.clone(),
  ];

  pull(index: number): ProjectTile {
    return popAt(this.projects, index);
  }

  state(): ProjectTile[] {
    return this.projects;
  }
}

export class DefaultProjectBank implements ProjectBank {
  private projects: ProjectTile[];
  constructor(
    pool: ProjectTile[] = defaultProjects,
    needToDraw = 4,
    picker = popAtRandom,
  ) {
    if (pool.length < needToDraw)
      throw new NotEnoughProjectsToDraw(
        needToDraw,
        pool.length,
      );
    const poolCopy = pool.map((p) => p.clone());
    this.projects = repeat(needToDraw).map(() =>
      picker(poolCopy),
    );
  }

  pull(index: number): ProjectTile {
    return popAt(this.projects, index);
  }

  state() {
    return this.projects;
  }
}
export interface ProjectBankFactory {
  craete(): ProjectBank;
}

export class StandardProjectBankFactory
  implements ProjectBankFactory
{
  craete(): ProjectBank {
    return new DefaultProjectBank();
  }
}

export class BeginnerProjectBankFactory
  implements ProjectBankFactory
{
  craete(): ProjectBank {
    return new BeginnerProjectBank();
  }
}
