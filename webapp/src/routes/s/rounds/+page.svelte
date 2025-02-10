<script lang="ts">
	import RoundTable from '$lib/components/round/Table.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="my-6 text-4xl font-bold">
	Rounds <span class=" text-gray-400">{data.rounds.length}</span>
</h1>
<RoundTable rounds={data.rounds} />
