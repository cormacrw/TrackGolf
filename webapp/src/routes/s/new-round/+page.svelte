<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import { makeRequest } from '$lib/api';
	import moment from 'moment';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { superForm, setMessage } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import SuperDebug from 'sveltekit-superforms';
	import { Datepicker } from '$lib/components/ui/datepicker';
	import { Combobox } from '$lib/components/ui/combobox';
	import { Slider } from '$lib/components/ui/slider';
	import { Textarea } from '$lib/components/ui/textarea';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { today, CalendarDate } from '@internationalized/date';
	import { toast } from 'svelte-sonner';
	import { useRoundsStore } from '$lib/stores/rounds';
	import { fetchRounds } from '$lib/requests/rounds';
	import roundTypes from '$lib/constants/roundTypes';
	import difficulties from '$lib/constants/difficulties';
	import tgcTours from '$lib/constants/tgcTours';

	const rounds = useRoundsStore();

	const formSchema = z.object({
		type: z.string().max(50),
		courseName: z.string().min(1, 'required').max(100),
		coursePar: z.number().min(1, 'required').max(100),
		courseLength: z.number().min(1, 'required').max(10000),
		date: z.instanceof(CalendarDate),
		score: z.number().min(1, 'required').max(130),
		fairwayPercentage: z
			.number()
			.min(0, 'Must be at least 0')
			.max(100, 'Must be equal to or less than 100')
			.optional(),
		greenPercentage: z
			.number()
			.min(0, 'Must be at least 0')
			.max(100, 'Must be equal to or less than 100')
			.optional(),
		tour: z.string().optional(),
		difficulty: z.string().optional(),

		aces: z.number().min(0).max(18).optional(),
		albatrosses: z.number().min(0).max(18).optional(),
		eagles: z.number().min(0).max(18).optional(),
		birdies: z.number().min(0).max(18).optional(),
		pars: z.number().min(0).max(18).optional(),
		bogies: z.number().min(0).max(18).optional(),
		bogiesPlus: z.number().min(0).max(18).optional(),

		shortPuttAccuracy: z.number().min(0).max(100).optional(),
		mediumPuttAccuracy: z.number().min(0).max(100).optional(),
		longPuttAccuracy: z.number().min(0).max(100).optional(),

		birdieConversion: z.number().min(0).max(100).optional(),
		proximityToHole: z.number().min(0).max(200).optional(),

		notes: z.string().max(250).optional(),
	});

	const form = superForm(
		{
			courseName: '',
			coursePar: 72,
			courseLength: 7000,
			date: today('America/New_York'),
			score: 72,
			fairwayPercentage: 100,
			greenPercentage: 100,
			aces: 0,
			birdies: 0,
			albatrosses: 0,
			eagles: 0,
			pars: 0,
			bogeys: 0,
			bogeysPlus: 0,
			proximityToHole: 0,
			birdieConversion: 0,
			shortPuttAccuracy: 0,
			mediumPuttAccuracy: 0,
			longPuttAccuracy: 0,
			type: 'tgc',
			notes: '',
			difficulty: '',
			tour: '',
		},
		{
			SPA: true,
			validators: zodClient(formSchema),
			dataType: 'json',
			multipleSubmits: 'prevent',
			clearOnSubmit: 'errors-and-message',
			onUpdate: async ({ form }) => {
				console.log('form', form.valid, form.errors);
				if (!form.valid) {
					return;
				}

				try {
					await makeRequest('/round', {
						method: 'POST',
						body: JSON.stringify({
							...form.data,
							fairwayPercentage: form.data.fairwayPercentage[0],
							greenPercentage: form.data.greenPercentage[0],
							date: form.data.date.toDate('America/New_York').getTime(),
						}),
					});

					const _rounds = await fetchRounds();
					rounds.set(_rounds);

					toast.success('Round saved successfully!');

					goto('/s/dashboard');
				} catch (e) {
					console.error(e);
				}
			},
		},
	);

	const { form: formData, enhance, allErrors, submitting, message } = form;
</script>

