<script lang="ts">
	import RoundTable from '$lib/components/round/Table.svelte';
	import { useRoundsStore } from '$lib/stores/rounds';
	const rounds = useRoundsStore();
</script>

<h1 class="my-6 text-4xl font-bold">
	Rounds <span class=" text-gray-400">{$rounds.length}</span>
</h1>
<RoundTable rounds={$rounds} />
