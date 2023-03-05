<script lang="ts">
	export let scale = 1;
	export let rotation = 1;
	export let skewX = 0;
	export let skewY = 0;
	export let fgColor = 'black';
	export let bgColor = 'white';
	export let strokeWidth = 1;

	$: _strokeWidth = `${strokeWidth}%`;
	export let svg: SVGGElement;
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
			<g fill={fgColor} stroke={fgColor} stroke-width={_strokeWidth}>
				<slot name="pattern" />
			</g>
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#pattern)" />
</svg>
