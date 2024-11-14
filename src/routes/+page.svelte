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

	let premade = $state(data.svg.path.premade.value);
	let premadePath = $derived(data.svg.path.premade.paths[premade]);

	// colors
	let bgColor = $state(`${data.svg.color.background.value}`);
	let fgColor = $state(`${data.svg.color.foreground.value}`);
	let _fill = $state(data.svg.color.fill.value);
	let fill = $derived(_fill ? fgColor : 'none');

	// stroke
	let strokeWidth = $state(data.svg.stroke.width.value);
	let strokeWidthPercent = $derived(`${strokeWidth}%`);
	let lineCap = $state(data.svg.stroke.lineCap.value);

	// transform
	let scale = $state(data.svg.transformation.scale.value);
	let rotation = $state(data.svg.transformation.rotation.value);
	let skewX = $state(data.svg.transformation.skewX.value);
	let skewY = $state(data.svg.transformation.skewY.value);

	// miscellaneous
	let patternUnits = $state(data.svg.miscellaneous.patternUnits.value);

	let patternTransform = $derived(
		`scale(${scale}) rotate(${rotation}) skewX(${skewX}) skewY(${skewY})`
	);

	const patternId = 'pattern';

	let useCustomPath = $state(false);

	let customPath = $state(data.svg.path.custom.value);

	let d = $derived(useCustomPath ? customPath : premadePath);

	let svg: SVGSVGElement | null = $state(null);
	let copying = $state(false);
</script>

<Pane
	position="draggable"
	title="Config"
>
	<Folder title={data.titles.path}>
		<Checkbox
			bind:value={useCustomPath}
			label="use custom path"
		/>
		{#if useCustomPath}
			<Textarea
				bind:value={customPath}
				placeholder="your svg path goes here"
			/>
		{:else}
			<List
				bind:value={premade}
				options={data.svg.path.premade.options}
				label={data.svg.path.premade.label}
			/>
		{/if}
	</Folder>
	<Folder title={data.titles.color}>
		<Color
			bind:value={fgColor}
			label={data.svg.color.foreground.label}
		/>
		<Color
			bind:value={bgColor}
			label={data.svg.color.background.label}
		/>
		<Checkbox
			bind:value={_fill}
			label={data.svg.color.fill.label}
		/>
	</Folder>
	<Folder title={data.titles.stroke}>
		<Slider
			bind:value={strokeWidth}
			label={data.svg.stroke.width.label}
			max={data.svg.stroke.width.max}
			min={data.svg.stroke.width.min}
		/>
		<List
			bind:value={lineCap}
			label={data.svg.stroke.lineCap.label}
			options={data.svg.stroke.lineCap.options}
		/>
	</Folder>
	<Folder title={data.titles.transformation}>
		<Slider
			bind:value={scale}
			label={data.svg.transformation.scale.label}
			max={data.svg.transformation.scale.max}
			min={data.svg.transformation.scale.min}
		/>
		<Slider
			bind:value={rotation}
			label={data.svg.transformation.rotation.label}
			max={data.svg.transformation.rotation.max}
			min={data.svg.transformation.rotation.min}
		/>
		<Slider
			bind:value={skewX}
			label={data.svg.transformation.skewX.label}
			max={data.svg.transformation.skewX.max}
			min={data.svg.transformation.skewX.min}
		/>
		<Slider
			bind:value={skewY}
			label={data.svg.transformation.skewY.label}
			max={data.svg.transformation.skewY.max}
			min={data.svg.transformation.skewY.min}
		/>
	</Folder>
	<Folder title={data.titles.miscellaneous}>
		<List
			bind:value={patternUnits}
			label={data.svg.miscellaneous.patternUnits.label}
			options={data.svg.miscellaneous.patternUnits.options}
		/>
	</Folder>
	<Separator />
	<Button
		disabled={copying}
		title="copy svg to clipboard"
		on:click={() => {
			if (svg !== null) {
				copying = true;
				navigator.clipboard.writeText(svg.outerHTML).finally(() => {
					copying = false;
				});
			}
		}}
	/>
</Pane>

<div class="h-screen overflow-hidden">
	<svg
		viewBox="0 0 1 1"
		bind:this={svg}
	>
		<defs>
			<pattern
				width="100%"
				height="100%"
				id={patternId}
				{patternUnits}
				{patternTransform}
			>
				<rect
					width="100%"
					height="100%"
					fill={bgColor}
				/>
				<path
					stroke-width={strokeWidthPercent}
					stroke={fgColor}
					{d}
					stroke-linecap={lineCap}
					{fill}
				/>
			</pattern>
		</defs>
		<rect
			width="100%"
			height="100%"
			fill={`url(#${patternId})`}
		/>
	</svg>
</div>
