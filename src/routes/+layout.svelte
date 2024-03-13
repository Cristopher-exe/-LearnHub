<script lang="ts">
  import type { LayoutServerData } from './$types';
  export let data: LayoutServerData;

  // Global styles:
  import '../app.css';
  import { ModeWatcher, mode } from 'mode-watcher';

  // Get categories:
  import { svgs } from '@/data/svgs';
  const categories = svgs
    .flatMap((svg) => (Array.isArray(svg.category) ? svg.category : [svg.category]))
    .filter((category, index, array) => array.indexOf(category) === index);

  // Toaster:
  import { Toaster } from 'svelte-sonner';

  // Components for all pages:
  import Transition from '@/components/transition.svelte';
  import Warning from '@/components/warning.svelte';

  // Layout:
  import Navbar from '@/components/navbar.svelte';
  import { cn } from '@/utils/cn';
</script>

<ModeWatcher />
<Navbar currentPath={data.pathname} />
<div>
  <nav
    class="flex items-center space-x-1 overflow-x-auto md:mb-3 md:flex-row md:space-x-1 md:space-y-1 md:overflow-x px-5 md:px-5 pb-2 pt-3 md:pt-0"
  >
    <a
      href="/"
      class={`flex w-full items-center rounded-md p-2 transition-none duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 ${
        data.pathname === `/`
          ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
          : ''
      }`}
      data-sveltekit-preload-data>All</a
    >
    <!-- Order alfabetically: -->
    {#each categories.sort() as category}
      <a
        href={`/directory/${category.toLowerCase()}`}
        class={cn(
          'flex w-full items-center justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40',
          data.pathname === `/directory/${category.toLowerCase()}`
            ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
            : ''
        )}
      >
        <span>{category}</span>
      </a>
    {/each}
  </nav>
</div>
<main>
  <div class="ml-0 md:ml-30 pb-6">
    <Warning />
    <Transition pathname={data.pathname}>
      <slot />
    </Transition>
    <Toaster
      position="bottom-right"
      theme={$mode}
      class="toaster group"
      toastOptions={{
        classes: {
          toast: 'group toast dark:group-[.toaster]:bg-neutral-900 group-[.toaster]:font-sans',
          description: 'group-[.toast]:text-xs font-mono'
        }
      }}
    />
  </div>
</main>
