import { colors, typography } from 'app/theme'
import React from "react"
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { SummaryItem } from './SummaryItem'

export const MatchSummary = observer(function MatchSummary () {
  const { wizardStore } = useStores()

  const { wizard } = wizardStore

  return (
    <View style={$container}>
      <Text style={$question}>Summary</Text>
      <ScrollView>
        <SummaryItem label="Match Type" value={wizard.type} />
        <SummaryItem label="Goals Scored" value={wizard.userScore} />
        <SummaryItem label="Goals Conceded" value={wizard.opponentScore} />
        <SummaryItem label="Minutes Played" value={wizard.minutes} />
        <SummaryItem label="Possession" value={wizard.userPossession} />
        <SummaryItem label="Shots For" value={wizard.userShots} />
        <SummaryItem label="Shots Against" value={wizard.opponentShots} />
        <SummaryItem label="xG For" value={wizard.userXG} />
        <SummaryItem label="xG Against" value={wizard.opponentXG} />
        <SummaryItem label="Penalties For" value={wizard.userPenalties} />
        <SummaryItem label="Penalties Against" value={wizard.opponentPenalties} />
        <SummaryItem label="Yellow Cards" value={wizard.userYellows} />
        <SummaryItem label="Red Cards" value={wizard.userReds} />
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