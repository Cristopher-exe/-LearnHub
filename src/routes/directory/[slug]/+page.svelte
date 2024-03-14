<script lang="ts">
  import type { PageData } from './$types';
  import type { iRepos } from '@/types/repos';
  import { queryParam } from 'sveltekit-search-params';

  export let data: PageData;
  let reposByCategory = data.repos || [];
  let category = data.category || '';

  // Components:
  import Container from '@/components/container.svelte';
  import Grid from '@/components/grid.svelte';
  import Search from '@/components/search.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import NotFound from '@/components/notFound.svelte';

  // URL params
  const searchParam = queryParam('search');

  let searchTerm = $searchParam || '';
  let filteredRepos: iRepos[] = [];

  if (searchTerm.length === 0) {
    filteredRepos = reposByCategory.sort((a: iRepos, b: iRepos) => {
      return a.title.localeCompare(b.title);
    });
  }

  const searchRepos = () => {
    $searchParam = searchTerm || null;
    return (filteredRepos = reposByCategory.filter((repo: iRepos) => {
      let repoTitle = repo.title.toLowerCase();
      return repoTitle.includes(searchTerm.toLowerCase());
    }));
  };

  const clearSearch2 = () => {
    searchTerm = '';
    searchRepos();
  };

  if ($searchParam) {
    searchRepos();
  }
</script>

<svelte:head>
  <title>{category} - repoHub</title>
</svelte:head>

<Container>
  <Search
    bind:searchTerm
    on:input={searchRepos}
    clearSearch={() => clearSearch2()}
    placeholder={`Search ${filteredRepos.length} ${category} repos...`}
  />
  <Grid>
    {#each filteredRepos as repo}
      <SvgCard reposInfo={repo} />
    {/each}
  </Grid>

  {#if filteredRepos.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
