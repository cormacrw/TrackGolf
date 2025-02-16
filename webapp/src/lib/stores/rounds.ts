import { makeRequest } from '$lib/api'
import type { Round } from '$lib/types/Round'
import { useWritable } from "./store"

export const useRoundsStore = () => useWritable<Round[]>('rounds', [])


