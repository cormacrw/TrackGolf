import * as React from "react"
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { OptionPill } from './wizard/questions/type/OptionPill'
import { DATE_FILTERS, FilterStore, MATCH_TYPES } from 'app/models'

export interface MatchFilterProps {
  filters: FilterStore
  onChange: () => void
}

/**
 * Describe your component here
 */
export const MatchFilter = observer(function MatchFilter(props: MatchFilterProps) {
  const {
    filters,
    onChange
  } = props

  const setType = (t: string) => {
    filters.setType(t)
    onChange()
  }

  const setTimeframe = (t: string) => {
    filters.setTimeframe(t)
    onChange()
  }

  return (
    <View style={{marginBottom: 20}}>
      <Text style={$title}>Match Type</Text>
      <ScrollView style={$container} horizontal showsHorizontalScrollIndicator={false}>
        {['All', ...MATCH_TYPES].map(t => (
          <OptionPill
            label={t}
            key={t}
            active={filters.type.toLowerCase() === t.toLowerCase()}
            onPress={() => setType(t)}
          />
        ))}
        <View style={{ width: 30 }}></View>
      </ScrollView>
      <Text style={[$title, { marginTop: 10 }]}>Timeframe</Text>
      <ScrollView style={$container} horizontal showsHorizontalScrollIndicator={false}>
        {DATE_FILTERS.map(t => (
          <OptionPill
            label={t}
            key={t}
            active={filters.timeframe.toLowerCase() === t.toLowerCase()}
            onPress={() => setTimeframe(t)}
          />
        ))}
        <View style={{ width: 30 }}></View>
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: 'row',
  paddingLeft: 20
}

const $title: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 14,
  color: colors.text,
  marginLeft: 20,
  marginBottom: 3
}