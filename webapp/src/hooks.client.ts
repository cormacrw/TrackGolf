import type { ServerInit } from '@sveltejs/kit'

export const handle: ServerInit = async () => {
  console.log('Hello from the client')
}

