import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View } from 'react-native'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'
import { NumberSlider } from '../NumberSlider'

export const MatchMinutes = observer(function MatchMinutes () {
  const { wizardStore } = useStores()

  const setMinutes = (minutes: number) => {
    wizardStore.setProp('minutes', minutes)
  }

  return (
    <View>
      <Text style={$question}>How many minutes did you play?</Text>
      <NumberSlider
        value={wizardStore.minutes || 90}
        minimumValue={1}
        maximumValue={120}
        step={1}
        onValueChange={setMinutes} />
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