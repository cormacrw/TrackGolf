import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TextStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import { signOut } from 'aws-amplify/auth'
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const _signOut = async () => {
    await signOut()
    authStore.signout()
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text style={$heading}>Settings</Text>
      <Button
        text="Sign Out"
        textStyle={{color: colors.textDim}}
        onPress={() => _signOut()}
      />
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
