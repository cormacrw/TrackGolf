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