<script lang="ts">
	import '../../app.css';
	import '$lib/auth';
	import { authGuard } from '$lib/authMiddleware';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/ui/nav/NavBar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { useRoundsStore } from '$lib/stores/rounds';
	import { useLoadingStore } from '$lib/stores/loading';
	import { fetchRounds } from '$lib/requests/rounds';

	let { children } = $props();

	const roundsStore = useRoundsStore();
	const loading = useLoadingStore();

	onMount(async () => {
		loading.set(true);
		await authGuard();
		const rounds = await fetchRounds();
		roundsStore.set(rounds);
		loading.set(false);
	});
</script>

<NavBar />
<main class="container mx-auto max-w-screen-lg">
	{@render children()}
</main>
<Toaster />
