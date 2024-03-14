<script lang="ts">
  import type { iRepos } from '@/types/repos';

  import { cn } from '@/utils/cn';
  import { queryParam } from 'sveltekit-search-params';

  // Get all svgs:
  import { reposData } from '@/data';

  const allRepos = JSON.parse(JSON.stringify(reposData));

  // Components:
  import Search from '@/components/search.svelte';
  import Container from '@/components/container.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import Grid from '@/components/grid.svelte';
  import NotFound from '@/components/notFound.svelte';

  // URL params
  const searchParam = queryParam('search');

  // Icons:
  import { ArrowDown, ArrowDownUpIcon, ArrowUpDownIcon } from 'lucide-svelte';
  import { buttonStyles } from '@/ui/styles';

  // Search REPOS --------------------------------------------------
  let sorted_2: boolean = false;
  let isFirstLoad_2: boolean = true;
  let showAll_2: boolean = false;

  let searchTerm = $searchParam || '';
  let filteredRepos: iRepos[] = [];

  // Order by last added:
  if (searchTerm.length === 0) {
    filteredRepos = allRepos.sort((a: iRepos, b: iRepos) => {
      return b.id! - a.id!;
    });
  }

  const loadRepos = () => {
    if (isFirstLoad_2 || showAll_2) {
      filteredRepos = allRepos;
      isFirstLoad_2 = false;
    } else {
      filteredRepos = allRepos.slice(0, 30);
    }
  };

  // Search repos:
  const searchRepos = () => {
    $searchParam = searchTerm || null;
    loadRepos();
    filteredRepos = allRepos.filter((repo: iRepos) => {
      let repoTitle = repo.title.toLowerCase();
      return repoTitle.includes(searchTerm.toLowerCase());
    });
  };

  // Clear search:
  const clearSearch_2 = () => {
    searchTerm = '';
    searchRepos();
  };

  // Sort:
  const sort2 = () => {
    if (sorted_2) {
      sortByLatest2();
    } else {
      sortAlphabetically2();
    }
    sorted_2 = !sorted_2;
  };

  // Sort alphabetically:
  const sortAlphabetically2 = () => {
    filteredRepos = allRepos.sort((a: iRepos, b: iRepos) => {
      return a.title.localeCompare(b.title);
    });
  };

  // Sort by latest:
  const sortByLatest2 = () => {
    filteredRepos = filteredRepos.sort((a: iRepos, b: iRepos) => {
      return b.id! - a.id!;
    });
  };

  if ($searchParam) {
    searchRepos();
  } else {
    loadRepos();
  }
  // Search REPOS --------------------------------------------------
</script>

<svelte:head>
  <title>repoHub</title>
</svelte:head>

<Search
  bind:searchTerm
  on:input={searchRepos}
  clearSearch={() => clearSearch_2()}
  placeholder={`Search ${filteredRepos.length} repos...`}
/>

<Container>
  <div class="flex items-center justify-end mb-4">
    <button
      class={cn(
        'flex items-center justify-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity',
        filteredRepos.length === 0 && 'hidden'
      )}
      on:click={() => sort2()}
    >
      {#if sorted_2}
        <ArrowDownUpIcon size={16} strokeWidth={2} class="mr-1" />
      {:else}
        <ArrowUpDownIcon size={16} strokeWidth={2} class="mr-1" />
      {/if}
      <span>{sorted_2 ? 'Sort by latest' : 'Sort alphabetically'}</span>
    </button>
  </div>
  <Grid>
    {#each filteredRepos.slice(0, showAll_2 ? undefined : 30) as repo}
      <SvgCard reposInfo={repo} />
    {/each}
  </Grid>
  {#if filteredRepos.length > 30 && !showAll_2}
    <div class="flex items-center justify-center mt-4">
      <button class={buttonStyles} on:click={() => (showAll_2 = true)}>
        <div class="flex items-center space-x-2 relative">
          <ArrowDown size={16} strokeWidth={2} />
          <span>Load all repos</span>
          <span class="opacity-70">
            ({filteredRepos.length - 30} more)
          </span>
        </div>
      </button>
    </div>
  {/if}
  {#if filteredRepos.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
