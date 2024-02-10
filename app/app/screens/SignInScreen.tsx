import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Image, ImageStyle, View, ViewStyle } from 'react-native'
import { AppStackScreenProps } from 'app/navigators'
import { Button, Screen } from 'app/components'
import { colors } from 'app/theme'
import { signInWithRedirect } from "aws-amplify/auth"
import { Hub } from "@aws-amplify/core";
import { useStores } from 'app/models'

const logo = require('../../assets/images/icon-large.png')

interface SignInScreenProps extends AppStackScreenProps<'SignIn'> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen(props) {
  // Pull in one of our MST stores
  const { authStore, userStore, appStore } = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      console.log(payload)
      switch (payload.event) {
        case "signInWithRedirect":
          signIn();
          break;
        case "signInWithRedirect_failure":
          console.log('ERROR')
          // setError("An error has ocurred during the OAuth flow.");
          break;
        case "customOAuthState":
          // setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });
    appStore.setLoading(false)

    signIn();

    return unsubscribe;
  }, []);
  
  const signIn = async (): Promise<void> => {
    try {
      appStore.setLoading(true)
      const isLoggedIn = await authStore.checkLogin()
      console.log(isLoggedIn)
      if (isLoggedIn) {
        const user = await authStore.login()

        if (user) {
          userStore.setUser(user)
        }
      }

      appStore.setLoading(false)
    } catch (error) {
      console.log(error);
      console.log("Not signed in");
    }
  };
  return (
    <Screen style={$root} preset='auto'>
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}
      >
        <Image source={logo} style={$image} />
        <Button
          text="Sign in"
          textStyle={{color: colors.textDim}}
          onPress={() => signInWithRedirect()}
          style={{marginTop: 10, minWidth: 300}}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1
}

const $image: ImageStyle = {
  height: 300,
  width: 300
}