<script lang="ts">
	import { goto } from '$app/navigation';
  import { signUp } from "supertokens-web-js/recipe/emailpassword";

  let email = ''
  let username = ''
  let password = ''
  let confirmPassword = ''

  const handleSubmit = async () => {
    console.log('Sign up:', { email, username, password, confirmPassword })
    try {
      console.log('Signing up...')
      const response = await signUp({
        formFields: [
          {
            id: 'email',
            value: email
          },
          {
            id: 'password',
            value: password
          }
        ]
      })
      
      console.log('Sign up response:', response)
      if (response.status === 'FIELD_ERROR') {
        console.log('Field error:', response.formFields)
      } else if (response.status === 'OK') {
        console.log('Sign up successful')
        goto('/auth/verify')
      }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
  }

</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign up for TrackGolf
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
          <div class="mt-2">
            <label for="username" class="label">Platform Username</label>
            <input
              class="input input-bordered w-full"
              bind:value={username}
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
            />
          </div>
          <div class="mt-2">
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

          <div class="mt-2">
            <label for="confirmPassword" class="label">Confirm password</label>
            <input
              class="input input-bordered w-full"
              bind:value={confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full mt-8"
          >
            Sign up
          </button>
          <a href="/auth/sign-in" class="link-primary text-center block w-full mt-4 text-sm">Already have an account? Sign in</a>
        </form>
      </div>
    </div>
  </div>
</div>