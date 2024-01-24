import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { View, ViewStyle } from 'react-native'
import { AppStackScreenProps } from 'app/navigators'
import { Button, Screen, Text } from 'app/components'
import { colors } from 'app/theme'
import { getCurrentUser, signInWithRedirect, fetchUserAttributes } from "aws-amplify/auth"
import { Hub } from "@aws-amplify/core";
import { useMutation } from '@apollo/client'
import { SIGN_IN_GOOGLE_USER, SignInGoogleUserResponse } from '../services/api/gql/mutations/signInGoogleUser'
import { api } from 'app/services/api'
import { useStores } from 'app/models'

interface SignInScreenProps extends AppStackScreenProps<'SignIn'> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen(props) {
  // Pull in one of our MST stores
  const { authStore, userStore, appStore } = useStores()
  const [signInGoogleUser] = useMutation<SignInGoogleUserResponse>(SIGN_IN_GOOGLE_USER, { client: api.clientInst })

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

    // signIn();

    return unsubscribe;
  }, []);
  
  const signIn = async (): Promise<void> => {
    try {
      appStore.setLoading(true)
      const cognitoUser = await getCurrentUser()
      const attr = await fetchUserAttributes()
      const { data, errors } = await signInGoogleUser({variables: {email: attr.email, googleId: cognitoUser.username}})

      if (errors && errors.length) {
        console.error(errors)
      }

      if (data) {
        authStore.setTokens(data.signInGoogleUser.auth.accessToken, data.signInGoogleUser.auth.refreshToken)
        userStore.setUser(data.signInGoogleUser.user)
        appStore.setLoading(false)
        authStore.login()
      }
      // setUser(currentUser);
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
          onPress={() => signInWithRedirect({ provider: 'Google' })}
          style={{marginTop: 10}}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1
}
