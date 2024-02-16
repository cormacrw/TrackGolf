import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, PressableStateCallbackType, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { RecentFormCard, Screen, StatCard, Text } from "app/components"
import { colors, typography } from 'app/theme'
import { useStores } from 'app/models'
import { getResult } from 'app/utils/match'
import { roundNumber, toPercent } from 'app/utils/format'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UserProfileScreenProps extends AppStackScreenProps<"UserProfile"> {}

export const UserProfileScreen: FC<UserProfileScreenProps> = observer(function UserProfileScreen(props: UserProfileScreenProps) {
  const {
    navigation
  } = props

  const { socialStore } = useStores()

  const fetchData = () => {
    socialStore.filters.resetTo()
    socialStore.fetchStats(socialStore.currentUser?.id || '')
    socialStore.fetchRecentMatches(socialStore.currentUser?.id || '')
  }

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  const calcWinRate = () => {
    return toPercent(((socialStore.currentUserStats?.wins || 0) / (socialStore.currentUserStats?.matchesCount || 0)) * 100)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    });

    return unsubscribe;
  }, [navigation])

  const followUser = async () => {

  }

  const unfollowUser = async () => {

  }

  return (
    <Screen style={$root} preset="fixed">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
        <Pressable style={$menu} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color={colors.text} />
        </Pressable>
        <Text style={$heading}>User</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={$usernameTxt}>{socialStore.currentUser?.username}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 15 }}>
          {/* <Pressable style={$menu}>
            <Text style={$followTxt}>43 Followers</Text>
          </Pressable>
          <Pressable style={$menu}>
            <Text style={$followTxt}>43 Following</Text>
          </Pressable> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
          <Pressable style={$menu}>
            <View style={$followBtn}>
              <Text style={$followBtnTxt}>Follow</Text>
            </View>
          </Pressable>
          <Pressable style={$menu}>
            <View style={$unfollowBtn}>
              <Text style={$unfollowBtnTxt}>Following</Text>
            </View>
          </Pressable>
        </View>
        <ScrollView style={$scrollContainer}>

          <RecentFormCard results={socialStore.currentUserRecentMatches.map(m => getResult(m))} />

          <View style={[$statCardRow, $mt]}>
            <StatCard label='Games Tracked' value={socialStore.currentUserStats?.matchesCount || 0} />
            <StatCard label='Win %' value={calcWinRate()} />
          </View>
          <View style={$statCardRow}>
            <StatCard label='Average Possession' value={toPercent(socialStore.currentUserStats?.averageUserPossession)} />
            <StatCard label='Rage Quits' value={socialStore.currentUserStats?.rageQuits || 0} />
          </View>
          <View style={$statCardRow}>
            <StatCard label='Average xG For' value={roundNumber(socialStore.currentUserStats?.averageUserXG)} />
            <StatCard label='Average xG Against' value={roundNumber(socialStore.currentUserStats?.averageOpponentXG)} />
          </View>
          <View style={$statCardRow}>
            <StatCard label='Average Shots For' value={roundNumber(socialStore.currentUserStats?.averageUserShots)} />
            <StatCard label='Average Shots Against' value={roundNumber(socialStore.currentUserStats?.averageOpponentShots)} />
          </View>
          <View style={$statCardRow}>
            <StatCard label='Average Goals For' value={roundNumber(socialStore.currentUserStats?.averageUserScore)} />
            <StatCard label='Average Goals Against' value={roundNumber(socialStore.currentUserStats?.averageOpponentScore)} />
          </View>
          <View style={$spacer} />
        </ScrollView>
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
  fontSize: 32,
  lineHeight: 32,
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
  borderRadius: 5,
  borderWidth: 1,
  borderColor: colors.primary
}

const $followBtnTxt: TextStyle = {
  color: colors.textDim,
  fontFamily: typography.primary.bold,
  fontSize: 14,
  lineHeight: 14
}

const $unfollowBtn: ViewStyle = {
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: colors.primary
}

const $unfollowBtnTxt: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 14,
  lineHeight: 14
}


const $scrollContainer: ViewStyle = {
  paddingHorizontal: 20,
  marginTop: 25
}

const $statCardRow: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  justifyContent: 'space-between',
  marginBottom: 10
}

const $mt: ViewStyle ={ 
  marginTop: 10
}

const $spacer: ViewStyle = {
  height: 400
}