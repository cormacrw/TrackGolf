<script lang="ts">
  import { signOut } from 'supertokens-web-js/recipe/emailpassword'
  import { goto } from '$app/navigation'
	import { onMount } from 'svelte';

  const handleSignOut = async () => {
    await signOut()
    goto('/auth/sign-in')
  }

  onMount(async () => {
    await handleSignOut()
  })

</script>

<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
</div>