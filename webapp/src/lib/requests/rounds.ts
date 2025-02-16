import { makeRequest } from '$lib/api'

export const fetchRounds = async () => {
  const response = await makeRequest('/rounds', {
    method: 'GET'
  })
  return response.rows
}