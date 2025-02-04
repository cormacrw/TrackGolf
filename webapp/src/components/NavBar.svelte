<script lang="ts">
	import { goto } from '$app/navigation';
  import { Navbar, NavBrand, Button, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Avatar } from 'flowbite-svelte';
  
  let email = ''

</script>
<Navbar>
  <NavBrand href="/s/dashboard">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TrackGolf</span>
    <Button size="sm" class="ml-4">Track Round +</Button>
  </NavBrand>
  <div class="flex items-center md:order-1">
    <Avatar id="avatar-menu" src="/images/user.jpg" />
  </div>
  <Dropdown placement="bottom-end" triggeredBy="#avatar-menu" class="mr-3">
    <DropdownHeader>
      <span class="block text-sm">{email}</span>
    </DropdownHeader>
    <DropdownItem>Settings</DropdownItem>
    <DropdownDivider />
    <DropdownItem on:click={() => goto('/auth/sign-out')}>Sign out</DropdownItem>
  </Dropdown>
</Navbar>