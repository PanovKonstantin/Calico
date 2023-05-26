import ProjectTile from './ProjectTile';

export type projectData = {
  requirement: number[];
  points: [number, number];
};

export const AAAABB = new ProjectTile([4, 2], [8, 14]);
export const AAABBB = new ProjectTile([3, 3], [8, 13]);
export const AAABBC = new ProjectTile([3, 2, 1], [7, 11]);
export const AABBCC = new ProjectTile([2, 2, 2], [7, 11]);
export const AABBCD = new ProjectTile([2, 2, 1, 1], [5, 8]);
export const AllDiffrent = new ProjectTile(
  [1, 1, 1, 1, 1, 1],
  [10, 15],
);

export const defaultProjects = [
  AAAABB,
  AAABBB,
  AAABBC,
  AABBCC,
  AABBCD,
  AllDiffrent,
];
