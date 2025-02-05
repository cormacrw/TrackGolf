<script lang="ts">
	import { makeRequest } from '$lib/api';
  import { Card, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte'
	import { onMount } from 'svelte';
  
  let rounds = []
  
  const getRounds = async () => {
    const response = await makeRequest('/rounds', {
      method: 'GET'
    })

    rounds = response.rows
  }
  
  const getRoundScore = (round: any) => {
    let sign = ''
    if (round.roundScore - round.coursePar > 0) {
      sign = '+'
    } else if (round.roundScore - round.coursePar < 0) {
      sign = '-'
    }

    return `${round.roundScore} (${sign}${Math.abs(round.roundScore - round.coursePar)})`
  }
  
  onMount(() => {
    getRounds()
  })
  
  
</script>
<h1 class="text-2xl font-bold">Dashboard</h1>
<div class="flex flex-row gap-4">
  <Card>
    <p>10</p>
    <h3>Rounds Played</h3>
  </Card>
  <Card>
    <p>10</p>
    <h3>Average Score</h3>
  </Card>
  <Card>
    <p>10</p>
    <h3>Best Score</h3>
  </Card>
</div>

<h2 class="text-xl font-bold mt-4">All Rounds</h2>
<div class="mt-4">
  <Table>
    <TableHead>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>Course</TableHeadCell>
      <TableHeadCell>Length</TableHeadCell>
      <TableHeadCell>Score</TableHeadCell>
      <TableHeadCell>Putts</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each rounds as round}
      <TableBodyRow>
        <TableBodyCell>{round.roundDate}</TableBodyCell>
        <TableBodyCell>{round.courseName}</TableBodyCell>
        <TableBodyCell>{round.courseLength}</TableBodyCell>
        <TableBodyCell>{getRoundScore(round)}</TableBodyCell>
        <TableBodyCell>{round.roundPutts}</TableBodyCell>
      </TableBodyRow>
    {/each}
    </TableBody>
  </Table>
</div>