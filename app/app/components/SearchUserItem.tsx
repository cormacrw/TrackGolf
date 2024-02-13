import * as React from "react"
import { Pressable, PressableStateCallbackType, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { UserItem } from 'app/models'

export interface SearchUserItemProps {
  item: UserItem
  onPress: (item: UserItem) => void
}

/**
 * Describe your component here
 */
export const SearchUserItem = function SearchUserItem(props: SearchUserItemProps) {
  const { item } = props
  const $styles = [$container]

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  return (
    <Pressable style={$menu} onPress={() => props.onPress(item)}>
      <View style={$styles}>
        <View>
          <Text style={$text}>{item.username}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const $container: ViewStyle = {
  backgroundColor: colors.lightBackground,
  padding: 20,
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 5
}

const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.text,
}

