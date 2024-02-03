import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FollowScreenProps extends AppStackScreenProps<"Follow"> {}

export const FollowScreen: FC<FollowScreenProps> = observer(function FollowScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text style={$heading}>Social Feed</Text>
      <Text>Coming Soon!</Text>

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
  flex: 1,
  marginHorizontal: 20
}
