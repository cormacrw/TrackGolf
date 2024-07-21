<script lang="ts">
import { getContext } from 'svelte'
import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'

const matchForm = getContext('matchForm')

let value: string = $matchForm.mode

function onChange () {
	matchForm.update((v: any) => {
		v.mode = value
		return v
	})
}

</script>

<p class="mb-3">Which game mode did you play?</p>

<ListBox>
	<ListBoxItem on:change={onChange} bind:group={value} name="medium" value="Champions">Champions</ListBoxItem>
	<ListBoxItem on:change={onChange} bind:group={value} name="medium" value="Rivals">Rivals</ListBoxItem>
	<ListBoxItem on:change={onChange} bind:group={value} name="medium" value="Friendly">Friendlies</ListBoxItem>
</ListBox>
