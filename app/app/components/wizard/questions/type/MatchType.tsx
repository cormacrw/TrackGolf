import { colors, typography } from 'app/theme'
import React from "react"
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { OptionPill } from './OptionPill'
import { useStores } from 'app/models'
import { observer } from 'mobx-react-lite'

const MATCH_TYPES = [
  'Champions Qualification',
  'Champions',
  'Rivals',
  'Friendly'
]

export const MatchType = observer(function MatchType () {
  const { wizardStore } = useStores()

  const setType = (type: string) => {
    wizardStore.wizard.setProp('type', type)
  }

  return (
    <View>
      <Text style={$question}>What type of game did you play?</Text>
      <View style={$pillContainer}>
        {MATCH_TYPES.map(t => (
          <OptionPill
            label={t}
            key={t}
            onPress={() => setType(t)}
            active={t === wizardStore.wizard.type}
          />
        ))}
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

const $pillContainer: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: 20
}