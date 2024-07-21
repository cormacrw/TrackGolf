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
import { roundNumber, toPercent } from 'app/utils/format'
import { ChampionsCard } from 'app/components/home/ChampionsCard'
import { ChampionsQualificationCard } from 'app/components/home/ChampionsQualificationCard'

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props: HomeScreenProps) {
  const {
    navigation
  } = props
  const { userStore, appStore, dashboardStore } = useStores()

  const [showFilter, setShowFilter] = useState(false)

  const fetchData = () => {
    dashboardStore.filters.resetTo()
    dashboardStore.fetchStats(userStore.user.id)
    dashboardStore.fetchRecentMatches(userStore.user.id)
  }
  
  useEffect(() => {
    appStore.setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
      if (!userStore.user.username) {
        navigation.navigate('Username')
      }
    });

    return unsubscribe;
  }, [navigation])


  const calcWinRate = () => {
    return toPercent((dashboardStore.stats.wins / dashboardStore.stats.matchesCount) * 100)
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
        <Text style={$heading}>Home</Text>
      </View>
      { showFilter &&
        <MatchFilter filters={dashboardStore.filters} onChange={onFilterChange} />
      }
      <ScrollView style={$scrollContainer}>
        <ChampionsCard wins={15} losses={10} onPress={navigation.navigate('')} />
        <ChampionsQualificationCard wins={15} losses={10} />
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
  paddingHorizontal: 20,
}

const $spacer: ViewStyle = {
  height: 150
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