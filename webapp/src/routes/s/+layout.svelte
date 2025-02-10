<script lang="ts">
	import '../../app.css'
	import '$lib/auth'
	import { authGuard } from '$lib/authMiddleware'
	import { onMount } from 'svelte'
	import NavBar from '$lib/components/ui/nav/NavBar.svelte'
  import { Toaster } from "$lib/components/ui/sonner";

	let { children } = $props()

	onMount(async () => {
		await authGuard()
	})
</script>

<NavBar />
<main class="container mx-auto max-w-screen-lg">
	{@render children()}
</main>
<Toaster />