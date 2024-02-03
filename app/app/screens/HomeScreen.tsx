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

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props: HomeScreenProps) {
  const {
    navigation
  } = props
  const { userStore, appStore } = useStores()
  
  useEffect(() => {
    appStore.setLoading(false)
  }, [])
  // const { loading, data, refetch } = useQuery<GetUserStatsResponse>(GET_USER_STATS, { variables: { userId: userStore.userId } })
  // const stats = data?.getUserStats
  const stats = {} as any

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refetch()
    });

    return unsubscribe;
  }, [navigation])

  const toPercent = (number?: number | null) => {
    if (!number) {
      return '0%'
    }

    return Math.round(number * 100) + '%'
  }

  
  return (
    <Screen style={$container} preset="fixed">
      <Text style={$heading}>Dashboard</Text>
      <ScrollView>
        <RecentFormCard results={['W', 'W', 'D']} />

        <View style={[$statCardRow, $mt]}>
          <StatCard label='Games Tracked' value={stats?.gamesCount || 0} />
          <StatCard label='Win %' value={toPercent(stats?.winRate)} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Possession' value={toPercent(stats?.averagePossession)} />
          <StatCard label='Rage Quits' value={3} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average xG For' value={stats?.averageUserXG || 0} />
          <StatCard label='Average xG Against' value={stats?.averageOpponentXG || 0} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Shots For' value={stats?.averageUserShots || 0} />
          <StatCard label='Average Shots Against' value={stats?.averageOpponentShots || 0} />
        </View>
        <View style={$statCardRow}>
          <StatCard label='Average Goals For' value={stats?.averageUserGoals || 0} />
          <StatCard label='Average Goals Against' value={stats?.averageOpponentShots || 0} />
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