<h1 class="my-6 text-4xl font-bold">New Round</h1>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-2xl font-bold">Details</Card.Title>
	</Card.Header>
	<Card.Content>
		<form class="space-y-4" method="POST" use:enhance>
			<h3 class="text-xl font-bold">Course</h3>

			<!-- Course Name -->
			<Form.Field {form} name="courseName" class="max-w-2xl">
				<Form.Control let:attrs>
					<Form.Label>Course Name</Form.Label>
					<Input
						{...attrs}
						name="courseName"
						placeholder="Course Name"
						bind:value={$formData.courseName}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex flex-row gap-4">
				<!-- Course Par -->
				<Form.Field class="max-w-32" {form} name="coursePar">
					<Form.Control let:attrs>
						<Form.Label>Course Par</Form.Label>
						<Input
							{...attrs}
							name="coursePar"
							type="number"
							placeholder="Course Par"
							bind:value={$formData.coursePar}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Course Length -->
				<Form.Field class="max-w-32" {form} name="courseLength">
					<Form.Control let:attrs>
						<Form.Label>Course Length</Form.Label>
						<Input
							{...attrs}
							name="courseLength"
							type="number"
							placeholder="Course Length"
							bind:value={$formData.courseLength}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="w-full border border-x-0 border-t-0"></div>
			<h3 class="text-xl font-bold">Round</h3>

			<!-- Round Date -->
			<Form.Field {form} name="date">
				<Form.Control let:attrs>
					<Form.Label>Date</Form.Label>
					<div>
						<Datepicker {...attrs} name="date" bind:value={$formData.date} />
					</div>
				</Form.Control>
			</Form.Field>
			<div class="flex flex-row gap-4">
				<!-- Type -->
				<Form.Field {form} name="type">
					<Form.Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Combobox {...attrs} items={roundTypes} bind:value={$formData.type} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				{#if $formData.type === 'tgc'}
					<!-- Difficulty -->
					<Form.Field {form} name="tour">
						<Form.Control let:attrs>
							<Form.Label>Tour</Form.Label>
							<Combobox {...attrs} items={tgcTours} bind:value={$formData.tour} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{:else}
					<!-- Difficulty -->
					<Form.Field {form} name="difficulty">
						<Form.Control let:attrs>
							<Form.Label>Difficulty</Form.Label>
							<Combobox {...attrs} items={difficulties} bind:value={$formData.difficulty} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
			</div>

			<div class="w-full border border-x-0 border-t-0"></div>
			<h3 class="text-xl font-bold">Score</h3>

			<div class="flex flex-row gap-4">
				<!-- Round Score -->
				<Form.Field class="max-w-32" {form} name="score">
					<Form.Control let:attrs>
						<Form.Label>Round Score</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="score"
							placeholder="Round Score"
							bind:value={$formData.score}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex flex-row gap-4">
				<Form.Field class="max-w-20" {form} name="aces">
					<Form.Control let:attrs>
						<Form.Label>Aces</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="aces"
							placeholder="0"
							bind:value={$formData.aces}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="albatrosses">
					<Form.Control let:attrs>
						<Form.Label>Alba's</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="albatrosses"
							placeholder="0"
							bind:value={$formData.albatrosses}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="eagles">
					<Form.Control let:attrs>
						<Form.Label>Eagles</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="eagles"
							placeholder="0"
							bind:value={$formData.eagles}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="birdies">
					<Form.Control let:attrs>
						<Form.Label>Birdies</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="score"
							placeholder="0"
							bind:value={$formData.birdies}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="pars">
					<Form.Control let:attrs>
						<Form.Label>Pars</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="pars"
							placeholder="0"
							bind:value={$formData.pars}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="bogeys">
					<Form.Control let:attrs>
						<Form.Label>Bogeys</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="bogeys"
							placeholder="0"
							bind:value={$formData.bogeys}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="bogeysPlus">
					<Form.Control let:attrs>
						<Form.Label>Bogeys+</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="bogeysPlus"
							placeholder="0"
							bind:value={$formData.bogeysPlus}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="w-full border border-x-0 border-t-0"></div>
			<h3 class="text-xl font-bold">General Stats</h3>

			<div class="flex flex-row gap-4">
				<Form.Field class="max-w-20" {form} name="fairwayPercentage">
					<Form.Control let:attrs>
						<Form.Label>Fairway %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="fairwayPercentage"
							placeholder="0"
							bind:value={$formData.fairwayPercentage}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="greenPercentage">
					<Form.Control let:attrs>
						<Form.Label>Green %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="greenPercentage"
							placeholder="0"
							bind:value={$formData.greenPercentage}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex flex-row gap-4">
				<Form.Field {form} name="proximityToHole">
					<Form.Control let:attrs>
						<Form.Label>Proximity to hole (ft)</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="proximityToHole"
							placeholder="0"
							class="max-w-20"
							bind:value={$formData.proximityToHole}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="birdieConversion">
					<Form.Control let:attrs>
						<Form.Label>Birdie Conversion %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="birdieConversion"
							placeholder="0"
							class="max-w-20"
							bind:value={$formData.birdieConversion}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="w-full border border-x-0 border-t-0"></div>
			<h3 class="text-xl font-bold">Putting Stats</h3>

			<div class="flex flex-row gap-4">
				<Form.Field class="max-w-20" {form} name="shortPuttAccuracy">
					<Form.Control let:attrs>
						<Form.Label>Short %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="shortPuttAccuracy"
							placeholder="0"
							bind:value={$formData.shortPuttAccuracy}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field class="max-w-20" {form} name="mediumPuttAccuracy">
					<Form.Control let:attrs>
						<Form.Label>Medium %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="mediumPuttAccuracy"
							placeholder="0"
							bind:value={$formData.mediumPuttAccuracy}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="max-w-20" {form} name="longPuttAccuracy">
					<Form.Control let:attrs>
						<Form.Label>Long %</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="longPuttAccuracy"
							placeholder="0"
							bind:value={$formData.longPuttAccuracy}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="w-full border border-x-0 border-t-0"></div>

			<Form.Field {form} name="greenPercentage">
				<Form.Control let:attrs>
					<Form.Label>Notes</Form.Label>
					<Textarea {...attrs} bind:value={$formData.notes} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex justify-end">
				<Button type="submit" class="" disabled={$submitting || $allErrors?.length > 0}>
					{#if $submitting}
						<LoaderCircle class="h-4 w-4 animate-spin" />
					{:else}
						Save
					{/if}
				</Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>

{#if PUBLIC_ENVIRONMENT === 'local'}
	<div class="my-6">
		<SuperDebug data={$formData} />
	</div>
{/if}
