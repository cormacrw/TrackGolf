<script lang="ts">
  import { signIn } from 'supertokens-web-js/recipe/emailpassword'
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authGuard } from '$lib/authMiddleware';

  let email = ''
  let password = ''
  let isLoading = false

  const handleSubmit = async () => {
    try {
      isLoading = true
      let response = await signIn({
        formFields: [{
          id: 'email',
          value: email
        }, {
          id: 'password',
          value: password
        }]
      })
      isLoading = false
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

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
    <div class="card bg-base-100 min-w-96">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
          eGolf Tracker
        </h1>
        <form on:submit|preventDefault={handleSubmit}>
          <div>
            <label for="email" class="label">Your email</label>
            <input
              class="input input-bordered w-full"
              bind:value={email}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label for="password" class="label">Password</label>
            <input
              class="input input-bordered w-full"
              bind:value={password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="flex items-center justify-between mt-4">
            <a href="/auth/reset-password" class="link-primary text-sm">Forgot password?</a>
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full mt-4"
            disabled={isLoading}
          >

            Sign in
            {#if isLoading}
              <span class="loading loading-spinner loading-xs"></span>
            {/if}
          </button>
          <p class="text-sm font-light mt-4">
            Don't have an account yet? <a href="/auth/sign-up" class="link-primary">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>