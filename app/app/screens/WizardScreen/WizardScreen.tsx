import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, PressableStateCallbackType, Text, TextStyle, View, ViewStyle } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen } from "app/components"
import steps from './steps'
import { colors, typography } from 'app/theme'
import { useStores } from 'app/models'
import { Progress } from 'app/components/wizard/Progress'

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

      await wizardStore.create(userStore.user.id)

      // reset the wizard
      wizardStore.default()
  
      appStore.setLoading(false)
      setStep(0)
      navigation.navigate('Home')
    } catch (error) {
      appStore.setLoading(false)
    }
  }

  const showNext = steps[step].showNext(wizardStore.wizard)

  function $menu({ pressed }: PressableStateCallbackType) {
    return [
      !!pressed && [{opacity: 0.6}]
    ]
  }

  return (
    <Screen contentContainerStyle={$root} preset="fixed" statusBarStyle='light'>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
        <Pressable style={$menu} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color={colors.text} />
        </Pressable>
        <Text style={$heading}>New Match</Text>
      </View>
      <Progress stepCount={steps.length} step={step} />
      <View style={$questionContainer}>
        <Question />
      </View>
      <View style={$navContainer}>
        {
          step > 0
          ? <Button text="Back" style={$button} pressedStyle={{opacity: 0.6}} textStyle={$buttonText} onPress={backStep} />
          : <View style={$button}></View>
        }
        {
          showNext
          ? <Button text={steps[step].name === 'SUMMARY' ? 'Finish' : 'Next'} style={[$button, $buttonNext]} pressedStyle={{opacity: 0.6, backgroundColor: colors.primary}} textStyle={$buttonText} onPress={nextStep} />
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
  width: '40%',
  height: 50
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

const $heading: TextStyle = {
  color: colors.primary,
  fontFamily: typography.primary.bold,
  fontSize: 28,
  lineHeight: 28,
  marginBottom: 10,
  marginTop: 15,
  marginLeft: 10
}