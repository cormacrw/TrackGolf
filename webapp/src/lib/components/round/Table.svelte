<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Pagination from '$lib/components/ui/pagination';
	import moment from 'moment';
	import type { Round } from '$lib/types/Round';
	import roundTypes from '$lib/constants/roundTypes';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import SuperDebug from 'sveltekit-superforms';
	import Trash from 'lucide-svelte/icons/trash';
	import Button from '../ui/button/button.svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import { makeRequest } from '$lib/api';
	import { useRoundsStore } from '$lib/stores/rounds';
	import { fetchRounds } from '$lib/requests/rounds';
	import { toast } from 'svelte-sonner';

	const rounds = useRoundsStore();

	let pageNumber = $state(1);

	let sortedRounds = $derived.by(() => {
		return $rounds.sort((a, b) => {
			return b.date - a.date;
		});
	});

	let paginatedRounds = $derived.by(() => {
		return sortedRounds.slice((pageNumber - 1) * 10, pageNumber * 10);
	});

	const getRoundRelativeScore = (round: Round) => {
		let prefix = '';
		if (round.coursePar > round.score) {
			prefix = '-';
		} else if (round.coursePar < round.score) {
			prefix = '+';
		}

		return prefix + Math.abs(round.coursePar - round.score);
	};

	const deleteRound = async (round: Round) => {
		await makeRequest(`/round/${round.roundId}`, {
			method: 'DELETE',
		});

		const _rounds = await fetchRounds();
		rounds.set(_rounds);

		toast.success('Round deleted successfully!');
	};
</script>

<div class="mb-4 rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Created</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head>Type</Table.Head>
				<Table.Head>Course</Table.Head>
				<Table.Head>Score</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if paginatedRounds.length === 0}
				<Table.Row>
					<Table.Cell colspan={5} class="text-center">No rounds found!</Table.Cell>
				</Table.Row>
			{:else}
				{#each paginatedRounds as round}
					<Table.Row>
						<Table.Cell>
							{moment(round.createdAt).fromNow()}
						</Table.Cell>
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
							{round.score} ({getRoundRelativeScore(round)})
						</Table.Cell>
						<Table.Cell class="flex justify-end gap-2 p-2">
							<DeleteDialog submit={() => deleteRound(round)}>
								<Button variant="ghost" size="icon">
									<Trash class="h-4 w-4 text-red-600" />
								</Button>
							</DeleteDialog>
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>

{#if $rounds.length > 10}
	<Pagination.Root count={$rounds.length} perPage={10} let:pages let:currentPage>
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
{/if}

{#if PUBLIC_ENVIRONMENT === 'local'}
	<div class="my-6">
		<SuperDebug data={paginatedRounds} label="Rounds" />
	</div>
{/if}
