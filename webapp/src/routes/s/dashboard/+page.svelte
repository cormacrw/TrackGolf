<script lang="ts">
	import { makeRequest } from '$lib/api';
  import moment from 'moment'
	import { onMount } from 'svelte';
  
  let rounds = []
  let isLoading = false
  
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
  
  onMount(async () => {
    isLoading = true
    await getRounds()
    isLoading = false
  })
  
  
</script>
<h1 class="text-4xl font-bold mt-6">Dashboard</h1>
<div class="flex flex-row gap-4">

  <div class="stats shadow my-4">
    <div class="stat">
      <div class="stat-title">Total Rounds</div>
      {#if isLoading}
        <div class="skeleton h-8 w-10"></div>
      {:else}
        <div class="stat-value text-primary">{rounds.length}</div>
      {/if}
    </div>

    <div class="stat">
      <div class="stat-title">Average Score</div>
      {#if isLoading}
        <div class="skeleton h-8 w-10"></div>
      {:else}
        <div class="stat-value text-primary">{rounds.length}</div>
      {/if}
    </div>

    <div class="stat">
      <div class="stat-title">Best Score</div>
      {#if isLoading}
        <div class="skeleton h-8 w-10"></div>
      {:else}
        <div class="stat-value text-primary">{rounds.length}</div>
      {/if}
    </div>
  </div>
</div>

<h2 class="text-xl font-bold mt-4">All Rounds</h2>
<div class="mt-4">
  <table class="table table-lg">
    <thead class="">
      <tr>
        <th>Date</th>
        <th>Course</th>
        <th>Length</th>
        <th>Score</th>
        <th>Putts</th>
      </tr>
    </thead>
    <tbody>
      {#if !isLoading}
        {#each rounds as round}
          <tr class="hover">
            <td>{moment(round.roundDate).format('MM/DD/YYYY')}</td>
            <td>{round.courseName}</td>
            <td>{round.courseLength}</td>
            <td>{getRoundScore(round)}</td>
            <td>{round.roundPutts}</td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="5"><div class="skeleton h-6 w-full"></div></td>
        </tr>
        <tr>
          <td colspan="5"><div class="skeleton h-6 w-full"></div></td>
        </tr>
        <tr>
          <td colspan="5"><div class="skeleton h-6 w-full"></div></td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>