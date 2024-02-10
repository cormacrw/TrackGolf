import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface RecentFormCardProps {
  results: Array<'W' | 'D' | 'L'>
}

/**
 * Describe your component here
 */
export const RecentFormCard = observer(function RecentFormCard(props: RecentFormCardProps) {
  const {
    results
  } = props

  const $result = (result: string): ViewStyle => {
    let color: string = colors.win
    if (result === 'L') {
      color = colors.loss
    } else if (result === 'D') {
      color = colors.draw
    }
    return {
      flexDirection: 'row',
      backgroundColor: color,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  return (
    <View style={$container}>
      <Text style={$text}>Recent Form</Text>
      <View style={$resultContainer}>
        {results?.length === 0 &&
          <Text style={$hint}>You don't have any matches logged yet! Press the '+' button below to get started!</Text>
        }
        {results?.map((r, i) => (
          <View style={$result(r)} key={i}>
            <Text style={$resultText}>{r}</Text>
          </View>
        ))}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  padding: 15,
  backgroundColor: colors.lightBackground,
  borderRadius: 8
}

const $resultContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 5
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 16,
  lineHeight: 18,
  color: colors.text,
  marginBottom: 5
}

const $hint: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  lineHeight: 18,
  color: colors.text,
  marginBottom: 5,
  textAlign: 'center'
}

const $resultText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 20,
  color: colors.textDim,
}