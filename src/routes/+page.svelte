<script lang="ts">
	import {
		Button,
		Checkbox,
		Color,
		Folder,
		List,
		Pane,
		Separator,
		Slider,
		Textarea
	} from 'svelte-tweakpane-ui';

	let { data = $bindable() } = $props();

	let patternTransform = $derived(
		`scale(${data.svg.transformation.scale.value}) rotate(${data.svg.transformation.rotation.value}) skewX(${data.svg.transformation.skewX.value}) skewY(${data.svg.transformation.skewY.value})`
	);

	let bgColor = $derived(`${data.svg.color.background.value}`);
	let fgColor = $derived(`${data.svg.color.foreground.value}`);

	let strokeWidth = $derived(`${data.svg.stroke.width.value}%`);

	const patternId = 'pattern';

	let useCustomPath = $state(false);

	let d = $derived(
		useCustomPath
			? data.svg.path.custom.value
			: data.svg.path.premade.paths[data.svg.path.premade.value]
	);

	let svg: SVGSVGElement | null = $state(null);
	let copying = $state(false);
</script>

<Pane position="draggable" title="Config">
	<Folder title={data.titles.path}>
		<Checkbox bind:value={useCustomPath} label="use custom path" />
		{#if useCustomPath}
			<Textarea
				bind:value={data.svg.path.custom.value}
				placeholder="your svg path goes here"
			/>
		{:else}
			<List
				bind:value={data.svg.path.premade.value}
				options={data.svg.path.premade.options}
				label={data.svg.path.premade.label}
			/>
		{/if}
	</Folder>
	<Folder title={data.titles.color}>
		<Color
			bind:value={data.svg.color.foreground.value}
			label={data.svg.color.foreground.label}
		/>
		<Color
			bind:value={data.svg.color.background.value}
			label={data.svg.color.background.label}
		/>
		<Checkbox
			bind:value={data.svg.color.fill.value}
			label={data.svg.color.fill.label}
		/>
	</Folder>
	<Folder title={data.titles.stroke}>
		<Slider
			bind:value={data.svg.stroke.width.value}
			label={data.svg.stroke.width.label}
			max={data.svg.stroke.width.max}
			min={data.svg.stroke.width.min}
		/>
		<List
			bind:value={data.svg.stroke.lineCap.value}
			label={data.svg.stroke.lineCap.label}
			options={data.svg.stroke.lineCap.options}
		/>
	</Folder>
	<Folder title={data.titles.transformation}>
		<Slider
			bind:value={data.svg.transformation.scale.value}
			label={data.svg.transformation.scale.label}
			max={data.svg.transformation.scale.max}
			min={data.svg.transformation.scale.min}
		/>
		<Slider
			bind:value={data.svg.transformation.rotation.value}
			label={data.svg.transformation.rotation.label}
			max={data.svg.transformation.rotation.max}
			min={data.svg.transformation.rotation.min}
		/>
		<Slider
			bind:value={data.svg.transformation.skewX.value}
			label={data.svg.transformation.skewX.label}
			max={data.svg.transformation.skewX.max}
			min={data.svg.transformation.skewX.min}
		/>
		<Slider
			bind:value={data.svg.transformation.skewY.value}
			label={data.svg.transformation.skewY.label}
			max={data.svg.transformation.skewY.max}
			min={data.svg.transformation.skewY.min}
		/>
	</Folder>
	<Folder title={data.titles.miscellaneous}>
		<List
			bind:value={data.svg.miscellaneous.patternUnit.value}
			label={data.svg.miscellaneous.patternUnit.label}
			options={data.svg.miscellaneous.patternUnit.options}
		/>
	</Folder>
	<Separator />
	<Button
		disabled={copying}
		title="copy svg to clipboard"
		on:click={() => {
			if (svg !== undefined) {
				copying = true;
				if (svg !== null) {
					navigator.clipboard.writeText(svg.outerHTML).finally(() => {
						copying = false;
					});
				}
			}
		}}
	/>
</Pane>

<div class="h-screen overflow-hidden">
	<svg viewBox="0 0 1 1" bind:this={svg}>
		<defs>
			<pattern
				width="100%"
				height="100%"
				id={patternId}
				patternUnits={data.svg.miscellaneous.patternUnit.value}
				{patternTransform}
			>
				<rect width="100%" height="100%" fill={bgColor} />
				<path
					stroke-width={strokeWidth}
					stroke={fgColor}
					{d}
					stroke-linecap={data.svg.stroke.lineCap.value}
					fill={data.svg.color.fill.value ? fgColor : 'none'}
				/>
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill={`url(#${patternId})`} />
	</svg>
</div>
