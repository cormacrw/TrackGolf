import { colors, typography } from 'app/theme'
import React from "react"
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { SummaryItem } from './SummaryItem'

export const MatchSummary = observer(function MatchSummary () {
  const { wizardStore } = useStores()

  return (
    <View style={$container}>
      <Text style={$question}>Summary</Text>
      <ScrollView>
        <SummaryItem label="Match Type" value={wizardStore.type} />
        <SummaryItem label="Goals Scored" value={wizardStore.userScore} />
        <SummaryItem label="Goals Conceded" value={wizardStore.opponentScore} />
        <SummaryItem label="Minutes Played" value={wizardStore.minutes} />
        <SummaryItem label="Possession" value={wizardStore.userPossession} />
        <SummaryItem label="Shots For" value={wizardStore.userShots} />
        <SummaryItem label="Shots Against" value={wizardStore.opponentShots} />
        <SummaryItem label="xG For" value={wizardStore.userXG} />
        <SummaryItem label="xG Against" value={wizardStore.opponentXG} />
        <SummaryItem label="Penalties For" value={wizardStore.userPenalties} />
        <SummaryItem label="Penalties Against" value={wizardStore.opponentPenalties} />
        <SummaryItem label="Yellow Cards" value={wizardStore.userYellows} />
        <SummaryItem label="Red Cards" value={wizardStore.userReds} />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  paddingBottom: 30
}

const $question: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
  marginBottom: 30
}