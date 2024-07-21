<script lang="ts">
import { getContext } from 'svelte'

const matchForm = getContext('matchForm')

let userScore = $matchForm.userScore
let opponentScore = $matchForm.opponentScore

function onUserScoreChange () {
	matchForm.update((v: any) => {
		v.userScore = userScore
		return v
	})
}

function onOpponentScoreChange () {
	matchForm.update((v: any) => {
		v.opponentScore = opponentScore
		return v
	})
}


</script>

<label class="label w-1/4">
	<span>Your Score</span>
  <input
		bind:value={userScore}
		on:change={onUserScoreChange}
		class="input"
		title="Your score"
		type="number"
	/>
</label>

<label class="mt-4 label w-1/4">
	<span>Opponent Score</span>

  <input
		bind:value={opponentScore}
		on:change={onOpponentScoreChange}
		class="input"
		title="Opponent score"
		type="number"
	/>
</label>
