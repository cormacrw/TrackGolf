<script lang="ts">
	import { makeRequest } from '$lib/api';
	import { onMount } from 'svelte';
  
  let email = ''
  
  onMount(async () => {
    const res = await makeRequest('/user', { method: 'GET' })
    console.log(res)

    email = res.user.email
  })

</script>
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/s/dashboard" class="btn btn-ghost text-xl">TrackGolf</a>
    <a href="/s/new-round" class="ml-2 btn btn-primary">Track Round +</a>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="/images/user.jpg" />
        </div>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          {email}
        </li>
        <li><a href="/auth/sign-out">Sign out</a></li>
      </ul>
    </div>
  </div>
</div>