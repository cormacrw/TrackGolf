<script lang="ts">
	import { makeRequest } from '$lib/api';
	import * as Card from '$lib/components/ui/card';

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
  <div class="flex flex-row gap-4 mt-6">
    <Card.Root class="flex-1">
      <Card.Content>
        <p>Total Rounds</p>
        <h3 class="text-6xl font-bold">{rounds.length}</h3>
      </Card.Content>
    </Card.Root>

    <Card.Root class="flex-1">
      <Card.Content>
        <p>Average Score</p>
        <h3 class="text-6xl font-bold">{rounds.length}</h3>
      </Card.Content>
    </Card.Root>

    <Card.Root class="flex-1">
      <Card.Content>
        <p>Best / Worst Score</p>
        <h3 class="text-6xl font-bold">{rounds.length}</h3>
      </Card.Content>
    </Card.Root>
  </div>
