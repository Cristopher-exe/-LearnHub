<script lang="ts">
  export let currentPath: string;
  import { cn } from '@/utils/cn';
  import Logo from './logo.svelte';
  import Theme from './theme.svelte';
  import XIcon from './xIcon.svelte';
  import GithubIcon from './githubIcon.svelte';
</script>

<nav
  class={cn(
    'dark:bg-neutral-900 bg-white',
    'w-full px-5 py-4 border-b border-neutral-200 dark:border-neutral-800',
    'sticky top-0 z-50',
    'backdrop-blur-md dark:bg-neutral-900/90 bg-white/90'
  )}
>
  <!-- Se le puso un aria-label al href="/" -->
  <div class="flex items-center justify-between mx-auto">
    <div class="flex items-center space-x-2">
      <a href="/" aria-label="Go to the SVGL v4.1 home page">
        <div class="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
          <svelte:component this={Logo} />
          <span class="text-[19px] font-medium tracking-wide hidden md:block">repoHub</span>
          <p class="text-neutral-400 hidden md:block font-mono">v0.1</p>
        </div>
      </a>
    </div>

    <div class="flex items-center space-x-0 md:space-x-7">
      <div class="flex items-center space-x-4">
        <a
          href="https://twitter.com/devcris_"
          target="_blank"
          class="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-opacity"
          title="Twitter"
        >
          <XIcon iconSize={16} />
        </a>
        <a
          href="https://github.com/Cristopher-exe/repoHub"
          target="_blank"
          class="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-opacity"
          title="GitHub"
        >
          <GithubIcon iconSize={19} />
        </a>
        <Theme />
      </div>
    </div>
  </div>
</nav>
