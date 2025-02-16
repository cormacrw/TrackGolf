import { useWritable } from "./store"

export const useLoadingStore = () => useWritable<boolean>('loading', false)
