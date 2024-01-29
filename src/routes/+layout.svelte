<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.page.title}</title>
</svelte:head>
<meta name="description" content={$page.data.page.description} />

<div class="max-h-screen h-full overflow-y-hidden items-center">
	<slot />
	<footer class="fixed bottom-4 left-4 rounded-lg bg-white p-2">
		<a class="underline" href="https://josho.dev">josho.dev</a>
	</footer>
</div>
