import * as React from "react"
import { Pressable, PressableStateCallbackType, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'
/*
 * Describe your component here
 */
export const NavTabs = observer(function NavTabs(props: BottomTabBarProps) {
  const {
    state,
    navigation
  } = props

  console.log(state)
  const $styles = [$container]

  const isFocused = (routeName: string) => {
    return state.routeNames.findIndex(r => r === routeName) === state.index
  }

  const onPress = (routeName: string) => {
    if (!isFocused(routeName)) {
      navigation.navigate(routeName);
    }
  };

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      $menuItem,
      !!pressed && [{opacity: 0.6}]
    ]
  }

  function $new({ pressed }: PressableStateCallbackType) {
    return [
      $newMenu,
      !!pressed && [{opacity: 0.6}]
    ]
  }

  return (
    <View style={$styles}>
      <Pressable style={$menu} onPress={() => onPress('Home')}>
        <Icon name="home" size={32} color={isFocused('Home') ? colors.primary : colors.text} />
      </Pressable>
      <Pressable style={$menu} onPress={() => onPress('Matches')}>
        <Icon name="layers" size={32} color={isFocused('Matches') ? colors.primary : colors.text} />
      </Pressable>
      <Pressable style={$new} onPress={() => onPress('Wizard')}>
        <Icon name="plus" size={60} color={colors.text} />
      </Pressable>
      <Pressable style={$menu} onPress={() => onPress('Follow')}>
        <Icon name="users" size={32} color={isFocused('Follow') ? colors.primary : colors.text} />
      </Pressable>
      <Pressable style={$menu} onPress={() => onPress('Settings')}>
        <Icon name="settings" size={32} color={isFocused('Settings') ? colors.primary : colors.text} />
      </Pressable>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "space-evenly",
  flexDirection: 'row',
  height: 90,
  backgroundColor: colors.lightBackground
}

const $menuItem: ViewStyle = {
  justifyContent: 'center',
}

const $newMenu: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: colors.primary,
  height: 80,
  width: 80,
  alignItems: 'center',
  borderRadius: 45,
  position: 'relative',
  bottom: 30
}


