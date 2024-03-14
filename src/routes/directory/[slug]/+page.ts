import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { repos } from '@/data/repos';

import type { iRepos } from '@/types/repos';

export const load = (async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return error(404, 'Not found');
  }

  const reposByCategory = repos.filter((repo: iRepos) => {
    if (Array.isArray(repo.category)) {
      return repo.category.some((categoryItem) => categoryItem.toLowerCase() === slug);
    } else {
      return repo.category.toLowerCase() === slug;
    }
  });

  if (reposByCategory.length === 0) {
    return error(404, 'Not found');
  }

  return {
    category: slug as string,
    repos: reposByCategory
  };
}) satisfies PageLoad;
