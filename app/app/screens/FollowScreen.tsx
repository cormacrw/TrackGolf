import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text, View, Pressable, PressableStateCallbackType } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FollowScreenProps extends AppStackScreenProps<"Follow"> {}

export const FollowScreen: FC<FollowScreenProps> = observer(function FollowScreen(props: FollowScreenProps) {
  const {
    navigation
  } = props
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  return (
    <Screen style={$root} preset="fixed">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={$heading}>Social Feed</Text>
        <Pressable style={$menu} onPress={() => navigation.navigate('SearchUser')}>
          <Icon name="plus" size={32} color={colors.primary} />
        </Pressable>
      </View>

    </Screen>
  )
})

const $heading: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 28,
  marginBottom: 10,
  marginTop: 15
}

const $root: ViewStyle = {
  flex: 1
}
