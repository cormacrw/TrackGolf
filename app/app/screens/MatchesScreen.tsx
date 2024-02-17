import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text, ScrollView, View, Pressable, PressableStateCallbackType } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { MatchListItem, Screen } from "app/components"
import { colors, typography } from 'app/theme'
import { MatchItem, useStores } from 'app/models'
import { FlashList } from '@shopify/flash-list'
import { MatchFilter } from 'app/components/MatchFilter'

interface MatchesScreenProps extends AppStackScreenProps<"Matches"> {}

export const MatchesScreen: FC<MatchesScreenProps> = observer(function MatchesScreen(props: MatchesScreenProps) {
  const {
    navigation
  } = props

  const { userStore, matchStore } = useStores()

  const [showFilter, setShowFilter] = useState(false)

  const fetchData = () => {
    matchStore.fetchMatches(userStore.user.id)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      matchStore.filters.resetTo()
      fetchData()
    });

    return unsubscribe;
  }, [navigation])

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  const onItemPress = (item: MatchItem) => {
    matchStore.setCurrentMatch(item)
    navigation.navigate('Match')
  }

  const onFilterChange = () => {
    fetchData()
  }

  return (
    <Screen style={$root} preset="fixed">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
        <Text style={$heading}>Dashboard</Text>
        <Pressable style={$menu} onPress={() => setShowFilter(!showFilter)}>
          <Icon name="filter" size={32} color={colors.primary} />
        </Pressable>
      </View>
      { showFilter &&
        <MatchFilter filters={matchStore.filters} onChange={onFilterChange} />
      }
      <ScrollView style={$scroll}>
        <FlashList
          data={matchStore.matches}
          key={matchStore.matches.length}
          renderItem={(props) => <MatchListItem item={props.item as MatchItem} onPress={onItemPress} />}
          estimatedItemSize={200}
          ListEmptyComponent={<Text style={$helpText}>Looks like you don't have any matches, add some using the '+' button below!</Text>}
        />
        <View style={{height: 200}}></View>
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
  flex: 1,
}

const $scroll: ViewStyle = {
  minHeight: 700,
  minWidth: 30,
  marginHorizontal: 20
}

const $helpText: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.text,
  textAlign: 'center'
}