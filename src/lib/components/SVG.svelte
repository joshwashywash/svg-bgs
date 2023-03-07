<script lang="ts">
	export let scale = 1;
	export let rotation = 1;
	export let skewX = 0;
	export let skewY = 0;
	export let fgColor = 'black';
	export let bgColor = 'white';
	export let strokeWidth = 1;
	export let fill = false;
	export let d: string;

	$: _strokeWidth = `${strokeWidth}%`;
	export let svg: SVGGElement;
</script>

<svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" bind:this={svg}>
	<defs>
		<pattern
			width="100%"
			height="100%"
			id="pattern"
			patternUnits="userSpaceOnUse"
			patternTransform="scale({scale}) rotate({rotation}) skewX({skewX}) skewY({skewY})"
		>
			<rect width="100%" height="100%" fill={bgColor} />
			<path
				stroke={fgColor}
				stroke-linecap="round"
				fill={fill ? fgColor : 'none'}
				stroke-width={_strokeWidth}
				{d}
			/>
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#pattern)" />
</svg>
