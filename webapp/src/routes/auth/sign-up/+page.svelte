<script lang="ts">
	import { signUp } from 'supertokens-web-js/recipe/emailpassword'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { authGuard } from '$lib/authMiddleware'
	import * as Card from '$lib/components/ui/card'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import { superForm, setMessage } from 'sveltekit-superforms/client'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { z } from 'zod'
	import LoaderCircle from 'lucide-svelte/icons/loader-circle'
	import SuperDebug from 'sveltekit-superforms'

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password')
	}).refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

	const form = superForm(
		{
			email: '',
			username: '',
			password: '',
			confirmPassword: ''
		},
		{
			SPA: true,
			validators: zodClient(formSchema),
			dataType: 'json',
			multipleSubmits: 'prevent',
			clearOnSubmit: 'errors-and-message',
			onUpdate: async ({ form }) => {
				try {
					const response = await signUp({
						formFields: [
							{
								id: 'email',
								value: form.data.email
							},
							{
								id: 'password',
								value: form.data.password
							}
						]
					})

					if (response.status === 'FIELD_ERROR') {
						response.formFields.forEach((formField) => {
							if (formField.id === 'email') {
								setMessage(form, formField.error)
							}
						})
					} else if (response.status === 'OK') {
						goto('/auth/verify')
					}
				} catch (err: any) {
					if (err.isSuperTokensGeneralError === true) {
						setMessage(form, err.message)
					} else {
						setMessage(form, 'Oops! Something went wrong.')
					}
				}
			}
		}
	)

	const { form: formData, enhance, allErrors, submitting, message } = form

</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
	<div class="container flex h-screen w-screen flex-col items-center justify-center">
		<Card.Root class="w-[400px]">
			<Card.Header>
				<Card.Title>eGolf Tracker</Card.Title>
				<Card.Description>Create your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<form class="space-y-4" method="POST" use:enhance>
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input
								{...attrs}
								name="email"
								type="email"
								placeholder="name@company.com"
								bind:value={$formData.email}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input
								{...attrs}
								type="password"
								placeholder="••••••••"
								bind:value={$formData.password}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="confirmPassword">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input
								{...attrs}
								type="password"
								placeholder="••••••••"
								bind:value={$formData.confirmPassword}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Button type="submit" class="w-full" disabled={$submitting || $allErrors?.length > 0}>
						{#if $submitting}
							<LoaderCircle class="h-4 w-4 animate-spin" />
						{:else}
							Sign up
						{/if}
					</Button>
					<span class="block text-center text-sm text-red-500">{$message}</span>
				</form>
			</Card.Content>
			<Card.Footer>
				<p class="text-muted-foreground text-sm">
					Already have an account?
					<a href="/auth/sign-in" class="text-primary hover:underline">Sign in</a>
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<SuperDebug data={$formData} />
</div>