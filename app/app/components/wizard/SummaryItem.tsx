import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'

export interface SummaryItemProps {
  label: string
  value?: string | number
}

export const SummaryItem = observer(function SummaryItem (props: SummaryItemProps) {
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
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 8,
}

const $label: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
}

const $value: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
}