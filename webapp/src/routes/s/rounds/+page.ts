import type { PageLoad } from './$types';
import { makeRequest } from '$lib/api';

export const load: PageLoad = async ({ parent }) => {
  await parent()
  const response = await makeRequest('/rounds', {
    method: 'GET'
  })
  console.log(response)
  const rounds = response.rows
  const totalRounds = response.count
  
  return { rounds, totalRounds };
};