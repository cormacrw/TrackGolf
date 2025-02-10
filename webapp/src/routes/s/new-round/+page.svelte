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
	import type { PageProps } from './$types';
  import { toast } from "svelte-sonner";


	let { data }: PageProps = $props();

	const formSchema = z.object({
		type: z.string(),
		courseName: z.string().min(1, 'required'),
		coursePar: z.number().min(1, 'required'),
		courseLength: z.number().min(1, 'required'),
		date: z.instanceof(CalendarDate),
		score: z.number().min(1, 'required'),
		putts: z.number().optional(),
		fairwayPercentage: z.array(
			z.number().min(0, 'Must be at least 0').max(100, 'Must be equal to or less than 100')
		),
		greenPercentage: z.array(
			z.number().min(0, 'Must be at least 0').max(100, 'Must be equal to or less than 100')
		),
		notes: z.string().optional()
	});

	const form = superForm(
		{
			courseName: '',
			coursePar: 72,
			courseLength: 7000,
			date: today('America/New_York'),
			score: 72,
			putts: 36,
			fairwayPercentage: [100],
			greenPercentage: [100],
			type: 'tgc',
			notes: ''
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
							date: form.data.date.toDate('America/New_York').getTime()
						})
					});
					toast.success('Round saved successfully');
					goto('/s/dashboard');
				} catch (e) {
					console.error(e);
				}
				
			}
		}
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

			<h3 class="text-xl font-bold">Round</h3>

			<div class="flex flex-row gap-4">
				<!-- Type -->
				<Form.Field {form} name="type">
					<Form.Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Combobox {...attrs} items={data.ROUND_TYPES} bind:value={$formData.type} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Round Date -->
				<Form.Field {form} name="date">
					<Form.Control let:attrs>
						<Form.Label>Round Date</Form.Label>
						<div>
							<Datepicker {...attrs} name="date" bind:value={$formData.date} />
						</div>
					</Form.Control>
				</Form.Field>
			</div>
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

				<!-- Round Putts -->
				<Form.Field class="max-w-32" {form} name="putts">
					<Form.Control let:attrs>
						<Form.Label>Round Putts</Form.Label>
						<Input
							{...attrs}
							type="number"
							name="putts"
							placeholder="Round Putts"
							bind:value={$formData.putts}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Fairway Percentage -->
			<Form.Field class="max-w-xl" {form} name="fairwayPercentage">
				<Form.Control let:attrs>
					<Form.Label>Fairway Percentage</Form.Label>
					<Slider {...attrs} bind:value={$formData.fairwayPercentage} max={100} min={0} step={1} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Green Percentage -->
			<Form.Field class="max-w-xl" {form} name="greenPercentage">
				<Form.Control let:attrs>
					<Form.Label>Green Percentage</Form.Label>
					<Slider {...attrs} bind:value={$formData.greenPercentage} max={100} min={0} step={1} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Green Percentage -->
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
<!---
<form class="" on:submit|preventDefault={handleSave}>
  <h2 class="text-xl font-bold mt-7 mb-4">Course Details</h2>
  <div class="my-4">
    <label for="course-name" class="label">Course Name</label>
    <input class="input input-bordered w-full" id="course-name" bind:value={courseName} placeholder="Course Name" />
  </div>

  <div class="flex flex-row gap-4">
    <div>
      <label for="course-par" class="label">Course Par</label>
      <input class="input input-bordered" id="course-par" bind:value={coursePar} placeholder="Course Par" type="number" />
    </div>
    <div>
      <label for="course-length" class="label">Course Length</label>
      <input class="input input-bordered" id="course-length" bind:value={courseLength} placeholder="Course Length" type="number" />
    </div>
  </div>

  <h2 class="text-xl font-bold mt-7 mb-4">Round Details</h2>
  <div class="my-4">
    <label for="round-date" class="label">Round Date</label>
    <input class="input input-bordered" id="round-date" bind:value={roundDate} type="date" />
  </div>

  <div class="flex flex-row gap-4 mb-4">
    <div>
      <label for="round-score" class="label">Round Score</label>
      <input class="input input-bordered" id="round-score" bind:value={roundScore} placeholder="Round Score" type="number" />
    </div>
    <div>
      <label for="round-putts" class="label">Putts</label>
      <input class="input input-bordered" id="round-putts" bind:value={roundPutts} placeholder="Putts" type="number" />
    </div>
  </div>

  <div>
    <label for="fairway-percentage" class="label">Fairway %</label>

    <input id="fairway-percentage" type="range" min="0" max="100" bind:value={fairwayPercentage} class="range" />
    <span class="text-sm text-center w-full block">{fairwayPercentage}%</span>
  </div>
  <div>
    <label for="green-percentage" class="label">Green %</label>
    <input id="green-percentage" type="range" min="0" max="100" bind:value={greenPercentage} class="range" />
    <span class="text-sm text-center w-full block">{greenPercentage}%</span>
  </div>
  <button type="submit" class="btn btn-primary mt-4 float-end" disabled={isLoading}>
    Save
    {#if isLoading}
      <span class="loading loading-spinner loading-xs"></span>
    {/if}
  </button>
</form>
--->
