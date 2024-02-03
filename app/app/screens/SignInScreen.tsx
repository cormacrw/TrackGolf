import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { View, ViewStyle } from 'react-native'
import { AppStackScreenProps } from 'app/navigators'
import { Button, Screen, Text } from 'app/components'
import { colors } from 'app/theme'
import { getCurrentUser, signInWithRedirect, fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth"
import { Hub } from "@aws-amplify/core";
import { useStores } from 'app/models'

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
      const session = await fetchAuthSession()

      if (session.tokens?.idToken) {
        authStore.login()
      }

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
        <Text text='TrackUT' weight='bold' size='xxl' />
        <Button
          text="Sign in with Google"
          textStyle={{color: colors.textDim}}
          onPress={() => signInWithRedirect()}
          style={{marginTop: 10}}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1
}
