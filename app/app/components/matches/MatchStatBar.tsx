import * as React from "react"
import { DimensionValue, Text, TextStyle, View } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"

export interface MatchStatBarProps {
  label: string
  leftVal: number
  rightVal: number
}

/**
 * Describe your component here
 */
export const MatchStatBar = observer(function MatchStatBar(props: MatchStatBarProps) {
  const {
    label,
    leftVal,
    rightVal
  } = props

  const total = leftVal + rightVal
  let leftPct = Math.round((leftVal / total) * 100)
  let rightPct = 100 - leftPct

  if (leftVal === 0 && rightVal === 0) {
    leftPct = 50
    rightPct = 50
  }

  return (
    <View>
      <Text style={[$heading, { textAlign: 'center', marginBottom: 10 }]}>{label}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 30, width: leftPct + '%' as DimensionValue, backgroundColor: colors.primary, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}></View>
        <View style={{height: 30, width: rightPct + '%' as DimensionValue, backgroundColor: colors.error, borderTopRightRadius: 15, borderBottomRightRadius: 15}}></View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={$val}>{leftVal}</Text>
        <Text style={$val}>{rightVal}</Text>
      </View>
    </View>
  )
})

const $heading: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.text,
  marginTop: 10,
  fontSize: 18
}

const $val: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.text,
  fontSize: 16,
  marginTop: 4
}
