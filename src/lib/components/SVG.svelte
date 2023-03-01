<script lang="ts">
	export let scale = 1;
	export let rotation = 1;
	export let skewX = 0;
	export let skewY = 0;
	export let fgColor = 'black';
	export let bgColor = 'white';
	export let svg: SVGGElement;

	const points = [
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 1]
	].map((p) => p.map((xy) => `${100 * xy}%`));
</script>

<svg bind:this={svg} viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<pattern
			width="100%"
			height="100%"
			id="pattern"
			patternUnits="userSpaceOnUse"
			patternTransform="scale({scale}) rotate({rotation}) skewX({skewX}) skewY({skewY})"
		>
			<rect width="100%" height="100%" fill={bgColor} />
			<g fill={fgColor}>
				{#each points as [cx, cy]}
					<circle {cx} {cy} r="25%" />
				{/each}
			</g>
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#pattern)" />
</svg>
