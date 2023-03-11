<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import SVG from '$lib/components/SVG.svelte';
	import { fly } from 'svelte/transition';
	import patterns from '$lib/patterns.json';

	let bgColor = '#99c1f1';
	let fgColor = '#f9f06b';
	let fill = false;
	let strokeWidth = 5;
	let scale = 0.15;
	let rotation = 60;
	let skewX = 0;
	let skewY = 0;
	let checked = false;

	let own = 'm0 0h1v1h-1v-1';

	let svg: SVGSVGElement;

	let copySuccess = false;

	let d = patterns[0].value;
</script>

<svelte:head>
	<title>svg pattern creator</title>
	<meta
		name="description"
		content="An svg pattern creator. Apply scale, skew, and rotation transformations to generate interesting patterns."
	/>
</svelte:head>

<main style:background-color={bgColor} class="relative flex min-h-screen flex-col justify-center">
	<SVG
		bind:svg
		{scale}
		{rotation}
		{fgColor}
		{bgColor}
		{skewX}
		{skewY}
		{strokeWidth}
		{fill}
		d={checked ? own : d}
	/>

	<details
		class="absolute inset-x-4 top-4 space-y-4 rounded-lg border-2 border-black bg-white/95 p-2 sm:right-4 sm:max-w-sm"
	>
		<summary class="cursor-pointer">customize pattern</summary>
		<fieldset class="flex flex-col gap-2">
			<label>
				pattern
				<select bind:value={d}>
					<option disabled>select a pattern</option>
					{#each patterns as { value, name }}
						<option {value}>{name}</option>
					{/each}
				</select>
			</label>
			<label>
				background color: {bgColor}
				<input bind:value={bgColor} type="color" />
			</label>
			<label>
				foreground color: {fgColor}
				<input bind:value={fgColor} type="color" />
			</label>
			<label>
				fill
				<input bind:checked={fill} type="checkbox" />
			</label>
			<label>
				stroke width: {strokeWidth}
				<input bind:value={strokeWidth} type="range" min={0} max={50} />
			</label>
			<label>
				scale: {scale}
				<input bind:value={scale} min={0.01} max={1} step={0.01} type="range" />
			</label>
			<label>
				rotation: {rotation}
				<input bind:value={rotation} min={0} max={360} type="range" />
			</label>
			<label>
				horizontal skew: {skewX}
				<input bind:value={skewX} min={0} max={90} type="range" />
			</label>
			<label>
				vertical skew: {skewY}
				<input bind:value={skewY} min={0} max={90} type="range" />
			</label>
			<label>
				use your own path
				<input bind:checked type="checkbox" />
			</label>
			{#if checked}
				<textarea class="p-1" bind:value={own} placeholder="path data..." />
			{/if}
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
					svg copied to clipboard!
				</p>
			{/if}
		</div>
	</details>
</main>
<footer class="fixed bottom-4 left-4 rounded-lg bg-white/95 p-2">
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
