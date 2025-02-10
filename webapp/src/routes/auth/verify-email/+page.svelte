<script lang='ts'>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'
  import * as Card from '$lib/components/ui/card'
  import { Button } from '$lib/components/ui/button'
  import LoaderCircle from 'lucide-svelte/icons/loader-circle'

  let isLoading = true
  let isError = false
  let errorMessage = ''

  const doVerify = async () => {
    try {
      let response = await verifyEmail()
      if (response.status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR') {
        isError = true
        errorMessage = 'Invalid or expired verification link'
      }
    } catch (err: any) {
      isError = true
      if (err.isSuperTokensGeneralError === true) {
        errorMessage = err.message
      } else {
        errorMessage = 'Oops! Something went wrong'
      }
    } finally {
      isLoading = false
    }
  }
  
  onMount(async () => {
    await doVerify()
  })
</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
  <div class="container flex h-screen w-screen flex-col items-center justify-center">
    <Card.Root class="w-[400px]">
      <Card.Header>
        <Card.Title>Email Verification</Card.Title>
        <Card.Description>
          {#if isLoading}
            Verifying your email address...
          {:else if isError}
            Verification Failed
          {:else}
            Email Successfully Verified
          {/if}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-col items-center space-y-4">
          {#if isLoading}
            <LoaderCircle class="h-8 w-8 animate-spin" />
          {:else if isError}
            <p class="text-red-500 text-center">{errorMessage}</p>
            <Button variant="outline" on:click={() => goto('/auth/sign-in')}>
              Return to Sign In
            </Button>
          {:else}
            <p class="text-green-600 dark:text-green-400 text-center">
              Your email has been verified successfully!
            </p>
            <Button on:click={() => goto('/s/dashboard')}>
              Go to Dashboard
            </Button>
          {/if}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>