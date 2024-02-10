import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberPicker } from '../NumberPicker'

export const MatchShots = observer(function MatchShots () {
  const { wizardStore } = useStores()

  const setUserShots = (score: number) => {
    wizardStore.wizard.setProp('userShots', score)
  }

  const setOpponentShots = (score: number) => {
    wizardStore.wizard.setProp('opponentShots', score)
  }
  return (
    <View>
      <Text style={$question}>How many shots were there?</Text>
      <View style={$pickerContainer}>
        <NumberPicker label="You" value={wizardStore.wizard.userShots || 0} onChange={setUserShots} />
        <NumberPicker label="Opponent" value={wizardStore.wizard.opponentShots || 0} onChange={setOpponentShots} />
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