<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import SVG from '$lib/components/SVG.svelte';
	import { fly } from 'svelte/transition';
	import { patterns } from '$lib/components/patterns';

	let bgColor = '#99c1f1';
	let fgColor = '#f9f06b';
	let pattern = patterns[0];
	let strokeWidth = 5;
	let scale = 0.15;
	let rotation = 60;
	let skewX = 0;
	let skewY = 0;

	let svg: SVGSVGElement;

	let copySuccess = false;
</script>

<svelte:head>
	<title>svg pattern creator</title>
	<meta
		name="description"
		content="An svg pattern creator. Apply scale, skew, and rotation transformations to generate interesting patterns."
	/>
</svelte:head>

<main style:background-color={bgColor} class="relative flex min-h-screen flex-col justify-center">
	<SVG bind:svg {scale} {rotation} {fgColor} {bgColor} {skewX} {skewY} {strokeWidth}>
		<svelte:component this={pattern.component} slot="pattern" />
	</SVG>
	<details
		class="absolute top-4 right-4 w-full max-w-xs space-y-4 rounded-lg bg-white/95 p-2 sm:max-w-sm"
	>
		<summary class="cursor-pointer">customize pattern</summary>
		<fieldset class="flex flex-col gap-2">
			<label>
				<span>pattern</span>
				<select bind:value={pattern}>
					{#each patterns as pattern}
						<option value={pattern}>{pattern.name}</option>
					{/each}
				</select>
			</label>
			<label>
				<span>background color: {bgColor}</span>
				<input bind:value={bgColor} type="color" />
			</label>
			<label>
				<span>foreground color: {fgColor}</span>
				<input bind:value={fgColor} type="color" />
			</label>
			<label>
				<span>stroke width: {strokeWidth}</span>
				<input bind:value={strokeWidth} type="range" min={0} max={50} />
			</label>
			<label>
				<span>scale: {scale}</span>
				<input bind:value={scale} min={0.1} max={1} step={0.01} type="range" />
			</label>
			<label>
				<span>rotation: {rotation}</span>
				<input bind:value={rotation} min={0} max={360} type="range" />
			</label>
			<label>
				<span>skewX: {skewX}</span>
				<input bind:value={skewX} min={0} max={90} type="range" />
			</label>
			<label>
				<span>skewY: {skewY}</span>
				<input bind:value={skewY} min={0} max={90} type="range" />
			</label>
		</fieldset>
		<div class="flex items-center">
			<CopyButton
				on:click={() => {
					if (svg) {
						navigator.clipboard
							.writeText(svg.outerHTML)
							.then(() => {
								copySuccess = true;
							})
							.catch(() => {
								console.error('unable to copy');
							});
					}
				}}
			/>
			{#if copySuccess}
				<p
					transition:fly={{ duration: 800, x: 24 }}
					on:introend={() => {
						copySuccess = false;
					}}
					class="grow text-center"
				>
					pattern copied to clipboard!
				</p>
			{/if}
		</div>
	</details>
</main>
<footer class="fixed bottom-4 right-4 rounded-lg bg-white/95 p-2">
	<a class="underline" href="https://josho.dev">josho.dev</a>
</footer>

<style lang="postcss">
	input[type='color'] {
		@apply rounded-lg p-1;
	}

	select {
		@apply rounded-lg px-2 py-1;
	}

	label {
		@apply flex items-center justify-between;
	}
</style>
