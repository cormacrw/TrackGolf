import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, PressableStateCallbackType, TextStyle, View, ViewStyle } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UserProfileScreenProps extends AppStackScreenProps<"UserProfile"> {}

export const UserProfileScreen: FC<UserProfileScreenProps> = observer(function UserProfileScreen(props: UserProfileScreenProps) {
  const {
    navigation
  } = props

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
        <Pressable style={$menu} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color={colors.text} />
        </Pressable>
        <Text style={$heading}>User</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={$usernameTxt}>BigAL</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10}}>
          <Text style={$followTxt}>43 Followers</Text>
          <Text style={$followTxt}>43 Following</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Pressable style={$menu}>
            <View style={$followBtn}>
              <Text style={$followBtnTxt}>Follow</Text>
            </View>
          </Pressable>
        </View>
        
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $heading: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 28,
  lineHeight: 28,
  marginBottom: 10,
  marginTop: 15,
  marginLeft: 10
}

const $usernameTxt: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 24,
  lineHeight: 24,
  textAlign: 'center'
}

const $followTxt: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 14,
  lineHeight: 14,
}

const $followBtn: ViewStyle = {
  backgroundColor: colors.primary,
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 5
}

const $followBtnTxt: TextStyle = {
  color: colors.textDim,
  fontFamily: typography.primary.bold,
  fontSize: 14,
  lineHeight: 14
}
