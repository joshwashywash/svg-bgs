<script lang="ts">
	import { draggable } from '@neodrag/svelte';
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

	let open = true;

	let handle: HTMLSpanElement;
	let dragging = false;
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
		use:draggable={{ bounds: 'body',handle }}
		on:neodrag:start={() => {
			dragging = true;
		}}
		on:neodrag:end={() => {
			dragging = false;
		}}
		bind:open
		class="absolute inset-x-4 top-4 space-y-4 rounded-lg border-2 border-black bg-white/95 p-2 sm:right-4 sm:max-w-sm"
	>
		<summary class="flex" on:click|preventDefault>
			<button
				on:click={() => {
					open = !open;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
					class:rotate-90={open}
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
			<span
				bind:this={handle}
				class="flex grow cursor-grab justify-center"
				class:cursor-grabbing={dragging}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6 rotate-90"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</span>
		</summary>
		<fieldset class="flex flex-col gap-2">
			<label>
				define your own pattern path
				<input bind:checked type="checkbox" />
			</label>
			{#if checked}
				<textarea class="p-1" bind:value={own} placeholder="path data..." />
			{:else}
				<label>
					pattern
					<select bind:value={d}>
						<option disabled>select a pattern</option>
						{#each patterns as { value, name }}
							<option {value}>{name}</option>
						{/each}
					</select>
				</label>
			{/if}
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
