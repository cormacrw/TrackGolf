<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Pagination from '$lib/components/ui/pagination';
	import moment from 'moment';
	import type { Round } from '$lib/types/Round';
	import roundTypes from '$lib/constants/roundTypes';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import SuperDebug from 'sveltekit-superforms';

	let pageNumber = $state(1);

	let sortedRounds = $derived.by(() => {
		return rounds.sort((a, b) => {
			return b.date - a.date;
		});
	});

	let paginatedRounds = $derived.by(() => {
		return sortedRounds.slice((pageNumber - 1) * 10, pageNumber * 10);
	});

	const { rounds } = $props<{
		rounds: Round[];
	}>();
</script>

<div class="mb-4 rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Date</Table.Head>
				<Table.Head>Type</Table.Head>
				<Table.Head>Course</Table.Head>
				<Table.Head>Score</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each paginatedRounds as round}
				<Table.Row>
					<Table.Cell>
						{moment(round.date).format('MMM D, YYYY')}
					</Table.Cell>
					<Table.Cell>
						{roundTypes.find((type) => type.value === round.type)?.label || 'Unknown'}
					</Table.Cell>
					<Table.Cell>
						{round.courseName}
					</Table.Cell>
					<Table.Cell>
						{round.score} ({round.score - round.coursePar})
					</Table.Cell>
					<Table.Cell></Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<Pagination.Root count={rounds.length} perPage={10} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton on:click={() => pageNumber--} />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item isVisible={currentPage == page.value}>
					<Pagination.Link
						{page}
						isActive={currentPage == page.value}
						on:click={() => (pageNumber = page.value)}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton on:click={() => pageNumber++} />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>

{#if PUBLIC_ENVIRONMENT === 'local'}
	<div class="my-6">
		<SuperDebug data={paginatedRounds} label="Rounds" />
	</div>
{/if}
