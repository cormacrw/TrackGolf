import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { BackArrow, Button, Screen } from "app/components"
import steps from './steps'
import { colors } from 'app/theme'
import { useStores } from 'app/models'
import { Progress } from 'app/components/wizard/Progress'
import { ApolloError, useMutation } from '@apollo/client'

interface WizardScreenProps extends AppStackScreenProps<"Wizard"> {}

export const WizardScreen: FC<WizardScreenProps> = observer(function WizardScreen(props) {
  const {
    navigation
  } = props
  const { wizardStore, userStore, appStore } = useStores()
  const [step, setStep] = useState(0)
  // const [createMatch] = useMutation<CreateMatchResponse, MatchInput>(CREATE_MATCH)

  const Question = steps[step].component
  useEffect(() => {
    wizardStore.default()
  }, [])

  const backStep = () => {
    setStep(step - 1)
  }

  const nextStep = () => {
    // if we are on the last step, submit
    if (step === steps.length - 1) {
      finishWizard()
    } else {
      setStep(step + 1)
    }
  }

  const finishWizard = async () => {
    try {
      appStore.setLoading(true)
      console.log({
        userId: userStore.userId || '',
        type: wizardStore.type,
        userScore: wizardStore.userScore,
        userPossession: wizardStore.userPossession,
        userXG: wizardStore.userXG,
        userShots: wizardStore.userShots,
        minutes: wizardStore.minutes,
        userPenalties: wizardStore.userPenalties,
        opponentScore: wizardStore.opponentScore,
        opponentXG: wizardStore.opponentXG,
        opponentShots: wizardStore.opponentShots,
        opponentPenalties: wizardStore.opponentPenalties,
        userYellows: wizardStore.userYellows,
        userReds: wizardStore.userReds,
      })
      // const res = await createMatch({variables: {
      //   userId: userStore.userId || '',
      //   type: wizardStore.type,
      //   userScore: wizardStore.userScore,
      //   userPossession: wizardStore.userPossession,
      //   userXG: wizardStore.userXG,
      //   userShots: wizardStore.userShots,
      //   minutes: wizardStore.minutes,
      //   userPenalties: wizardStore.userPenalties,
      //   opponentScore: wizardStore.opponentScore,
      //   opponentXG: wizardStore.opponentXG,
      //   opponentShots: wizardStore.opponentShots,
      //   opponentPenalties: wizardStore.opponentPenalties,
      //   userYellows: wizardStore.userYellows,
      //   userReds: wizardStore.userReds,
      // }})


      // console.log(res)
      
      // reset the wizard
      wizardStore.default()
  
      appStore.setLoading(false)
      navigation.navigate('Home')
    } catch (error) {
      appStore.setLoading(false)
      if (error instanceof ApolloError) {
        console.log(error.message)
      }
    }
  }

  const showNext = steps[step].showNext(wizardStore)

  return (
    <Screen contentContainerStyle={$root} preset="fixed" statusBarStyle='light'>
      <View style={$back}>
        <BackArrow />
      </View>
      <Progress stepCount={steps.length} step={step} />
      <View style={$questionContainer}>
        <Question />
      </View>
      <View style={$navContainer}>
        {
          step > 0
          ? <Button text="Back" style={$button} textStyle={$buttonText} onPress={backStep} />
          : <View style={$button}></View>
        }
        {
          showNext
          ? <Button text={steps[step].name === 'SUMMARY' ? 'Finish' : 'Next'} style={[$button, $buttonNext]} textStyle={$buttonText} onPress={nextStep} />
          : <View style={$button}></View>
        }
      </View>
      
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $button: ViewStyle = {
  width: 150,
  height: 50
}

const $back: ViewStyle = {
  marginTop: 10,
  marginLeft: 30
}


const $buttonNext: ViewStyle = {
  backgroundColor: colors.primary,
  borderColor: colors.primary
}

const $buttonText: TextStyle = {
  color: colors.textDim,
  fontSize: 20
}

const $questionContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center'
}


const $navContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 50,
  height: 100
}