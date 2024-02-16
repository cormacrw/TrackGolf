export const toPercent = (number?: number | null) => {
  if (!number) {
    return '0%'
  }

  return Math.round(number) + '%'
}

export const roundNumber = (number?: number | null) => {
  if (!number) {
    return '0'
  }

  return Math.round(number * 100) / 100
}