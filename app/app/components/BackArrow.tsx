import * as React from "react"
import { Pressable, PressableStateCallbackType } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

export interface BackArrowProps {
}

/**
 * Describe your component here
 */
export const BackArrow = observer(function BackArrow() {
  const navigation = useNavigation()

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  return (
    <Pressable style={$menu} onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" color={colors.text} size={32} />
    </Pressable>
  )
})