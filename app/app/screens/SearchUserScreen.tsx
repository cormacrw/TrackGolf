import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, PressableStateCallbackType, Text, TextStyle, View, ViewStyle } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { Screen, TextField } from "app/components"
import { colors, typography } from 'app/theme'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

let timeout: NodeJS.Timeout

interface SearchUserScreenProps extends AppStackScreenProps<"SearchUser"> {}

export const SearchUserScreen: FC<SearchUserScreenProps> = observer(function SearchUserScreen(props: SearchUserScreenProps) {
  const {
    navigation
  } = props

  const [searchTerm, setSearchTerm] = useState('')

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  const searchForUsers = async () => {
  }

  useEffect(() => {
    console.log('search term!!!')
    clearTimeout(timeout)
    timeout = setTimeout(searchForUsers, 500)
  }, [searchTerm])

  return (
    <Screen style={$root} preset="scroll">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
        <Pressable style={$menu} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color={colors.text} />
        </Pressable>
        <Text style={$heading}>Find a user</Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <View style={$iconContainer}>
          <Icon name="search" size={28} color={colors.text} />
        </View>
        <TextField
          containerStyle={$inputContainer}
          inputWrapperStyle={$inputWrapperStyle}
          style={$input}
          value={searchTerm}
          placeholderTextColor={colors.placeholder}
          onChangeText={setSearchTerm}
          placeholder='search by username...'
          maxLength={20}
          id='username'
          autoFocus
          
        />
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

const $iconContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 35,
  backgroundColor: colors.lightBackground,
  paddingLeft: 10,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8
}

const $inputContainer: ViewStyle = {
  flex: 1
}

const $input: TextStyle = {
  paddingLeft: 5,
  // height: 40,
  backgroundColor: colors.lightBackground,
  borderColor: colors.lightBackground,
  color: colors.text
}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.lightBackground,
  borderColor: colors.lightBackground,
  paddingVertical: 10,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8
}