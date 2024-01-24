import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MatchesScreenProps extends AppStackScreenProps<"Matches"> {}

export const MatchesScreen: FC<MatchesScreenProps> = observer(function MatchesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text style={$heading}>Matches</Text>
    </Screen>
  )
})

const $heading: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 22
}

const $root: ViewStyle = {
  flex: 1,
  marginHorizontal: 20

}
