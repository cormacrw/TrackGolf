import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const matchesResponse = await fetch('http://localhost:3001/matches')
  const matchesData = await matchesResponse.json()

  const statsResponse = await fetch('http://localhost:3001/user/stats/recent')
  const statsData = await statsResponse.json()
  return {
    stats: statsData,
    matches: matchesData.matches
  }
};
