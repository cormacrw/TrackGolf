import React from "react"
import { Text, TextProps } from 'app/components/Text'
import { colors, typography } from 'app/theme'
import { TextStyle, View, ViewStyle } from 'react-native'
import Slider, { SliderProps } from '@react-native-community/slider'


export interface NumberSliderProps extends SliderProps {
  label?: TextProps["text"]
  value: number
}

export function NumberSlider (props: NumberSliderProps) {
  const {
    value,
  } = props

  return (
    <View style={$container}>
      <Text style={$valueText}>{value}</Text>
      <Slider
        style={$slider}
        minimumTrackTintColor={colors.primary}
        {...props}
      />
    </View>
  )
}

const $container: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 30,
  marginHorizontal: 30,
  marginVertical: 5,
  alignItems: 'center'
}

const $slider: ViewStyle = {
  width: '100%',
}

const $valueText: TextStyle = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: 32,
  lineHeight: 32,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold
}

