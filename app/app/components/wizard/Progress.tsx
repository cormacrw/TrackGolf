import { colors } from 'app/theme'
import React from "react"
import { View, ViewStyle } from 'react-native'

export interface ProgressProps {
  stepCount: number
  step: number
}

export function Progress (props: ProgressProps) {
  const {
    stepCount,
    step
  } = props

  function $viewStyle(index: number) {
    return [
      $pill,
      index <= step && [$activePill],
    ]
  }

  return (
    <View style={$container}>
      {
        new Array(stepCount).fill(1).map((_, i) => (
          <View style={$viewStyle(i)} key={i} />
        ))
      }
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: 'row',
  height: 30,
  marginHorizontal: 30,
  marginTop: 20,
}
const $pill: ViewStyle = {
  backgroundColor: colors.lightBackground,
  height: 10,
  borderRadius: 5,
  marginHorizontal: 5,
  flex: 1
}
const $activePill: ViewStyle = {
  backgroundColor: colors.primary
}
