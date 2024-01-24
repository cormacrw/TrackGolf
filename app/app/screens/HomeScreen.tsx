import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { TextStyle, ViewStyle, Text } from "react-native"
import {
  Screen
} from "app/components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { appStore, userStore } = useStores()
  
  useEffect(() => {
    appStore.setLoading(false)
    console.log('USERID', userStore.userId)
  }, [])
  
  return (
    <Screen style={$container} preset="fixed">
      <Text style={$heading}>Dashboard</Text>
    </Screen>
    )
})

const $heading: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 22
}

const $container: ViewStyle = {
  flex: 1,
  marginHorizontal: 20
}