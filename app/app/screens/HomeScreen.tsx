import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, ViewStyle, Text, View, ScrollView, PressableStateCallbackType, Pressable } from "react-native"
import {
  RecentFormCard,
  Screen,
  StatCard
} from "app/components"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "../navigators"
import { useStores } from 'app/models'
import { colors, typography } from 'app/theme'
import { getResult } from 'app/utils/match'
import { MatchFilter } from 'app/components/MatchFilter'

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props: HomeScreenProps) {
  const {
    navigation
  } = props
  const { userStore, appStore, dashboardStore } = useStores()

  const [showFilter, setShowFilter] = useState(false)

  const fetchData = () => {
    dashboardStore.fetchStats(userStore.id)
    dashboardStore.fetchRecentMatches(userStore.id)
  }
  
  useEffect(() => {
    appStore.setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
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

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  const onFilterChange = () => {
      fetchData()
  }

  return (
    <Screen style={$container} preset="fixed">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={$heading}>Dashboard</Text>
        <Pressable style={$menu} onPress={() => setShowFilter(!showFilter)}>
          <Icon name="filter" size={32} color={colors.primary} />
        </Pressable>
      </View>
      { showFilter &&
        <MatchFilter filters={dashboardStore.filters} onChange={onFilterChange} />
      }
      <ScrollView style={$scrollContainer}>

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
}

const $scrollContainer: ViewStyle = {
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