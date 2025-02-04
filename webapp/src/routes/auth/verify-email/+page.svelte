<script lang='ts'>
  import { onMount } from 'svelte'
  import { Button } from 'flowbite-svelte'
	import { goto } from '$app/navigation';
  import { verifyEmail } from "supertokens-web-js/recipe/emailverification";

  const doVerify = async () => {
    try {
        let response = await verifyEmail();
        if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
        console.log('error!')
        } else {
        console.log('success!')
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            console.log(err.message);
        } else {
            console.log("Oops! Something went wrong.");
        }
    }
  }
  
  onMount(async () => {
    await doVerify()

  })
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Email Verification
        </h1>
        
        <div class="space-y-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">Email successfully verified!</p>

          <div class="space-y-3">
            <Button
              type="button"
              class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              color="none"
              on:click={() => goto('/s/dashboard')}
            >
              Go to App
            </Button>

          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
          </p>
        </div>
      </div>
    </div>
  </div>
</div>