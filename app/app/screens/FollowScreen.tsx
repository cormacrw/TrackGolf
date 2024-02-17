import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text, View, Pressable, PressableStateCallbackType } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { colors, typography } from 'app/theme'
import { UserItem, useStores } from 'app/models'
import { ScrollView } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { SearchUserItem } from 'app/components/SearchUserItem'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FollowScreenProps extends AppStackScreenProps<"Follow"> {}

export const FollowScreen: FC<FollowScreenProps> = observer(function FollowScreen(props: FollowScreenProps) {
  const {
    navigation
  } = props
  // Pull in one of our MST stores
  const { socialStore, userStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const fetchData = () => {
    socialStore.fetchFollowingUsers(userStore.user.id)
  }

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    });

    return unsubscribe;
  }, [navigation])

  const onItemPress = (item: UserItem) => {
    socialStore.setCurrentUser(item)
    navigation.navigate('UserProfile')
  }


  return (
    <Screen style={$root} preset="fixed">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={$heading}>Following</Text>
        <Pressable style={$menu} onPress={() => navigation.navigate('SearchUser')}>
          <Icon name="plus" size={32} color={colors.primary} />
        </Pressable>
      </View>
      <ScrollView style={{ marginHorizontal: 20, minHeight: 600 }}>
        <FlashList
          data={socialStore.followingUsers}
          key={socialStore.followingUsers.length}
          renderItem={(props) => <SearchUserItem item={props.item as UserItem} onPress={onItemPress} />}
          estimatedItemSize={200}
          ListEmptyComponent={<Text style={$helpText}>No users found! Press the '+' in the top right to find a user to follow!</Text>}
        />
      </ScrollView>
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
  flex: 1
}

const $helpText: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.text,
  textAlign: 'center',
  marginTop: 20
}
