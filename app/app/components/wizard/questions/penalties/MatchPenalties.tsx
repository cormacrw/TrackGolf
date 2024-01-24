import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberPicker } from '../NumberPicker'

export const MatchPenalties = observer(function MatchPenalties () {
  const { wizardStore } = useStores()

  const setUserPenalties = (penalties: number) => {
    wizardStore.setProp('userPenalties', penalties)
  }

  const setOpponentPenalties = (penalties: number) => {
    wizardStore.setProp('opponentPenalties', penalties)
  }
  return (
    <View>
      <Text style={$question}>Were there any penalties?</Text>
      <View style={$pickerContainer}>
        <NumberPicker label="You" value={wizardStore.userPenalties || 0} onChange={setUserPenalties} />
        <NumberPicker label="Opponent" value={wizardStore.opponentPenalties || 0} onChange={setOpponentPenalties} />
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