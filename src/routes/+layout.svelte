<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.page.title}</title>
</svelte:head>
<meta name="description" content={$page.data.page.description} />

<slot />
