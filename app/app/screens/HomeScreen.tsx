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

  const roundNumber = (number?: number | null) => {
    if (!number) {
      return '0'
    }

    return Math.round(number * 100) / 100
  }

  const results = [
    {
      name: "Wins",
      population: 10,
      color: colors.primary,
      legendFontColor: colors.text,
      legendFontSize: 18
    },
    {
      name: "Draws",
      population: 4,
      color: '#fcba03',
      legendFontColor: colors.text,
      legendFontSize: 18
    },
    {
      name: "Losses",
      population: 6,
      color: colors.error,
      legendFontColor: colors.text,
      legendFontSize: 18
    }
  ]
  const labels = ['Wins', 'Draws', 'Losses']

  return (
    <Screen style={$container} preset="fixed">
      <Text style={$heading}>Dashboard</Text>
      <ScrollView>
        <RecentFormCard results={dashboardStore.recentMatches.map(m => getResult(m))} />

        <View>
        </View>

        <View style={[$statCardRow, $mt]}>
          <StatCard label='Games Tracked' value={dashboardStore.matchesCount} />
          <StatCard label='Win %' value={toPercent(0)} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Possession' value={toPercent(dashboardStore.averageUserPossession)} />
          <StatCard label='Rage Quits' value={0} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average xG For' value={roundNumber(dashboardStore.averageUserXG)} />
          <StatCard label='Average xG Against' value={roundNumber(dashboardStore.averageOpponentXG)} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Shots For' value={roundNumber(dashboardStore.averageUserShots)} />
          <StatCard label='Average Shots Against' value={roundNumber(dashboardStore.averageOpponentShots)} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Goals For' value={roundNumber(dashboardStore.averageUserScore)} />
          <StatCard label='Average Goals Against' value={roundNumber(dashboardStore.averageOpponentScore)} />
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