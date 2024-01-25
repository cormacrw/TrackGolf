import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface StatCardProps {
  label: string

  value: string | number
}

/**
 * Describe your component here
 */
export const StatCard = observer(function StatCard(props: StatCardProps) {
  const {
    label,
    value
  } = props

  return (
    <View style={$container}>
      <Text style={$label}>{label}</Text>
      <Text style={$value}>{value}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.lightBackground,
  paddingHorizontal: 15,
  paddingVertical: 30,
  borderRadius: 10,
  flex: 1
}

const $label: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 12,
  color: colors.text,
  textAlign: 'center',
}


const $value: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 60,
  lineHeight: 60,
  color: colors.text,
  textAlign: 'center',
  marginTop: 10,
  letterSpacing: -5
}