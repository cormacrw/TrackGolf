import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, PressableStateCallbackType, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { BackArrow, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { colors, typography } from 'app/theme'
import { MatchStatBar } from 'app/components/matches/MatchStatBar'
import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/Feather'
import { DeleteModal } from 'app/components/DeleteModal'

interface MatchScreenProps extends AppStackScreenProps<"Match"> {}

/**
 * Screen to display matches and allow for deletion
 */
export const MatchScreen: FC<MatchScreenProps> = observer(function MatchScreen(props: MatchScreenProps) {
  const {
    navigation
  } = props
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const { matchStore, appStore } = useStores()

  const notes = ''

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  const deleteItem = async () => {
    setShowDeleteConfirm(false)
    if (matchStore.currentMatch?.id) {
      await matchStore.deleteMatch(matchStore.currentMatch.id)
      navigation.navigate('Matches')
    }
  }

  return (
    <Screen style={$root} preset="scroll">
      <View style={$back}>
        <BackArrow />
        <Pressable style={$menu} onPress={() => setShowDeleteConfirm(true)}>
          <Icon name="trash" color={colors.error} size={32} />
        </Pressable>
      </View>
      <View style={$body}>
        <Text style={$heading} text={matchStore.currentMatch?.type + ' Game'} />
        <Text>{format(new Date(matchStore.currentMatch?.createdAt || ''), 'do MMM yyyy')}</Text>

        <View style={$resultCard}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={$resultNumber}>{matchStore.currentMatch?.userScore}</Text>
              <Text>You</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 40, fontFamily: typography.primary.bold, lineHeight: 40}}>-</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={$resultNumber}>{matchStore.currentMatch?.opponentScore}</Text>
              <Text>Opponent</Text>
            </View>
          </View>
          <Text style={{textAlign: 'center', fontFamily: typography.primary.bold, marginTop: 10}}>{matchStore.currentMatch?.minutes + ' mins'}</Text>
        </View>

        <MatchStatBar
          label='Possession'
          leftVal={matchStore.currentMatch?.userPossession || 50}
          rightVal={100 - (matchStore.currentMatch?.userPossession || 50)}
        />

        <MatchStatBar
          label='Shots'
          leftVal={matchStore.currentMatch?.userShots || 0}
          rightVal={matchStore.currentMatch?.opponentShots || 0}
        />

        <MatchStatBar
          label='xG'
          leftVal={matchStore.currentMatch?.userXG || 0}
          rightVal={matchStore.currentMatch?.opponentXG || 0}
        />

        <MatchStatBar
          label='Penalties'
          leftVal={matchStore.currentMatch?.userPenalties || 0}
          rightVal={matchStore.currentMatch?.opponentPenalties || 0}
        />

        <Text style={[$heading, { textAlign: 'center', marginBottom: 15 }]}>Discipline</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 20}}>
          <View>
            <View style={{backgroundColor: '#fcba03', width: 80, height: 110, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: colors.background, fontSize: 30, lineHeight: 32}}>{matchStore.currentMatch?.userYellows}</Text>
            </View>
          </View>
          <View>
            <View style={{backgroundColor: colors.error, width: 80, height: 110, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: colors.background, fontSize: 30, lineHeight: 32}}>{matchStore.currentMatch?.userReds}</Text>
            </View>
          </View>
        </View>

        {
          notes &&
          <>
            <Text style={[$heading, { textAlign: 'center', marginBottom: 10 }]}>Notes</Text>
            <View style={[$resultCard, {paddingTop: 10, marginTop: 0}]}>
              <Text>{notes}</Text>
            </View>
          </>
        }
      </View>
      <DeleteModal
        show={showDeleteConfirm}
        title='Delete Match'
        msg='Are you sure you want to delete this match?'
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={deleteItem}
      />
    </Screen>
  )
})

const $back: ViewStyle = {
  marginTop: 10,
  marginLeft: 30,
  marginRight: 30,
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const $root: ViewStyle = {
  flex: 1,
}

const $resultCard: ViewStyle = {
  backgroundColor: colors.lightBackground,
  paddingHorizontal: 20,
  paddingTop: 40,
  paddingBottom: 20,
  marginTop: 20,
  borderRadius: 10
}

const $resultNumber: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 40,
  lineHeight: 40
}


const $body: ViewStyle = {
  paddingHorizontal: 30
}

const $heading: TextStyle = {
  fontFamily: typography.primary.bold,
  marginTop: 10,
  fontSize: 18
}
