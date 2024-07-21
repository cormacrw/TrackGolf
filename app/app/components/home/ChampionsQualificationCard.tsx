import { colors, typography } from 'app/theme'
import React from "react"
import { Image, ImageStyle, Pressable, PressableStateCallbackType, Text, TextStyle, View, ViewStyle } from 'react-native'

const img = require('../../../assets/images/bullseye.png')

export interface ChampionsQualificationCardProps {
  wins: number
  losses: number
}

export function ChampionsQualificationCard(props: ChampionsQualificationCardProps) {

  const {
    wins,
    losses
  } = props

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}],
      { marginVertical: 10 }
    ]
  }

  return (
    <Pressable style={$menu}>
      <View style={$card}>
        <Image source={img} style={$img} />
        <Text style={$title}>Champions Qualification</Text>
        <View style={$scoresContainer}>
          <Text style={[$score, $green]}>{wins}</Text>
          <Text style={[$label, $green]}>wins</Text>
          <Text style={[$score, $red, {marginLeft: 10}]}>{losses}</Text>
          <Text style={[$label, $red]}>losses</Text>
        </View>
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
  paddingVertical: 15,
  paddingHorizontal: 25,
  borderRadius: 15,
  height: 160,
  justifyContent: 'space-between'
}

const $scoresContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
}

const $score: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 32,
}

const $label: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 20,
  marginBottom: 3,
  marginLeft: 5
}

const $green: TextStyle = {
  color: colors.palette.winGreen
}

const $red: TextStyle = {
  color: colors.palette.red,
}

const $img: ImageStyle = {
  position: 'absolute',
  right: 40
}