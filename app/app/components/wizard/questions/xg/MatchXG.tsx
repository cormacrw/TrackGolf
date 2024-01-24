import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberPicker } from '../NumberPicker'

export const MatchXG = observer(function MatchXG () {
  const { wizardStore } = useStores()

  const setUserXG = (xg: number) => {
    wizardStore.setProp('userXG', Math.round(xg * 10) / 10)
  }

  const setOpponentXG = (xg: number) => {
    wizardStore.setProp('opponentXG', Math.round(xg * 10) / 10)
  }
  return (
    <View>
      <Text style={$question}>What was the xG?</Text>
      <View style={$pickerContainer}>
        <NumberPicker label="You" value={wizardStore.userXG || 0} showSmallIncrements onChange={setUserXG} />
        <NumberPicker label="Opponent" value={wizardStore.opponentXG || 0} showSmallIncrements onChange={setOpponentXG} />
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