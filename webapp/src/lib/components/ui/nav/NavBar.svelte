<script lang="ts">
  import { page } from '$app/state'
  import { Button } from '$lib/components/ui/button'
	import Plus from 'lucide-svelte/icons/plus';
</script>

<div class="border-b">
  <div class="flex h-16 items-center px-4 max-w-7xl mx-auto">
    <!-- Logo/Brand -->
    <div class="mr-4 flex">
      <a href="/s/dashboard" class="flex items-center space-x-2">
        <span class="font-bold text-xl">eGolf Tracker</span>
      </a>
    </div>

    <!-- Main Navigation -->
    <nav class="flex items-center space-x-4 lg:space-x-6 mx-6">
      <a
        href="/s/dashboard"
        class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname === '/s/dashboard'
          ? 'text-primary'
          : 'text-muted-foreground'}"
      >
        Dashboard
      </a>
      <a
        href="/s/rounds"
        class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname.startsWith('/s/rounds')
          ? 'text-primary'
          : 'text-muted-foreground'}"
      >
        Rounds
      </a>
    </nav>

    <!-- Right Side Actions -->
    <div class="ml-auto flex items-center space-x-4">
      <Button size="sm" href="/s/new-round">
        Track Round
        <Plus class="h-4 w-4 ml-2" />
      </Button>
    </div>
  </div>
</div>
