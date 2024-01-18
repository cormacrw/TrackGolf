import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DefaultLayout from '../../layouts/DefaultLayout'
import MatchWizardSteps from './MatchWizardSteps'
import Btn from '../../components/form/Btn'

export default function MatchWizardScreen () {
  const [step, setStep] = useState(0)
  const QuestionComponent = MatchWizardSteps[step].component

  const nextStep = () => {
    setStep(step + 1)
  }

  const previousStep = () => {
    setStep(step - 1)
  }
  return (
    <DefaultLayout title="New Match">
      <QuestionComponent />
      <Btn text="Next" onPress={nextStep} />
      <Btn text="Back" onPress={previousStep} />
    </DefaultLayout>
  )
}