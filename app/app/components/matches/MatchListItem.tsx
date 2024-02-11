import * as React from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { format } from 'date-fns'
import { MatchItem, useStores } from 'app/models'

export interface MatchListItemProps {
  item: MatchItem
  onPress: (item: MatchItem) => void
}

/**
 * Describe your component here
 */
export const MatchListItem = function MatchListItem(props: MatchListItemProps) {
  const { item } = props
  const $styles = [$container]
  // const { matchStore } = useStores()

  let result = 'W'
  let color: string = colors.win
  if ((item.userScore || 0) < (item.opponentScore || 0)) {
    result = 'L'
    color = colors.loss
  } else if ((item.userScore || 0) === (item.opponentScore || 0)) {
    result = 'D'
    color = colors.draw
  }

  const date = format(new Date(item.createdAt), 'do MMM yyyy')

  const $result: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  }

  return (
    <Pressable onPress={() => props.onPress(item)}>
      <View style={$styles}>
        <View>
          <Text style={$text}>{item.type}</Text>
          <Text style={$subText}>{date}</Text>
        </View>
        <View style={$resultContainer}>
          <Text style={$scoreText}>{item.userScore} - {item.opponentScore}</Text>
          <View style={$result}>
            <Text style={$resultText}>{result}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const $container: ViewStyle = {
  backgroundColor: colors.lightBackground,
  padding: 20,
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 5
}

const $resultContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

const $resultText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.darkBackground,
}

const $scoreText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.text,
}


const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.text,
}

const $subText: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 12,
  color: colors.text,
}

