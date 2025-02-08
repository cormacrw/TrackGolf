<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Pagination from '$lib/components/ui/pagination';
	import moment from 'moment';
	import { createColumnHelper, createSvelteTable, getCoreRowModel, getPaginationRowModel, FlexRender } from '$lib/table';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	
	let pagination = $state({
		pageIndex: 0,
		pageSize: 10
	});
	
	const setPagination = (_pagination) => {
		pagination = _pagination;
	};

	type Round = {
		courseName: string;
		courseRating: number;
		courseLength: number;
		coursePar: number;
		roundDate: string;
		roundScore: number;
	};

	const colHelp = createColumnHelper<Round>();

	const columnDefs = [
		colHelp.accessor('roundDate', { header: 'Round Date', cell: ({ row }) => moment(row.original.roundDate).format('MMM D, YYYY') }),
		colHelp.accessor('courseName', { header: 'Course Name' }),
		colHelp.accessor('courseLength', { header: 'Course Length' }),
		colHelp.accessor('coursePar', { header: 'Course Par' }),
		colHelp.accessor('roundScore', { header: 'Score' })
	];

	const table = createSvelteTable({
		data: data.rounds,
		columns: columnDefs,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		rowCount: data.totalRounds,
		onPaginationChange: setPagination,
		state: {
			pagination
		}
	});
</script>

<h1 class="my-6 text-4xl font-bold">Rounds</h1>
<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				{#each table.getHeaderGroups() as headerGroup}
					{#each headerGroup.headers as header}
						<Table.Head>
							<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
						</Table.Head>
					{/each}
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row}
				<Table.Row>
					{#each row.getVisibleCells() as cell}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="mt-4">
	<Pagination.Root count={data.totalRounds} perPage={10} let:pages let:currentPage>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage == page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>
