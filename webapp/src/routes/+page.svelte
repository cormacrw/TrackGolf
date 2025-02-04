<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  onMount(() => {
    const user = localStorage.getItem('user')
    if (user) {
      goto('/dashboard')
    } else {
      goto('/auth/sign-in')
    }
  })
</script>