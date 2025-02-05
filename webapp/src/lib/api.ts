import { goto } from '$app/navigation'
import Session from 'supertokens-web-js/recipe/session'

const BASE_URL = 'http://localhost:4000/api'

export const makeRequest = async (path: string, options: RequestInit) => {
  if (!(await Session.doesSessionExist())) {
    goto('/auth/sign-out')
    return
  }
  
  const jwt = await Session.getAccessToken()
  
  const headers = {
    Authorization: `Bearer ${jwt}`
  }

  if (options.method === 'POST') {
    headers['Content-Type'] = 'application/json'
  }
  
  const response = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}