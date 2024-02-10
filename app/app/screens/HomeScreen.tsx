import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { TextStyle, ViewStyle, Text, View, ScrollView } from "react-native"
import {
  RecentFormCard,
  Screen,
  StatCard
} from "app/components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'
import { getResult } from 'app/utils/match'

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props: HomeScreenProps) {
  const {
    navigation
  } = props
  const { userStore, appStore, dashboardStore } = useStores()
  
  useEffect(() => {
    appStore.setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dashboardStore.fetchStats(userStore.id)
      dashboardStore.fetchRecentMatches(userStore.id)
      if (!userStore.username) {
        navigation.navigate('Username')
      }
    });

    return unsubscribe;
  }, [navigation])

  const toPercent = (number?: number | null) => {
    if (!number) {
      return '0%'
    }

    return Math.round(number) + '%'
  }

  
  return (
    <Screen style={$container} preset="fixed">
      <Text style={$heading}>Dashboard</Text>
      <ScrollView>
        <RecentFormCard results={dashboardStore.recentMatches.map(m => getResult(m))} />

        <View style={[$statCardRow, $mt]}>
          <StatCard label='Games Tracked' value={dashboardStore.matchesCount} />
          <StatCard label='Win %' value={toPercent(0)} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Possession' value={toPercent(dashboardStore.averageUserPossession)} />
          <StatCard label='Rage Quits' value={0} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average xG For' value={dashboardStore.averageUserXG} />
          <StatCard label='Average xG Against' value={dashboardStore.averageOpponentXG} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Shots For' value={dashboardStore.averageUserShots} />
          <StatCard label='Average Shots Against' value={dashboardStore.averageOpponentShots} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Goals For' value={dashboardStore.averageUserScore} />
          <StatCard label='Average Goals Against' value={dashboardStore.averageOpponentScore} />
        </View>
        <View style={$spacer} />
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

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20
}

const $spacer: ViewStyle = {
  height: 50
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