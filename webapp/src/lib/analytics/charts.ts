import roundTypes from '$lib/constants/roundTypes'

export const createRoundTypesChartData = (roundTypesCount: Record<string, number>) => {
  return {
    labels: Object.keys(roundTypesCount).map(
      (key) => roundTypes.find((rt) => rt.value === key)?.label || 'Unknown'
    ),
    datasets: [{ data: Object.values(roundTypesCount) }]
  }
}

export const createUnderOverParChartData = (underParCount: number, overParCount: number, levelParCount: number) => {
  return {
    labels: ['Under Par', 'Over Par', 'Level Par'],
    datasets: [{ data: [underParCount, overParCount, levelParCount] }]
  }
}

export const createAverageScoreOverTimeChartData = (scoresByWeek: Record<string, number[]>) => {
  const keys = Object.keys(scoresByWeek).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  return {
    labels: keys,
    datasets: [{ data: keys.map((key) => scoresByWeek[key].reduce((acc, curr) => acc + curr, 0) / scoresByWeek[key].length) }]
  }
}
