import type { tCategoryRepos } from './categories';

type CategoryPair = [tCategoryRepos, tCategoryRepos];
type CategoryTriple = [tCategoryRepos, tCategoryRepos, tCategoryRepos];

type ThemeOptions = {
  dark: string;
  light: string;
};

export interface iRepos {
  id?: number;
  title: string;
  description: string;
  category: tCategoryRepos | CategoryPair | CategoryTriple;
  start: number;
  fork: number;
  route: string | ThemeOptions;
  url: string;
}
