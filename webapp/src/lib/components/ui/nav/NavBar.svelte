<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Settings from 'lucide-svelte/icons/settings';
	import Sun from 'lucide-svelte/icons/sun';
	import LogOut from 'lucide-svelte/icons/log-out';
	import { useUserStore } from '$lib/stores/user';
	import { Badge } from '$lib/components/ui/badge';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';

	const user = useUserStore();
</script>

<div class="border-b">
	<div class="mx-auto flex h-16 max-w-7xl items-center px-4">
		<!-- Logo/Brand -->
		<div class="mr-4 flex">
			<a href="/s/dashboard" class="flex items-center space-x-2">
				<span class="text-xl font-bold">eGolf Tracker</span>
			</a>
			{#if PUBLIC_ENVIRONMENT === 'local'}
				<Badge class="ml-2" variant="secondary">LOCAL</Badge>
			{/if}
			{#if PUBLIC_ENVIRONMENT === 'dev'}
				<Badge class="ml-2" variant="secondary">DEV</Badge>
			{/if}
		</div>

		<!-- Main Navigation -->
		<nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
			<a
				href="/s/dashboard"
				class="hover:text-primary text-sm font-medium transition-colors {page.url.pathname ===
				'/s/dashboard'
					? 'text-primary'
					: 'text-muted-foreground'}"
			>
				Dashboard
			</a>
			<a
				href="/s/rounds"
				class="hover:text-primary text-sm font-medium transition-colors {page.url.pathname.startsWith(
					'/s/rounds',
				)
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
				<Plus class="ml-2 h-4 w-4" />
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image src="/images/user.jpg" />
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-52">
					<DropdownMenu.Label>{$user?.email}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<Settings class="mr-2 h-4 w-4" />
							<span class="text-sm">Settings</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Sun class="mr-2 h-4 w-4" />
							<span class="text-sm">Toggle Dark Mode</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<LogOut class="mr-2 h-4 w-4" />
							<a href="/auth/sign-out" class="cursor-default text-sm">Sign Out</a>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>
