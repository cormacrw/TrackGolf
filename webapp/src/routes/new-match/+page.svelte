<script lang="ts">
import { setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { PageData } from './$types'
import questions from './questions'

export let data: PageData

const matchForm = writable()
matchForm.set({
	mode: 'Champions',
	userScore: 0,
	opponentScore: 0,
	minutes: 90
})

setContext('matchForm', matchForm)

let step = 0

function nextStep () {
	step++
}

function prevStep () {
	step--
}

function submit () {
	console.log($matchForm)
}

</script>

<h1 class="h1 mb-4">
	<span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">New Match</span>
</h1>

<div class="card p-3 rounded-md max-w-3xl">
	{#each questions as question, i}
		{#if step === i}
			<svelte:component this={question.component} />
		{/if}
	{/each}

	{#if step === questions.length}
		<div>
			<p>Game mode</p>
			<p>{$matchForm.mode}</p>
		</div>
		<div>
			<p>Score</p>
			<p>{$matchForm.userScore} - {$matchForm.opponentScore}</p>
		</div>
		<div>
			<p>Minutes</p>
			<p>{$matchForm.minutes}</p>
		</div>
	{/if}

	<div class="flex flex-row justify-end gap-3">
		{#if step > 0}
			<button class="btn variant-glass-primary rounded" on:click={prevStep}>
				Back
			</button>
		{:else}
			<div></div>
		{/if}

		{#if step < questions.length}
			<button class="btn bg-gradient-to-br variant-gradient-error-warning rounded" on:click={nextStep}>
				Next
			</button>
		{:else}
			<button class="btn bg-gradient-to-br variant-gradient-error-warning rounded" on:click={submit}>
				Finish
			</button>
		{/if}
	</div>
</div>
