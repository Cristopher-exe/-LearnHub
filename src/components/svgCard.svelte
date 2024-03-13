<script lang="ts">
  import type { iSVG } from '../types/svg';
  import { toast } from 'svelte-sonner';

  // Utils:
  import { cn } from '@/utils/cn';
  import { MIMETYPE, getSvgContent } from '@/utils/getSvgContent';

  // Icons:
  import {
    CopyIcon,
    LinkIcon,
    ChevronsRight,
    Baseline,
    Sparkles,
    GitFork,
    Star,
    BookMarked,
    ArrowUpRight
  } from 'lucide-svelte';

  // Components & styles:
  import CardSpotlight from './cardSpotlight.svelte';
  import DownloadSvg from './downloadSvg.svelte';
  import { badgeStyles } from '@/ui/styles';

  // Figma
  import { onMount } from 'svelte';
  import { copyToClipboard as figmaCopyToClipboard } from '@/figma/copy-to-clipboard';
  import { insertSVG as figmaInsertSVG } from '@/figma/insert-svg';

  // Props:
  export let svgInfo: iSVG;

  let isInFigma = false;
  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    isInFigma = searchParams.get('figma') === '1';
  });

  // Wordmark SVG:
  let wordmarkSvg = false;

  // Copy SVG to clipboard:
  const copyToClipboard = async (url?: string) => {
    const data = {
      [MIMETYPE]: getSvgContent(url, true)
    };

    if (isInFigma) {
      const content = (await getSvgContent(url, false)) as string;
      figmaCopyToClipboard(content);
    }

    try {
      const clipboardItem = new ClipboardItem(data);
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      const content = (await getSvgContent(url, false)) as string;
      await navigator.clipboard.writeText(content);
    }

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    if (isInFigma) {
      toast.success('Ready to paste in Figma!', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    if (wordmarkSvg) {
      toast.success('Copied wordmark SVG to clipboard!', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    toast.success('Copied to clipboard!', {
      description: `${svgInfo.title} - ${category}`
    });
  };

  const insertSVG = async (url?: string) => {
    const content = (await getSvgContent(url, false)) as string;
    figmaInsertSVG(content);
  };

  // Icon Stroke & Size:
  let iconStroke = 1.8;
  let iconSize = 16;
</script>

<CardSpotlight>
  <div class="flex flex-col rounded-md p-4 w-full">
    <!-- Title -->

    <div class="mb-3 flex flex-row justify-between">
      <div class="flex flex-row space-x-2">
        <BookMarked size={iconSize} strokeWidth={iconStroke} />

        <a
          href={svgInfo.url}
          title="Website"
          target="_blank"
          rel="noopener noreferrer"
          class="truncate text-[15px] font-medium text-balance text-center select-all hover:underline cursor-pointer"
          >{svgInfo.title}</a
        >
      </div>
      <a
        href={svgInfo.url}
        title="Website"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center rounded-md p-1 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      >
        <ArrowUpRight size={iconSize} strokeWidth={iconStroke} />
      </a>
    </div>

    <!-- Description -->
    <div class="flex flex-row">
      <p class="truncate text-[13px] font-medium text-start select-all">
        Lorem ipsum, dolor sit amet consectetur uno.
      </p>
    </div>

    <!-- category -->
    <div class="mt-3 flex items-center space-x-5 justify-start">
      {#if Array.isArray(svgInfo.category)}
        {#each svgInfo.category.sort() as c, index}
          <a href={`/directory/${c.toLowerCase()}`} class={badgeStyles}>{c} </a>
        {/each}
      {:else}
        <a href={`/directory/${svgInfo.category.toLowerCase()}`} class={badgeStyles}>
          {svgInfo.category}
        </a>
      {/if}

      <div class="flex items-center space-x-1">
        <Star size={iconSize} strokeWidth={iconStroke} />
        <span>123</span>
      </div>

      <div class="flex items-center space-x-1">
        <GitFork size={iconSize} strokeWidth={iconStroke} />
        <span>123</span>
      </div>
    </div>
  </div>
</CardSpotlight>
