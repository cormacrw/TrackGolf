<script lang="ts">
	import '$lib/auth'
	import { authGuard } from '$lib/authMiddleware'
	import { onMount } from 'svelte'
	import NavBar from '../../components/NavBar.svelte'

	let { children } = $props()

	onMount(async () => {
		await authGuard()
	})
</script>

<NavBar />
<main class="container mx-auto">
	{@render children()}
</main>
