import { TextProps } from 'app/components/Text'
import { colors, typography } from 'app/theme'
import React from "react"
import { Pressable, PressableProps, PressableStateCallbackType, Text, TextStyle, ViewStyle } from 'react-native'

export interface OptionPillProps extends PressableProps {
  label?: TextProps["text"]
  active?: boolean
}

export function OptionPill (props: OptionPillProps) {
  const {
    label,
    active,
    ...rest
  } = props

  function $viewStyle({ pressed }: PressableStateCallbackType) {
    return [
      $container,
      !!pressed && [$pressedContainer],
      active && [$activeContainer]
    ]
  }

  function $textStyle({ pressed }: PressableStateCallbackType) {
    return [
      $text,
      !!pressed && [$pressedText],
      active && [$activeText]
    ]
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole='button'
      {...rest}
    >
      {(state) => (
        <Text style={$textStyle(state)}>{label}</Text>
      )}
    </Pressable>
  )
}

const $container: ViewStyle = {
  backgroundColor: colors.lightBackground,
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 30,
  marginHorizontal: 5,
  marginVertical: 5
}

const $text: TextStyle = {
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