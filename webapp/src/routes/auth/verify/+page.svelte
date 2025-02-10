<script lang='ts'>
  import { onMount } from 'svelte'
  import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
  import { goto } from '$app/navigation'
  import * as Card from '$lib/components/ui/card'
  import { Button } from '$lib/components/ui/button'
  import LoaderCircle from 'lucide-svelte/icons/loader-circle'
  
  let isLoading = false
  let error = ''
  
  const sendEmail = async () => {
    try {
      await sendVerificationEmail()
    } catch (e: any) {
      error = 'Failed to send verification email'
      goto('/auth/sign-in')
    }
  }

  const handleVerify = () => {
    isLoading = true
    // TODO: Implement verification logic
    goto('/s/dashboard')
  }

  const handleResend = async () => {
    isLoading = true
    await sendEmail()
    isLoading = false
  }
  
  onMount(async () => {
    await sendEmail()
  })
</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
  <div class="container flex h-screen w-screen flex-col items-center justify-center">
    <Card.Root class="w-[400px]">
      <Card.Header>
        <Card.Title>Verify Your Email</Card.Title>
        <Card.Description>
          We've sent a verification email to your inbox. Please click the link in the email to confirm your email address.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div class="space-y-4">
          <Button 
            class="w-full" 
            on:click={handleVerify}
            disabled={isLoading}
          >
            {#if isLoading}
              <LoaderCircle class="h-4 w-4 animate-spin" />
            {:else}
              I've Verified My Email
            {/if}
          </Button>

          <Button 
            variant="link"
            class="w-full"
            on:click={handleResend}
            disabled={isLoading}
          >
            {#if isLoading}
              <LoaderCircle class="h-4 w-4 animate-spin" />
            {:else}
              Resend Verification Email
            {/if}
          </Button>

          {#if error}
            <span class="block text-center text-sm text-red-500">{error}</span>
          {/if}
        </div>
      </Card.Content>

      <Card.Footer>
        <p class="text-muted-foreground text-center text-sm">
          Didn't receive an email? Check your spam folder or click resend above.
        </p>
      </Card.Footer>
    </Card.Root>
  </div>
</div>