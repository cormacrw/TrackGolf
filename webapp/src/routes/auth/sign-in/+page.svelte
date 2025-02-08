<script lang="ts">
	import { signIn } from 'supertokens-web-js/recipe/emailpassword';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authGuard } from '$lib/authMiddleware';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { superForm, setMessage } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import SuperDebug from 'sveltekit-superforms';

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(1, 'Password is required')
	});

	const form = superForm(
		{
			email: '',
			password: ''
		},
		{
			SPA: true,
			validators: zodClient(formSchema),
			dataType: 'json',
			multipleSubmits: 'prevent',
			clearOnSubmit: 'errors-and-message',
			onUpdate: async ({ form }) => {
				const email = form.data.email;
				const password = form.data.password;
				try {
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
					});
					if (response.status === 'FIELD_ERROR') {
						response.formFields.forEach((formField) => {
							if (formField.id === 'email') {
								// Email validation failed (for example incorrect email syntax).
								window.alert(formField.error);
							}
						});
					} else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
						setMessage(form, 'Incorrect email or password');
					} else if (response.status === 'SIGN_IN_NOT_ALLOWED') {
						window.alert(response.reason);
					} else {
						goto('/s/dashboard');
					}
				} catch (err: any) {
					if (err.isSuperTokensGeneralError === true) {
						window.alert(err.message);
					} else {
						window.alert('Oops! Something went wrong.');
					}
				}
			}
		}
	);

	const { form: formData, enhance, allErrors, submitting, message } = form;

	onMount(async () => {
		await authGuard();
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
	<div class="container flex h-screen w-screen flex-col items-center justify-center">
		<Card.Root class="w-[400px]">
			<Card.Header>
				<Card.Title>eGolf Tracker</Card.Title>
				<Card.Description>Sign in to your account</Card.Description>
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

					<div class="flex items-center justify-between">
						<a href="/auth/reset-password" class="text-primary text-sm hover:underline">
							Forgot password?
						</a>
					</div>

					<Button type="submit" class="w-full" disabled={$submitting || $allErrors?.length > 0}>
						{#if $submitting}
							<LoaderCircle class="h-4 w-4 animate-spin" />
						{:else}
							Sign in
						{/if}
					</Button>
					<span class="block text-center text-sm text-red-500">{$message}</span>
				</form>
			</Card.Content>
			<Card.Footer>
				<p class="text-muted-foreground text-sm">
					Don't have an account yet?
					<a href="/auth/sign-up" class="text-primary hover:underline">Sign up</a>
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<SuperDebug data={$formData} />
</div>
