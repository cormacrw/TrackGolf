import type { Round } from '$lib/types/Round'
import moment from 'moment'

export const getAnalytics = (rounds: Round[]) => {
  const analytics = {
    totalRounds: rounds.length,
    averageScore: 0,
    averageFairwayPercentage: 0,
    averageGreenInRegulationPercentage: 0,
    averagePutts: 0,
    bestRound: 0,
    worstRound: rounds[0]?.score,
    roundTypesCount: {} as Record<string, number>,
    underParCount: 0,
    overParCount: 0,
    levelParCount: 0,
    scoresByWeek: {} as Record<string, number[]>,
  }


  let totalScore = 0
  let totalGreensInRegulation = 0
  let totalFairwaysInRegulation = 0
  let totalPutts = 0

  for (const item of rounds) {
    const date = moment(item.date)
    const firstDayOfWeek = date.startOf('isoWeek').format('MM/DD/YYYY')

    if (!analytics.scoresByWeek[firstDayOfWeek]) {
      analytics.scoresByWeek[firstDayOfWeek] = []
    }

    analytics.scoresByWeek[firstDayOfWeek].push(item.score)

    totalScore += item.score
    totalFairwaysInRegulation += item.fairwayPercentage ?? 0
    totalGreensInRegulation += item.greenPercentage ?? 0
    totalPutts += item.putts ?? 0

    analytics.roundTypesCount[item.type as string] = (analytics.roundTypesCount[item.type as string] ?? 0) + 1

    if (item.score > analytics.bestRound) {
      analytics.bestRound = item.score
    }

    if (item.score < analytics.worstRound) {
      analytics.worstRound = item.score
    }

    if (item.score === item.coursePar) {
      analytics.levelParCount++
    } else if (item.score < item.coursePar) {
      analytics.underParCount++
    } else {
      analytics.overParCount++
    }
  }

  analytics.averageScore = Number((totalScore / rounds.length).toFixed(1))
  analytics.averageFairwayPercentage = Number((totalFairwaysInRegulation / rounds.length).toFixed(1))
  analytics.averageGreenInRegulationPercentage = Number((totalGreensInRegulation / rounds.length).toFixed(1))
  analytics.averagePutts = Number((totalPutts / rounds.length).toFixed(1))

  return analytics
}