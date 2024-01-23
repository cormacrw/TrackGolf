import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { signOut } from 'aws-amplify/auth'
import { useStores } from 'app/models'
import { colors } from 'app/theme'
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
      <Text text="settings" />
      <Button
        text="Sign Out"
        textStyle={{color: colors.textDim}}
        onPress={() => _signOut()}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
