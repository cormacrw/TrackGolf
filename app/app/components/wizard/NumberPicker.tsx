import React from "react"
import { Text, TextProps } from 'app/components/Text'
import { colors, typography } from 'app/theme'
import { Pressable, PressableProps, PressableStateCallbackType, TextStyle, View, ViewStyle } from 'react-native'


export interface NumberPickerProps {
  label?: TextProps["text"]
  value: number
  onChange: (newVal: number) => void
}

export function NumberPicker (props: NumberPickerProps) {
  const {
    label,
    value,
    onChange
  } = props

  function $buttonStyle({ pressed }: PressableStateCallbackType) {
    return [
      $container,
      !!pressed && [$pressedContainer]
    ]
  }

  function $textStyle({ pressed }: PressableStateCallbackType) {
    return [
      $buttonText,
      !!pressed && [$pressedText]
    ]
  }


  return (
    <View style={$container}>
      <Pressable
        style={$buttonStyle}
        onPress={() => onChange(value + 1)}
      >
        {(state) => (
          <Text style={$textStyle(state)}>+</Text>
        )}
      </Pressable>
      <View style={$innerContainer}>
        <Text style={$labelText} text={label} />
        <Text style={$scoreText} text={value?.toString()} />
      </View>
      <Pressable
        style={$buttonStyle}
        onPress={() => onChange(value - 1)}
      >
        {(state) => (
          <Text style={$textStyle(state)}>-</Text>
        )}
      </Pressable>
    </View>
  )
}

const $container: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 30,
  marginHorizontal: 5,
  marginVertical: 5
}

const $innerContainer: ViewStyle = {
  backgroundColor: colors.darkBackground,
  paddingVertical: 15,
  width: 100,
  borderRadius: 10
}
const $labelText: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 16,
  lineHeight: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
  marginBottom: 12
}

const $scoreText: TextStyle = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: 32,
  lineHeight: 32,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold
}

const $buttonText: TextStyle = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: 16,
  lineHeight: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold
}

const $pressedText: TextStyle = {
  opacity: 0.6
}

const $pressedContainer: ViewStyle = {
  opacity: 0.6
}

const $activeContainer: ViewStyle = {
  backgroundColor: colors.primary
}

const $activeText: TextStyle = {
  color: colors.background
}