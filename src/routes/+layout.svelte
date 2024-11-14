<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{$page.data.page.title}</title>
</svelte:head>
<meta
	name="description"
	content={$page.data.page.description}
/>

{@render children?.()}

<footer class="fixed bottom-4 left-4 rounded-lg bg-white p-2 flex gap-2">
	<a
		class="underline"
		href="https://github.com/joshwashywash/svg-patterns">readme</a
	>
	<a
		class="underline"
		href="https://josho.dev">josho.dev</a
	>
</footer>
