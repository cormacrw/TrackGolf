import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'
import { USERNAME_MESSAGE_MAP } from 'app/services/api/controllers/user/userApi.types'

interface UsernameScreenProps extends AppStackScreenProps<"Username"> {}

export const UsernameScreen: FC<UsernameScreenProps> = observer(function UsernameScreen(props: UsernameScreenProps) {
  const {
    navigation
  } = props

  const { userStore, appStore } = useStores()
  const [username, setUsername] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    appStore.setLoading(false)
    if ( userStore.username ) {
      navigation.navigate('TabsNav', { screen: 'Home' })
    }
  }, [])

  const submit = async () => {
    const response = await userStore.setUsername(username)

    if (!response?.success) {
      if (response?.message) {
        setErrorMsg(USERNAME_MESSAGE_MAP[response.message])
      }
      return
    }

    setErrorMsg('')
    navigation.navigate('TabsNav', { screen: 'Home' })
  }

  return (
    <Screen style={$root} preset="fixed">
      <Text style={$question}>Pick a username</Text>
      <Text style={$error}>{errorMsg}</Text>
      <TextField
        containerStyle={$inputContainer}
        inputWrapperStyle={$inputWrapperStyle}
        style={$input}
        value={username}
        placeholderTextColor={colors.textDim}
        onChangeText={setUsername}
        placeholder='username'
        maxLength={20}
        id='username'
        autoFocus
      />
    <View style={$buttonContainer}>
      <Button text={'Confirm'} style={[$button, $buttonNext]} textStyle={$buttonText} onPress={submit} />
    </View>

    </Screen>
  )
})

const $question: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
  marginBottom: 10
}

const $error: TextStyle = {
  color: colors.error,
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
  marginBottom: 10
}


const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const $inputContainer: ViewStyle = {
  width: 300,
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
  paddingVertical: 10
}

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 10
}

const $button: ViewStyle = {
  width: 300,
  height: 50,
}

const $buttonNext: ViewStyle = {
  backgroundColor: colors.primary,
  borderColor: colors.primary
}

const $buttonText: TextStyle = {
  color: colors.textDim,
  fontFamily: typography.primary.bold,
  fontSize: 20
}

