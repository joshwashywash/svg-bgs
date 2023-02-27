<script lang="ts">
	import SVG from '$lib/components/SVG.svelte';
	let scale = 0.15;
	let rotation = 60;
	let skewX = 0;
	let skewY = 0;
	let bgColor = '#99c1f1';
	let fgColor = '#f9f06b';
</script>

<main style:background-color={bgColor} class="relative">
	<SVG {scale} {rotation} {fgColor} {bgColor} {skewX} {skewY} />
	<details
		class="absolute top-4 right-4 flex w-full max-w-xs flex-col rounded-lg bg-white/95 p-2 sm:max-w-sm"
	>
		<summary class="cursor-pointer">customize pattern</summary>
		<label>
			<span>background color: {bgColor}</span>
			<input bind:value={bgColor} type="color" />
		</label>
		<label>
			<span>foreground color: {fgColor}</span>
			<input bind:value={fgColor} type="color" />
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
	</details>
	<footer class="fixed bottom-4 right-4 rounded-lg bg-white/95 p-2">
		<a class="underline" href="https://josho.dev">josho.dev</a>
	</footer>
</main>

<style lang="postcss">
	input[type='color'] {
		@apply rounded-lg p-1;
	}

	label {
		@apply flex items-center justify-between;
	}
</style>
