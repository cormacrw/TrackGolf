<script lang="ts">
import { getContext } from 'svelte'

const matchForm = getContext('matchForm')

let minutes = $matchForm.minutes

function onChange () {
	matchForm.update((v: any) => {
		v.minutes = minutes
		return v
	})
}

</script>

<label class="label w-1/4">
	<span>Minutes Played</span>
  <input
		bind:value={minutes}
		on:change={onChange}
		class="input"
		title="Minutes Played"
		type="number"
	/>
</label>

