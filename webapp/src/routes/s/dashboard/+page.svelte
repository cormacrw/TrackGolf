<script lang="ts">
	import { makeRequest } from '$lib/api';
  import moment from 'moment'
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
<h1 class="text-4xl font-bold mt-6">Dashboard</h1>
<div class="flex flex-row gap-4">

  <div class="stats shadow my-4">
    <div class="stat">
      <div class="stat-title">Total Rounds</div>
      <div class="stat-value text-primary">{rounds.length}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Average Score</div>
      <div class="stat-value text-primary">0</div>
    </div>
    <div class="stat">
      <div class="stat-title">Best Score</div>
      <div class="stat-value text-primary">0</div>
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
      {#each rounds as round}
        <tr class="hover">
          <td>{moment(round.roundDate).format('MM/DD/YYYY')}</td>
          <td>{round.courseName}</td>
          <td>{round.courseLength}</td>
          <td>{getRoundScore(round)}</td>
          <td>{round.roundPutts}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>