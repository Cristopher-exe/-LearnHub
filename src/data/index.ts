import type { iSVG } from '@/types/svg';
import type { iRepos } from '@/types/repos';

import { svgs } from './svgs';
import { repos } from './repos';

export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
});

export const reposData = repos.map((repo: iRepos, index: number) => {
  return { id: index, ...repo };
});
