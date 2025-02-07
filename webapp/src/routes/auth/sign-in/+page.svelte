<script lang="ts">
  import { signIn } from 'supertokens-web-js/recipe/emailpassword'
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authGuard } from '$lib/authMiddleware';
	import * as Card from '$lib/components/ui/card'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import { superForm } from 'sveltekit-superforms/client'
  import { zodClient } from 'sveltekit-superforms/adapters'
	import { z } from 'zod'

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(1, 'Password is required')
	})
	let loading = false

	const form = superForm({
		email: '',
		password: ''
	}, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onSubmit: async (input) => {
			const email = input.formData.get('email')
			const password = input.formData.get('password')
			try {
				loading = true
				const response = await signIn({
					formFields: [
						{
							id: 'email',
							value: email?.toString() || ''
						},
						{
							id: 'password',
							value: password?.toString() || ''
						}
					]
				})
				loading = false
				if (response.status === 'FIELD_ERROR') {
					response.formFields.forEach(formField => {
						if (formField.id === 'email') {
							// Email validation failed (for example incorrect email syntax).
							window.alert(formField.error)
						}
					})
				} else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
					window.alert('Email password combination is incorrect.')
				} else if (response.status === 'SIGN_IN_NOT_ALLOWED') {
					// the reason string is a user friendly message
					// about what went wrong. It can also contain a support code which users
					// can tell you so you know why their sign in was not allowed.
					window.alert(response.reason)
				} else {
					// sign in successful. The session tokens are automatically handled by
					// the frontend SDK.
					goto('/s/dashboard')
				}
			} catch (err: any) {
				if (err.isSuperTokensGeneralError === true) {
					// this may be a custom error message sent from the API by you.
					window.alert(err.message)
				} else {
					window.alert('Oops! Something went wrong.')
				}
					loading = false
			}
		}
	})

  const { form: formData, enhance } = form

	
	onMount(async () => {
		await authGuard()
	})
</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
	<div class="container flex h-screen w-screen flex-col items-center justify-center">
		<Card.Root class="w-[400px]">
			<Card.Header>
				<Card.Title>eGolf Tracker</Card.Title>
				<Card.Description>Sign in to your account</Card.Description>
			</Card.Header>
			<Card.Content>
					<form class="space-y-4">

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

						<div class="flex items-center justify-between">
							<a href="/auth/reset-password" class="text-sm text-primary hover:underline">
								Forgot password?
							</a>
						</div>

						<Button type="submit" class="w-full" disabled={loading}>
							{#if loading}
								<span class="loading loading-spinner loading-xs"></span>
							{:else}
								Sign in
							{/if}
						</Button>
					</form>
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-muted-foreground">
					Don't have an account yet? 
					<a href="/auth/sign-up" class="text-primary hover:underline">Sign up</a>
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>