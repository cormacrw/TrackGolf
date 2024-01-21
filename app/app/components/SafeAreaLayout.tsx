import { colors } from "app/theme"
import { useSafeAreaInsetsStyle } from 'app/utils/useSafeAreaInsetsStyle'
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

export interface SafeAreaLayoutProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * Describe your component here
 */
export const SafeAreaLayout = observer(function SafeAreaLayout(props: SafeAreaLayoutProps) {
  const { style, children } = props
  const $styles = [$containerInsets]

  return (
    <View style={$styles}>
      {children}
    </View>
  )
})

const $containerInsets = useSafeAreaInsetsStyle(["bottom", "top"])


const $container: ViewStyle = {
  backgroundColor: colors.background
}