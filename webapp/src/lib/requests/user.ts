import { makeRequest } from '$lib/api'

export const fetchUser = async () => {
  const response = await makeRequest('/user', {
    method: 'GET'
  })
  return response.user
}