import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberPicker } from '../../NumberPicker'

export const MatchResult = observer(function MatchResult () {
  const { wizardStore } = useStores()

  const setUserScore = (score: number) => {
    wizardStore.setProp('userScore', score)
  }

  const setOpponentScore = (score: number) => {
    wizardStore.setProp('opponentScore', score)
  }
  return (
    <View>
      <Text style={$question}>What was the result?</Text>
      <View style={$pickerContainer}>
        <NumberPicker label="You" value={wizardStore.userScore} onChange={setUserScore} />
        <NumberPicker label="Opponent" value={wizardStore.opponentScore} onChange={setOpponentScore} />
      </View>
    </View>
  )
})

const $question: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: typography.primary.bold,
  marginBottom: 30
}

const $pickerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginHorizontal: 20
}