import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  SafeAreaLayout,
  Screen,
  Text,
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { signOut } from "aws-amplify/auth"
import { useStores } from 'app/models'

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props) {
  const {
    navigation
  } = props
  
  
  return (
    <Screen style={$container} preset="fixed">
      <Text text="Home" />
      <Button text="New Match" style={$button} textStyle={$buttonText} onPress={() => navigation.navigate('Wizard')} />
      <Button text="Settings" style={$button} textStyle={$buttonText} onPress={() => navigation.navigate('Settings')} />
    </Screen>
    )
})

const $container: ViewStyle = {
  flex: 1
}

const $button: ViewStyle = {
  
}

const $buttonText: TextStyle = {
  color: colors.textDim
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
