import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { View, ViewStyle } from 'react-native'
import { AppStackScreenProps } from 'app/navigators'
import { Button, Screen, Text } from 'app/components'
import { colors } from 'app/theme'
import { AuthUser, getCurrentUser, signInWithRedirect, signOut, fetchUserAttributes } from "aws-amplify/auth"
import { Hub } from "@aws-amplify/core";

interface SignInScreenProps extends AppStackScreenProps<'SignIn'> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          console.log(payload)
          getUser();
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

    signIn();

    return unsubscribe;
  }, []);
  
  const signIn = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      const attr = await fetchUserAttributes();
      console.log(currentUser)
      console.log(attr.email)
      // setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };
  console.log('test')
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

        {/* <Button
          text="Sign Out"
          textStyle={{color: colors.textDim}}
          onPress={() => signOut()}
        /> */}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1
}
