<script lang="ts">
import type { PageData } from './$types';
	
export let data: PageData;
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<h1 class="h1">
	<span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Dashboard</span>
</h1>

<h2 class="h3 mt-8 mb-2">
	Weekend League
</h2>

<div class="mb-2 flex flex-row gap-3">
	<div class="flex-1 card py-3 rounded-lg">
		<p class="text-6xl text-center">{data.stats.wins}</p>
		<h3 class="text-xl text-center">Wins</h3>
	</div>
	<div class="flex-1 card py-3 rounded-lg">
		<p class="text-6xl text-center">{data.stats.losses}</p>
		<h3 class="text-xl text-center">Losses</h3>
	</div>
	<div class="flex-1 card py-3 rounded-lg">
		<p class="text-6xl text-center">{data.stats.extraTimes}</p>
		<h3 class="text-xl text-center">Extra Times</h3>
	</div>
	<div class="flex-1 card py-3 rounded-lg">
		<p class="text-6xl text-center">{data.stats.expectedWins}</p>
		<h3 class="text-xl text-center">Expected Wins</h3>
	</div>
</div>

<div class="mt-8">
	<h2 class="h3">Recent Matches</h2>
	<div class="mt-2 table-container">
		<table class="table table-hover">
			<thead>
			<tr>
					<th>Date</th>
					<th>Result</th>
					<th>Game Type</th>
				</tr>
			</thead>
			<tbody>
				{#each data.matches as match}
					<tr>
						<td>{match.createdAt}</td>
						<td>{match.userScore} - {match.opponentScore}</td>
						<td>{match.type}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
			<tr></tr>
			</tfoot>
		</table>
	</div>
</div>
