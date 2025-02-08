<script lang='ts'>
  import { onMount } from 'svelte'
  import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification"
	import { goto } from '$app/navigation';

  
  const sendEmail = async () => {
    try {
      const response = await sendVerificationEmail()
      console.log(response)
    } catch (e: any) {
      goto('/auth/sign-in')
      console.log(e)
    }
  }
  const handleVerify = () => {
    // TODO: Implement verification logic
    console.log('Verifying email...')
    goto('/s/dashboard')
  }

  const handleResend = () => {
    // TODO: Implement resend logic
    console.log('Resending verification email...')
    sendEmail()
  }
  
  onMount(async () => {
    await sendEmail()

  })
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Verify Your Email
        </h1>
        
        <div class="space-y-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            We've sent a verification email to your inbox. Please click the link in the email or click the verify button below to confirm your email address.
          </p>

          <div class="space-y-3">
            <button
              type="button"
              class="w-full"
              on:click={handleVerify}
            >
              Done
            </button>

            <button
              type="button"
              class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mt-4"
              on:click={handleResend}
            >
              Resend Verification Email
            </button>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            Didn't receive an email? Check your spam folder or click resend above.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>