import React from "react"
import { Text, TextProps } from 'app/components/Text'
import { colors, typography } from 'app/theme'
import { Pressable, PressableStateCallbackType, TextStyle, View, ViewStyle } from 'react-native'


export interface NumberPickerProps {
  label?: TextProps["text"]
  value: number
  showSmallIncrements?: boolean
  onChange: (newVal: number) => void
}

export function NumberPicker (props: NumberPickerProps) {
  const {
    label,
    value,
    onChange,
    showSmallIncrements
  } = props

  function $buttonStyle({ pressed }: PressableStateCallbackType) {
    return [
      $buttonContainer,
      !!pressed && [$pressedContainer]
    ]
  }

  function $smallButtonStyle({ pressed }: PressableStateCallbackType) {
    return [
      $smallButtonContainer,
      !!pressed && [$pressedContainer]
    ]
  }

  function $textStyle({ pressed }: PressableStateCallbackType) {
    return [
      $buttonText,
      !!pressed && [$pressedText]
    ]
  }

  function $smallTextStyle({ pressed }: PressableStateCallbackType) {
    return [
      $smallButtonText,
      !!pressed && [$pressedText]
    ]
  }

  const showNegative = value > 0


  return (
    <View style={$container}>
      { showSmallIncrements
        ? <Pressable
        style={$smallButtonStyle}
        onPress={() => onChange(((value * 10) + 1) / 10)}
        >
          {(state) => (
            <Text style={$smallTextStyle(state)}>+</Text>
          )}
        </Pressable>
        : <View style={$smallShellButton}></View>
      }
      <Pressable
        style={$buttonStyle}
        onPress={() => onChange(((value * 10) + 10) / 10)}
      >
        {(state) => (
          <Text style={$textStyle(state)}>+</Text>
        )}
      </Pressable>
      <View style={$innerContainer}>
        <Text style={$labelText} text={label} />
        <Text style={$scoreText} text={value?.toString()} />
      </View>
      {
        showNegative
        ? <Pressable
          style={$buttonStyle}
          onPress={() => onChange(((value * 10) - 10) / 10)}
        >
          {(state) => (
            <Text style={$textStyle(state)}>-</Text>
          )}
        </Pressable>
        : <View style={$shellButton}></View>
      }
       { showSmallIncrements && showNegative
        ? <Pressable
        style={$smallButtonStyle}
        onPress={() => onChange(((value * 10) - 1) / 10)}
        >
          {(state) => (
            <Text style={$smallTextStyle(state)}>-</Text>
          )}
        </Pressable>
        : <View style={$smallShellButton}></View>
      }
    </View>
  )
}

const $container: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 30,
  marginHorizontal: 5,
  marginVertical: 5,
  alignItems: 'center'
}

const $innerContainer: ViewStyle = {
  backgroundColor: colors.darkBackground,
  paddingVertical: 15,
  width: 100,
  borderRadius: 10,
  marginVertical: 15
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
  fontSize: 32,
  lineHeight: 40,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold
}


const $smallButtonText: TextStyle = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: 16,
  lineHeight: 20,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold
}


const $buttonContainer: ViewStyle = {
  backgroundColor: colors.primaryTransparent,
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center'
}

const $smallButtonContainer: ViewStyle = {
  backgroundColor: colors.primaryTransparent,
  width: 25,
  height: 25,
  borderRadius: 25,
  marginVertical: 7,
  justifyContent: 'center'
}

const $shellButton: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center'
}

const $smallShellButton: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center'
}

const $pressedText: TextStyle = {
  opacity: 0.6
}

const $pressedContainer: ViewStyle = {
  opacity: 0.6
}