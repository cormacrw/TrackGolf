<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="py-8 max-w-5xl xl:max-w-7xl mx-auto">
	<div class="flex flex-row justify-between">
		<nav class="mb-6">
			<ul class="flex flex-row gap-8 items-center">
				<li>
					<a href="/">
						Dashboard
					</a>
				</li>
				<li>
					<a href="/matches">
						Matches
					</a>
				</li>
			</ul>
		</nav>
		<a href="/new-match" class="btn bg-gradient-to-br variant-gradient-error-warning rounded">
			New Match
		</a>
	</div>
	<slot />
</div>
