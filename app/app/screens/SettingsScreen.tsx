import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TextStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { authStore } = useStores()

  const _signOut = async () => {
    await authStore.logout()
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
  fontSize: 28,
  marginBottom: 10,
  marginTop: 15
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20
}
