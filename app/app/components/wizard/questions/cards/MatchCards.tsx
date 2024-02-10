import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberPicker } from '../NumberPicker'

export const MatchCards = observer(function MatchCards () {
  const { wizardStore } = useStores()

  const setYellowCards = (count: number) => {
    wizardStore.wizard.setProp('userYellows', count)
  }

  const setRedCards = (count: number) => {
    wizardStore.wizard.setProp('userReds', count)
  }
  return (
    <View>
      <Text style={$question}>Did you have any cards?</Text>
      <View style={$pickerContainer}>
        <NumberPicker label="Yellows" value={wizardStore.wizard.userYellows || 0} onChange={setYellowCards} />
        <NumberPicker label="Reds" value={wizardStore.wizard.userReds || 0} onChange={setRedCards} />
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