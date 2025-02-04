<script lang="ts">
  import { signIn } from 'supertokens-web-js/recipe/emailpassword'
  import { Label, Input, Button } from 'flowbite-svelte'
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authGuard } from '$lib/authMiddleware';

  let email = ''
  let password = ''

  const handleSubmit = async () => {
    try {
      console.log('Sign in:', { email, password })
      let response = await signIn({
        formFields: [{
          id: 'email',
          value: email
        }, {
          id: 'password',
          value: password
        }]
      })

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
    }
  }
  
  onMount(async () => {
    await authGuard()
  })
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          TrackGolf
        </h1>
        <form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleSubmit}>
          <div>
            <Label for="email" class="mb-2">Your email</Label>
            <Input
              bind:value={email}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <Label for="password" class="mb-2">Password</Label>
            <Input
              bind:value={password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <a href="/forgot-password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
          </div>
          <Button
            type="submit"
            class="w-full"
          >
            Sign in
          </Button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet? <a href="/auth/sign-up" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>