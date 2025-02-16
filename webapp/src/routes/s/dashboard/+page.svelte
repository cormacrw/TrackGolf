<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import DonutChart from '$lib/components/ui/chart/donut.svelte';
	import { getAnalytics } from '$lib/analytics/analytics';
	import { useRoundsStore } from '$lib/stores/rounds';
	import { useLoadingStore } from '$lib/stores/loading';
	import {
		createAverageScoreOverTimeChartData,
		createRoundTypesChartData,
		createUnderOverParChartData,
	} from '$lib/analytics/charts';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import SuperDebug from 'sveltekit-superforms';
	import Line from '$lib/components/ui/chart/line.svelte';

	const rounds = useRoundsStore();
	const loading = useLoadingStore();
	const analytics = $derived.by(() => getAnalytics($rounds));
</script>

<h1 class="mt-6 text-4xl font-bold">Analytics</h1>
<div class="mt-6 flex flex-row flex-wrap gap-4">
	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Total Rounds</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">{analytics.totalRounds}</h3>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Average Score</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">{analytics.averageScore}</h3>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Best / Worst Score</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">{analytics.bestRound} / {analytics.worstRound}</h3>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Average Putts</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">{analytics.averagePutts}</h3>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Average Fairways In Regulation</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">
					{analytics.averageFairwayPercentage}%
				</h3>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="min-w-60 flex-1">
		<Card.Content>
			<p>Average Greens In Regulation</p>
			{#if $loading}
				<Skeleton class="h-16 w-20 rounded-full" />
			{:else}
				<h3 class="text-6xl font-bold">{analytics.averageGreenInRegulationPercentage}%</h3>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<div class="mt-6 flex flex-row gap-4">
	<Card.Root class="flex-1">
		<Card.Header>
			<Card.Title>Round Types</Card.Title>
		</Card.Header>
		<Card.Content>
			{#if $loading}
				<Skeleton class="h-80 w-full rounded-full" />
			{:else}
				<DonutChart data={createRoundTypesChartData(analytics.roundTypesCount)} options={{}} />
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root class="flex-1">
		<Card.Header>
			<Card.Title>Under/Over Par</Card.Title>
		</Card.Header>
		<Card.Content>
			{#if $loading}
				<Skeleton class="h-80 w-full rounded-full" />
			{:else}
				<DonutChart
					data={createUnderOverParChartData(
						analytics.underParCount,
						analytics.overParCount,
						analytics.levelParCount,
					)}
					options={{}}
				/>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<Card.Root class="mt-6">
	<Card.Header>
		<Card.Title>Average Score Over Time</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if $loading}
			<Skeleton class="h-80 w-full rounded-full" />
		{:else}
			<Line
				data={createAverageScoreOverTimeChartData(analytics.scoresByWeek)}
				options={{ plugins: { legend: { display: false } } }}
			/>
		{/if}
	</Card.Content>
</Card.Root>

{#if PUBLIC_ENVIRONMENT === 'local'}
	<div class="my-6">
		<SuperDebug data={analytics} label="Analytics" />
	</div>
{/if}
