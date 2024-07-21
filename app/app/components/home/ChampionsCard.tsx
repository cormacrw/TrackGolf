import { colors, typography } from 'app/theme'
import React from "react"
import { Image, ImageStyle, Pressable, PressableStateCallbackType, Text, TextStyle, View, ViewStyle } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

const img = require('../../../assets/images/trophy.png')

export interface ChampionsCardProps {
  wins: number
  losses: number
  onPress: () => void
}

function InnerLabel ({ wins }: { wins: number }) {
  return (
    <View>
      <Text style={$wins}>{wins}</Text>
      <Text style={$winsLabel}>wins</Text>
    </View>
  )
}

export function ChampionsCard(props: ChampionsCardProps) {

  const {
    wins,
    losses,
    onPress
  } = props

  const data = [{ value: wins || 100, color: colors.palette.winGreen }, { value: losses || 0, color: colors.palette.red }]

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}],
      { marginBottom: 10 }
    ]
  }

  return (
    <Pressable style={$menu} onPress={onPress}>
      <View style={$card}>
        <Image source={img} style={$img} />
        <Text style={$title}>Champions</Text>
        <PieChart
          data={data}
          donut
          radius={60}
          innerRadius={40}
          innerCircleColor={colors.lightBackground}
          centerLabelComponent={() => <InnerLabel wins={wins || 0} />}
        />
      </View>
    </Pressable>
  )
}

const $title: TextStyle = {
  fontFamily: typography.primary.bold,
  color: colors.text,
  fontSize: 18
}

const $card: ViewStyle = {
  backgroundColor: colors.lightBackground,
  paddingVertical: 20,
  paddingHorizontal: 25,
  borderRadius: 15,
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const $wins: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.primary.bold,
  fontSize: 32,
  color: colors.text
}

const $winsLabel: TextStyle = {
  textAlign: 'center',
  color: colors.text,
  fontFamily: typography.primary.bold,
  fontSize: 12,
  lineHeight: 12
}

const $img: ImageStyle = {
  position: 'absolute',
  top: -30,
  left: -20,
}