import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import steps from './steps'
import { colors } from 'app/theme'
import { useStores } from 'app/models'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WizardScreenProps extends AppStackScreenProps<"Wizard"> {}

export const WizardScreen: FC<WizardScreenProps> = observer(function WizardScreen() {
  // Pull in one of our MST stores
  const { wizardStore } = useStores()
  const [step, setStep] = useState(0)
  const Question = steps[step].component
  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    wizardStore.default()
  }, [])

  const backStep = () => {
    setStep(step - 1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <Screen style={$root} preset="fixed" statusBarStyle='light'>
      <View style={$questionContainer}>
        <Question />
      </View>
      <View style={$navContainer}>
        {
          step > 0
          ? <Button text="Back" style={$button} textStyle={$buttonText} onPress={backStep} />
          : <View style={$button}></View>
        }
        <Button text="Next" style={[$button, $buttonNext]} textStyle={$buttonText} onPress={nextStep} />
      </View>
      
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $button: ViewStyle = {
  width: 150,
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
  height: '90%',
  justifyContent: 'center'
}


const $navContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 50
}