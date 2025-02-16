import type { User } from '$lib/types/User'
import { useWritable } from "./store"

export const useUserStore = () => useWritable<User | null>('user', null)