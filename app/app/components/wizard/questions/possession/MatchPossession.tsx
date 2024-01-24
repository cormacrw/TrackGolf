import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberSlider } from '../NumberSlider'

export const MatchPossession = observer(function MatchPossession () {
  const { wizardStore } = useStores()

  const setPossession = (possession: number) => {
    wizardStore.setProp('userPossession', possession)
  }

  return (
    <View>
      <Text style={$question}>How much possession did you have?</Text>
      <NumberSlider
        value={wizardStore.userPossession || 50}
        minimumValue={1}
        maximumValue={100}
        step={1}
        onValueChange={setPossession} />
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