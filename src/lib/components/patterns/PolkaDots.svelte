<script lang="ts">
	const points = [
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 1],
	].map((p) => p.map((xy) => `${100 * xy}%`));
</script>

{#each points as [cx, cy]}
	<circle {cx} {cy} r="25%" />
{/each}
