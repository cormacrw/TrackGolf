import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Text, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { MatchListItem, Screen } from "app/components"
import { colors, typography } from 'app/theme'
import { MatchItem, useStores } from 'app/models'
import { FlashList } from '@shopify/flash-list'

interface MatchesScreenProps extends AppStackScreenProps<"Matches"> {}

export const MatchesScreen: FC<MatchesScreenProps> = observer(function MatchesScreen(props: MatchesScreenProps) {
  const {
    navigation
  } = props

  const { userStore, matchStore } = useStores()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      matchStore.fetchMatches(userStore.id)
    });

    return unsubscribe;
  }, [navigation])

  const onItemPress = (item: MatchItem) => {
    matchStore.setCurrentMatch(item)
    navigation.navigate('Match')
  }

  return (
    <Screen style={$root} preset="fixed">
      <Text style={$heading}>Matches</Text>
      <ScrollView style={$scroll}>
        <FlashList
          data={matchStore.matches}
          key={matchStore.matches.length}
          renderItem={(props) => <MatchListItem item={props.item as MatchItem} onPress={onItemPress} />}
          estimatedItemSize={200}
          ListEmptyComponent={<Text style={$helpText}>Looks like you don't have any matches, add some using the '+' button below!</Text>}
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
  flex: 1,
  paddingHorizontal: 30
}

const $scroll: ViewStyle = {
  minHeight: 700,
  minWidth: 30
}

const $helpText: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.text,
  textAlign: 'center'
}